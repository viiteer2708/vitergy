// Regenera src/lib/dominios-desechables.ts desde la lista de dominios de usar y
// tirar que Altavoz refresca cada lunes en el VPS (fakefilter + los que caza el
// vigía de formularios). Uso: node scripts/actualizar-desechables.mjs [fichero]
import { readFileSync, writeFileSync } from "node:fs";

const origen = process.argv[2] ?? "/root/.brevo-vigia-desechables.txt";
const dominios = [
  ...new Set(
    readFileSync(origen, "utf8")
      .split("\n")
      .map((l) => l.trim().toLowerCase())
      .filter((l) => /^[a-z0-9.-]+\.[a-z]{2,}$/.test(l))
  ),
].sort();

const salida = `// GENERADO por scripts/actualizar-desechables.mjs (${new Date().toISOString().slice(0, 10)}) — no editar a mano.
// ${dominios.length} dominios de correo de usar y tirar (fakefilter + vigía de formularios de Altavoz).
export const LISTA_DESECHABLES = \`${dominios.join("\n")}\`;
`;
writeFileSync(new URL("../src/lib/dominios-desechables.ts", import.meta.url), salida);
console.log(`${dominios.length} dominios escritos`);
