// Pruebas mínimas del embudo de la factura (módulos «hoja»). Sin framework: usa el `node:test` que trae Node.
//
//   node --experimental-strip-types --test src/lib/expediente/expediente.test.mjs
//
// Node 22 importa los .ts tal cual (quita los tipos al vuelo), por eso los módulos probados no tienen imports locales.
// Todo son datos inventados: ningún fichero, email ni teléfono de una persona real.
import test from "node:test";
import assert from "node:assert/strict";

import {
  EXTENSION_DE_TIPO,
  base64Valido,
  bytesDeBase64,
  cabeceraDeBase64,
  mismaFamilia,
  tipoDeFacturaBase64,
  tipoRealDeBytes,
} from "./archivo.ts";
import { normalizarEmailContacto, normalizarMovil, normalizarNombre, textoLimpio } from "./datos.ts";
import { estudioPublico } from "./publico.ts";
import { huellaEmail, huellaIp, secreto } from "./secreto.ts";
import { claveSecreta, esClaveDePrueba, verificarTurnstile } from "../turnstile.ts";

const bytes = (...xs) => Uint8Array.from(xs);
const ascii = (s) => Array.from(s, (c) => c.charCodeAt(0));
const relleno = (n) => new Array(n).fill(0);

/** Ejecuta `f` con variables de entorno cambiadas y las deja como estaban. */
async function conEntorno(cambios, f) {
  const antes = {};
  for (const k of Object.keys(cambios)) antes[k] = process.env[k];
  for (const [k, v] of Object.entries(cambios)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  try {
    return await f();
  } finally {
    for (const [k, v] of Object.entries(antes)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
}

// ───────────────────────── Tipo real por la cabecera ─────────────────────────

test("tipoRealDeBytes reconoce PDF, JPEG, PNG, WebP, HEIC y HEIF", () => {
  assert.equal(tipoRealDeBytes(bytes(...ascii("%PDF-1.7\n"))), "application/pdf");
  assert.equal(tipoRealDeBytes(bytes(0xff, 0xd8, 0xff, 0xe0, 0, 16)), "image/jpeg");
  assert.equal(tipoRealDeBytes(bytes(0x89, ...ascii("PNG"), 0x0d, 0x0a, 0x1a, 0x0a, 0, 0)), "image/png");
  assert.equal(tipoRealDeBytes(bytes(...ascii("RIFF"), 1, 2, 3, 4, ...ascii("WEBP"), ...ascii("VP8 "))), "image/webp");
  assert.equal(tipoRealDeBytes(bytes(0, 0, 0, 24, ...ascii("ftypheic"), ...relleno(8))), "image/heic");
  assert.equal(tipoRealDeBytes(bytes(0, 0, 0, 24, ...ascii("ftypmif1"), ...relleno(8))), "image/heif");
});

test("tipoRealDeBytes rechaza lo que se hace pasar por una foto o un PDF", () => {
  assert.equal(tipoRealDeBytes(bytes(0x50, 0x4b, 3, 4, ...relleno(10))), null, "un ZIP");
  assert.equal(tipoRealDeBytes(bytes(0x4d, 0x5a, 0x90, 0, ...relleno(10))), null, "un ejecutable de Windows");
  assert.equal(tipoRealDeBytes(bytes(...ascii("<html><script>alert(1)</script>"))), null, "una página web");
  assert.equal(tipoRealDeBytes(bytes(0, 0, 0, 24, ...ascii("ftypavif"), ...relleno(8))), null, "AVIF no se admite");
  assert.equal(tipoRealDeBytes(bytes(...ascii("RIFF"), 1, 2, 3, 4, ...ascii("WAVE"))), null, "un RIFF que no es WebP");
  assert.equal(tipoRealDeBytes(bytes(...ascii("%PDF"))), null, "cabecera de PDF cortada");
  assert.equal(tipoRealDeBytes(bytes()), null, "vacío");
  assert.equal(tipoRealDeBytes(bytes(0xff, 0xd8)), null, "JPEG cortado");
});

test("mismaFamilia: HEIC y HEIF son uno, y el tipo declarado tiene que cuadrar con el real", () => {
  assert.equal(mismaFamilia("application/pdf", "application/pdf"), true);
  assert.equal(mismaFamilia("image/jpg", "image/jpeg"), true);
  assert.equal(mismaFamilia("image/heic", "image/heif"), true);
  assert.equal(mismaFamilia("image/heif", "image/heic"), true);
  assert.equal(mismaFamilia("application/pdf", "image/jpeg"), false);
  assert.equal(mismaFamilia("image/png", "image/jpeg"), false);
  assert.equal(mismaFamilia("", "image/jpeg"), false);
});

test("las extensiones salen del tipo, nunca del nombre original", () => {
  assert.deepEqual(
    Object.values(EXTENSION_DE_TIPO).sort(),
    ["heic", "heif", "jpg", "pdf", "png", "webp"]
  );
});

// ───────────────────────── Base64 ─────────────────────────

test("base64Valido y bytesDeBase64", () => {
  const datos = Buffer.from("%PDF-1.4 contenido inventado de prueba", "utf8");
  const b64 = datos.toString("base64");
  assert.equal(base64Valido(b64), true);
  assert.equal(bytesDeBase64(b64), datos.length);
  assert.equal(base64Valido(""), false);
  assert.equal(base64Valido("abc"), false, "longitud no múltiplo de 4");
  assert.equal(base64Valido("ab=c"), false, "relleno en medio");
  assert.equal(base64Valido("data:image/png;base64,AAAA"), false, "con prefijo data:");
  assert.equal(base64Valido("AAAA\nAAAA"), false, "con salto de línea");
  for (const n of [1, 2, 3, 4, 5, 100]) {
    const x = Buffer.alloc(n, 7).toString("base64");
    assert.equal(bytesDeBase64(x), n, `${n} bytes`);
  }
});

test("cabeceraDeBase64 lee el principio sin decodificar todo", () => {
  const pdf = Buffer.concat([Buffer.from("%PDF-1.7\n"), Buffer.alloc(5000, 1)]);
  assert.equal(tipoRealDeBytes(cabeceraDeBase64(pdf.toString("base64"))), "application/pdf");
  const zip = Buffer.concat([Buffer.from([0x50, 0x4b, 3, 4]), Buffer.alloc(50)]);
  assert.equal(tipoRealDeBytes(cabeceraDeBase64(zip.toString("base64"))), null);
  assert.equal(cabeceraDeBase64("@@@@@@@@"), null, "no es base64");
  assert.equal(cabeceraDeBase64("AB"), null, "demasiado corto");
});


test("tipoDeFacturaBase64: acepta PDF y fotos de verdad y rechaza todo lo demás", () => {
  const pdf = Buffer.concat([Buffer.from("%PDF-1.7\n"), Buffer.alloc(3000, 1)]).toString("base64");
  const jpg = Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.alloc(3000, 2)]).toString("base64");
  const heif = Buffer.concat([Buffer.from([0, 0, 0, 24]), Buffer.from("ftypmif1"), Buffer.alloc(3000)]).toString("base64");
  const zip = Buffer.concat([Buffer.from([0x50, 0x4b, 3, 4]), Buffer.alloc(3000)]).toString("base64");
  assert.equal(tipoDeFacturaBase64(pdf, "application/pdf"), "application/pdf");
  assert.equal(tipoDeFacturaBase64(jpg, "image/jpeg"), "image/jpeg");
  assert.equal(tipoDeFacturaBase64(heif, "image/heic"), "image/heif", "el navegador dice heic y el fichero lleva mif1");
  assert.equal(tipoDeFacturaBase64(zip, "application/pdf"), null, "un ZIP disfrazado de PDF");
  assert.equal(tipoDeFacturaBase64(jpg, "application/pdf"), null, "una foto que dice ser PDF");
  assert.equal(tipoDeFacturaBase64(pdf, "image/jpeg"), null, "un PDF que dice ser foto");
  assert.equal(tipoDeFacturaBase64(pdf + "$", "application/pdf"), null, "base64 roto al final");
  assert.equal(tipoDeFacturaBase64("data:application/pdf;base64," + pdf, "application/pdf"), null, "con prefijo data:");
  assert.equal(tipoDeFacturaBase64("A".repeat(4_200_004), "application/pdf"), null, "demasiado grande");
  assert.equal(tipoDeFacturaBase64("", "application/pdf"), null);
  assert.equal(tipoDeFacturaBase64(undefined, "application/pdf"), null);
  assert.equal(tipoDeFacturaBase64(pdf, undefined), null);
});

// ───────────────────────── Datos de contacto ─────────────────────────

test("normalizarMovil: móviles de España con o sin prefijo, y rechaza fijos y basura", () => {
  const buenos = {
    "600123456": "+34600123456",
    "600 12 34 56": "+34600123456",
    "+34 600123456": "+34600123456",
    "0034600123456": "+34600123456",
    "(+34) 600-123-456": "+34600123456",
    "700.123.456": "+34700123456",
    "+44 7911 123456": "+447911123456",
    "+351 912 345 678": "+351912345678",
  };
  for (const [entrada, esperado] of Object.entries(buenos)) assert.equal(normalizarMovil(entrada), esperado, entrada);
  for (const malo of ["912345678", "812345678", "60012345", "6001234567", "+34 912345678", "+3460012345", "abc", "", "+0123456789", "+1234567", "600123456; drop", null, 600123456]) {
    assert.equal(normalizarMovil(malo), null, String(malo));
  }
});

test("normalizarEmailContacto: solo lo que acepta Altavoz como «responder a»", () => {
  assert.equal(normalizarEmailContacto("  Ana.Prueba@Example.COM "), "ana.prueba@example.com");
  assert.equal(normalizarEmailContacto("o'brien+x@example.es"), "o'brien+x@example.es");
  for (const malo of ["a,b@example.com", "Ana <ana@example.com>", "ana@example", "ana@@example.com", ".ana@example.com", "ana..x@example.com", "ana @example.com", "ñandú@example.com", "x".repeat(70) + "@example.com", "", null, 5]) {
    assert.equal(normalizarEmailContacto(malo), null, String(malo));
  }
});

test("normalizarNombre y textoLimpio", () => {
  assert.equal(normalizarNombre("  Ana   de  Prueba "), "Ana de Prueba");
  assert.equal(normalizarNombre("Talleres 2000 S.L."), "Talleres 2000 S.L.");
  assert.equal(normalizarNombre("Ana\r\nInyección: x"), "Ana Inyección: x", "los saltos de línea se vuelven espacios");
  assert.equal(normalizarNombre("A"), null);
  assert.equal(normalizarNombre("1234"), null, "sin letras");
  assert.equal(normalizarNombre("x".repeat(81)), null);
  assert.equal(normalizarNombre(undefined), null);
  assert.equal(textoLimpio("Iberdrola\n\tClientes  S.A.", 80), "Iberdrola Clientes S.A.");
  assert.equal(textoLimpio("x".repeat(500), 10), "xxxxxxxxxx");
  assert.equal(textoLimpio(42, 10), "");
});

// ───────────────────────── Estudio público (sin marca) ─────────────────────────

test("estudioPublico NO deja salir la compañía ni el nombre de la oferta", () => {
  const estudio = {
    costeMejorOfertaEur: 61.2,
    ahorroPeriodoEur: 24.3,
    ahorroAnualEur: 296,
    ahorroPct: 0.284,
    precioMedioActualKwh: 0.295,
    ofertasComparadas: 212,
    fechaPrecios: "2026-10-17",
    hayAhorro: true,
    oferta: { compania: "MARCA-SECRETA", nombre: "OFERTA-SECRETA", tipo: "fija" },
  };
  const publico = estudioPublico(estudio);
  const json = JSON.stringify(publico);
  assert.ok(!json.includes("MARCA-SECRETA") && !json.includes("OFERTA-SECRETA"), json);
  assert.ok(!json.includes("compania") && !json.includes("precioMedio"), json);
  assert.deepEqual(Object.keys(publico).sort(), [
    "ahorroAnualEur", "ahorroPct", "ahorroPeriodoEur", "costeMejorOfertaEur", "fechaPrecios", "hayAhorro", "ofertaTipo", "ofertasComparadas",
  ]);
  assert.equal(publico.ofertaTipo, "fija");
});

// ───────────────────────── Huellas ─────────────────────────

const SECRETO_A = "a".repeat(40);
const SECRETO_B = "b".repeat(40);

test("las huellas son deterministas, de 64 hex y distintas por secreto y por tipo de dato", async () => {
  const [ipA1, ipA2, emA, ipB] = await Promise.all([
    conEntorno({ EXPEDIENTE_SECRET: SECRETO_A }, () => huellaIp("203.0.113.9")),
    conEntorno({ EXPEDIENTE_SECRET: SECRETO_A }, () => huellaIp("203.0.113.9")),
    conEntorno({ EXPEDIENTE_SECRET: SECRETO_A }, () => huellaEmail("203.0.113.9")),
    conEntorno({ EXPEDIENTE_SECRET: SECRETO_B }, () => huellaIp("203.0.113.9")),
  ]);
  assert.match(ipA1, /^[0-9a-f]{64}$/);
  assert.equal(ipA1, ipA2);
  assert.notEqual(ipA1, emA, "la misma cadena como IP y como email no puede dar la misma huella");
  assert.notEqual(ipA1, ipB, "otro secreto, otra huella");
  const mayus = await conEntorno({ EXPEDIENTE_SECRET: SECRETO_A }, () => huellaEmail("ANA@Example.com"));
  const minus = await conEntorno({ EXPEDIENTE_SECRET: SECRETO_A }, () => huellaEmail("ana@example.com"));
  assert.equal(mayus, minus, "el email se huella en minúsculas");
});

test("sin secreto (o demasiado corto) no hay huellas: falla en vez de usar una clave débil", async () => {
  await conEntorno({ EXPEDIENTE_SECRET: undefined }, () => {
    assert.equal(secreto(), null);
    assert.throws(() => huellaIp("203.0.113.9"), /EXPEDIENTE_SECRET/);
  });
  await conEntorno({ EXPEDIENTE_SECRET: "corto" }, () => {
    assert.equal(secreto(), null);
    assert.throws(() => huellaEmail("ana@example.com"), /EXPEDIENTE_SECRET/);
  });
});

// ───────────────────────── Turnstile ─────────────────────────

const respuesta = (cuerpo, status = 200) => async () => new Response(JSON.stringify(cuerpo), { status });
const TOKEN = "t".repeat(40);

test("verificarTurnstile: token válido, rechazado y errores de Cloudflare", async () => {
  const secreta = "secreta-de-prueba-0123456789";
  const ok = await verificarTurnstile(TOKEN, "203.0.113.9", { secreta, fetchFn: respuesta({ success: true, hostname: "Vitergy.es" }) });
  assert.deepEqual(ok, { estado: "ok", hostname: "vitergy.es" });

  const no = await verificarTurnstile(TOKEN, null, { secreta, fetchFn: respuesta({ success: false, "error-codes": ["timeout-or-duplicate"] }) });
  assert.deepEqual(no, { estado: "rechazado", codigos: ["timeout-or-duplicate"] });

  // Un fallo de NUESTRA clave o de Cloudflare no se le achaca a la persona.
  const cf = await verificarTurnstile(TOKEN, null, { secreta, fetchFn: respuesta({ success: false, "error-codes": ["invalid-input-secret"] }) });
  assert.equal(cf.estado, "no_disponible");

  const http500 = await verificarTurnstile(TOKEN, null, { secreta, fetchFn: respuesta({}, 500) });
  assert.equal(http500.estado, "no_disponible");

  const caido = await verificarTurnstile(TOKEN, null, { secreta, fetchFn: async () => { throw new Error("red caída"); } });
  assert.equal(caido.estado, "no_disponible", "si Cloudflare no contesta NO se deja pasar");
});

test("verificarTurnstile: sin token no llama a Cloudflare, y sin clave secreta no deja pasar", async () => {
  let llamadas = 0;
  const fetchFn = async () => { llamadas++; return new Response(JSON.stringify({ success: true })); };
  for (const malo of [undefined, null, "", "corto", 123, "x".repeat(5000)]) {
    const r = await verificarTurnstile(malo, null, { secreta: "secreta-de-prueba-0123456789", fetchFn });
    assert.equal(r.estado, "rechazado", String(malo));
  }
  assert.equal(llamadas, 0);
  const sinClave = await verificarTurnstile(TOKEN, null, { secreta: null, fetchFn });
  assert.equal(sinClave.estado, "no_disponible");
  assert.equal(llamadas, 0);
});

test("verificarTurnstile manda la clave, el token y la IP como formulario", async () => {
  let enviado;
  const fetchFn = async (url, init) => { enviado = { url, cuerpo: init.body.toString(), metodo: init.method }; return new Response(JSON.stringify({ success: true })); };
  await verificarTurnstile(TOKEN, "203.0.113.9", { secreta: "secreta-de-prueba-0123456789", fetchFn });
  assert.equal(enviado.metodo, "POST");
  assert.match(enviado.url, /^https:\/\/challenges\.cloudflare\.com\/turnstile\/v0\/siteverify$/);
  const p = new URLSearchParams(enviado.cuerpo);
  assert.equal(p.get("secret"), "secreta-de-prueba-0123456789");
  assert.equal(p.get("response"), TOKEN);
  assert.equal(p.get("remoteip"), "203.0.113.9");
  await verificarTurnstile(TOKEN, "desconocida", { secreta: "secreta-de-prueba-0123456789", fetchFn });
  assert.equal(new URLSearchParams(enviado.cuerpo).get("remoteip"), null, "una IP «desconocida» no se manda");
});

test("las claves de prueba de Cloudflare solo valen fuera de producción", async () => {
  const PRUEBA = "1x0000000000000000000000000000000AA";
  assert.equal(esClaveDePrueba(PRUEBA), true);
  assert.equal(esClaveDePrueba("0x4AAAAAAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"), false);
  await conEntorno({ TURNSTILE_SECRET_KEY: PRUEBA, VERCEL_ENV: undefined }, () => assert.equal(claveSecreta(), PRUEBA));
  await conEntorno({ TURNSTILE_SECRET_KEY: PRUEBA, VERCEL_ENV: "preview" }, () => assert.equal(claveSecreta(), PRUEBA));
  await conEntorno({ TURNSTILE_SECRET_KEY: PRUEBA, VERCEL_ENV: "production" }, () => assert.equal(claveSecreta(), null));
  await conEntorno({ TURNSTILE_SECRET_KEY: "0x4AAAAAAAreal0123456789", VERCEL_ENV: "production" }, () => assert.equal(claveSecreta(), "0x4AAAAAAAreal0123456789"));
  await conEntorno({ TURNSTILE_SECRET_KEY: undefined, VERCEL_ENV: undefined }, () => assert.equal(claveSecreta(), null));
  await conEntorno({ TURNSTILE_SECRET_KEY: "corta", VERCEL_ENV: undefined }, () => assert.equal(claveSecreta(), null));
});
