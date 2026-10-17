import type { Metadata } from "next";
import Link from "next/link";
import { ACTUALIZADO_PRIVACIDAD, Apartado, LegalDoc, TablaDatos, TITULAR } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Política de Privacidad - Vitergy",
  description:
    "Cómo tratamos tus datos personales en Vitergy: qué recogemos, para qué, con qué base legal, a quién se los comunicamos y cómo ejercer tus derechos.",
  alternates: { canonical: "https://vitergy.es/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <LegalDoc
      titulo="Política de privacidad"
      entradilla="Qué datos tuyos tratamos, para qué los usamos, con quién los compartimos y qué puedes exigirnos en cualquier momento. Sin fórmulas vacías: lo que hacemos de verdad."
      actualizado={ACTUALIZADO_PRIVACIDAD}
    >
      <Apartado titulo="1. Responsable del tratamiento">
        <TablaDatos
          filas={[
            { label: "Responsable", value: TITULAR.razonSocial },
            { label: "Nombre comercial", value: TITULAR.marca },
            ...(TITULAR.nif ? [{ label: "NIF", value: TITULAR.nif }] : []),
            { label: "Domicilio social", value: TITULAR.domicilio },
            {
              label: "Contacto",
              value: (
                <a
                  href={`mailto:${TITULAR.email}`}
                  className="text-[#f97316] underline underline-offset-4"
                >
                  {TITULAR.email}
                </a>
              ),
            },
          ]}
        />
      </Apartado>

      <Apartado titulo="2. Qué datos tratamos y de dónde salen">
        <p>
          Solo tratamos los datos que tú nos das. No compramos bases de datos ni
          obtenemos tus datos de terceros sin que tú lo sepas.
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Datos de contacto:</strong> nombre, teléfono móvil, correo
            electrónico y el contenido de tu consulta, cuando nos escribes por
            WhatsApp, por correo, nos llamas o nos dejas tus datos en la
            calculadora de ahorro.
          </li>
          <li>
            <strong>Datos del suministro:</strong> facturas de luz o gas, código
            CUPS, dirección del punto de suministro, potencia y datos de consumo,
            cuando nos los envías para que hagamos el estudio.
          </li>
          <li>
            <strong>Documentación para la vía rápida de contratación:</strong> si
            decides adelantar el cambio, la copia del DNI o NIE del titular (o del
            administrador, si es una empresa), la del CIF de la empresa y el IBAN
            de la cuenta donde se domiciliarán las facturas.
          </li>
          <li>
            <strong>Datos técnicos de seguridad:</strong> una huella cifrada de tu
            dirección IP (nunca la IP en claro), para contar cuántas veces se usa
            el lector de facturas y frenar abusos. Se borra a los 2 días; si nos
            dejas tus datos, se conserva junto a tu ficha.
          </li>
          <li>
            <strong>Mensajes del chat de la web:</strong> lo que escribes en el
            asistente virtual se envía al servicio de IA que lo responde (Google
            — API de Gemini). No escribas datos personales en el chat: no los
            necesita para ayudarte.
          </li>
          <li>
            <strong>Datos de facturación:</strong> los necesarios para emitir
            factura, si llegamos a contratar.
          </li>
        </ul>
        <p className="rounded-2xl border border-orange-100 bg-[#fff7ed] p-5 text-sm leading-6">
          <strong className="text-[#1f2942]">
            Sobre la calculadora de ahorro de{" "}
            <Link
              href="/contacto"
              className="font-semibold text-[#f97316] underline underline-offset-4"
            >
              /contacto
            </Link>
            :
          </strong>{" "}
          si subes tu factura, el archivo completo se envía a través de nuestro
          servidor al servicio de inteligencia artificial de Google (API de
          Gemini) para leerla. De ella extraemos únicamente datos técnicos
          (consumo, potencia contratada, días e importe): <strong>no extraemos
          tu nombre, dirección, CUPS ni IBAN</strong>. Ves tu ahorro sin darnos
          ningún dato personal y, hasta ese momento, no guardamos el archivo.
          Ten en cuenta que usamos el nivel gratuito del servicio de Google, y
          Google puede utilizar el contenido enviado para mejorar sus productos;
          si lo prefieres, tapa u oculta tus datos personales en la foto antes
          de subirla — el análisis funciona igual.
        </p>
        <p className="rounded-2xl border border-orange-100 bg-[#fff7ed] p-5 text-sm leading-6">
          <strong className="text-[#1f2942]">
            Si decides empezar a ahorrar:
          </strong>{" "}
          cuando pulsas «Quiero empezar a ahorrar» y nos dejas tu nombre, email y
          móvil, <strong>guardamos tu factura</strong> junto con tus datos de
          contacto y con el estudio que hemos calculado, en un almacén privado de
          acceso restringido con servidores en la Unión Europea (Supabase), para
          que Víctor pueda gestionarte el cambio. Si sigues con la vía rápida,
          guardamos ahí también tu DNI o NIE, el CIF de tu empresa y tu IBAN (este
          último, cifrado). Los documentos se borran a los 90 días si no llega a
          haber contrato, y tu ficha de contacto al cabo de un año.{" "}
          <strong>Tu DNI, tu CIF y tu IBAN no se envían a ninguna inteligencia
          artificial</strong>: Google solo recibe la factura, para leerla. Para
          evitar abusos, el lector de facturas se protege con el servicio
          antispam Cloudflare Turnstile (Cloudflare, Inc.), que se carga cuando
          empiezas a subir una factura. El aviso interno con tu solicitud (y tu
          factura adjunta) llega a nuestro buzón hola@vitergy.es por la
          plataforma de envío de Grupo New Energy, Altavoz, que usa Amazon SES.
        </p>
        <p className="rounded-2xl border border-orange-100 bg-[#fff7ed] p-5 text-sm leading-6">
          <strong className="text-[#1f2942]">
            Sobre el{" "}
            <Link
              href="/test-factura-luz"
              className="font-semibold text-[#f97316] underline underline-offset-4"
            >
              test de la factura de la luz
            </Link>
            :
          </strong>{" "}
          para ver y guardar tu resultado te pedimos el email y te enviamos un
          código de 6 cifras. Guardamos tu email, tus respuestas y tu perfil en
          nuestra base de datos (Supabase, con servidores en la Unión Europea),
          para enseñártelo cuando vuelvas. Del código solo guardamos una huella
          cifrada, nunca el código. Solo te escribimos con consejos si marcas la
          casilla opcional; en ese caso tu email entra también en nuestra lista de
          Brevo.
        </p>
      </Apartado>

      <Apartado titulo="3. Para qué los usamos y con qué base legal">
        <TablaDatos
          filas={[
            {
              label: "Atender tu consulta y elaborar el estudio energético",
              value:
                "Aplicación de medidas precontractuales a petición tuya (art. 6.1.b RGPD).",
            },
            {
              label:
                "Vía rápida de contratación: recoger tu documentación e IBAN y tramitar tu cambio de comercializadora",
              value:
                "Aplicación de medidas precontractuales a petición tuya (art. 6.1.b RGPD).",
            },
            {
              label: "Enviarte el código del test y guardar y mostrarte tu resultado",
              value: "Tu petición al usar el test (art. 6.1.b RGPD).",
            },
            {
              label: "Solicitar ofertas a comercializadoras en tu nombre",
              value:
                "Tu consentimiento expreso, que pedimos antes de mover ninguna gestión (art. 6.1.a RGPD).",
            },
            {
              label: "Pedir tus datos de consumo a la distribuidora",
              value:
                "Tu consentimiento expreso. Necesitamos tu autorización para acceder a la curva de carga asociada a tu CUPS (art. 6.1.a RGPD).",
            },
            {
              label: "Gestionar la relación contractual y facturar",
              value: "Ejecución del contrato (art. 6.1.b RGPD).",
            },
            {
              label: "Cumplir obligaciones fiscales y contables",
              value: "Obligación legal (art. 6.1.c RGPD).",
            },
            {
              label: "Proteger la web y el lector de facturas frente a abusos",
              value:
                "Interés legítimo en la seguridad del servicio (art. 6.1.f RGPD): huella cifrada de la IP y servicio antispam.",
            },
            {
              label: "Enviarte consejos de ahorro y novedades por email (boletín)",
              value:
                "Solo con tu consentimiento (casilla específica, nunca premarcada), que puedes retirar en cualquier momento y sin dar explicaciones (art. 6.1.a RGPD).",
            },
            {
              label: "Enviarte información comercial nuestra",
              value:
                "Tu consentimiento, o el interés legítimo en el caso de clientes por servicios similares. Puedes oponerte en cualquier momento y sin dar explicaciones.",
            },
          ]}
        />
      </Apartado>

      <Apartado titulo="4. A quién comunicamos tus datos">
        <p>
          No vendemos ni cedemos tus datos a nadie con fines comerciales. Los
          comunicamos únicamente cuando hace falta para prestarte el servicio:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Comercializadoras energéticas</strong>, para solicitar
            ofertas o tramitar el cambio de contrato. Siempre con tu autorización
            previa y solo a la comercializadora elegida o a las que participen en
            tu caso.
          </li>
          <li>
            <strong>Grupo New Energy</strong> (una sociedad distinta de «Por
            encima del techo del cielo, S.L.»), para tramitar tu contrato con la
            comercializadora elegida cuando decides seguir adelante con la
            contratación.
          </li>
          <li>
            <strong>Distribuidora de tu zona</strong>, para consultar los datos de
            consumo y potencia asociados a tu CUPS y tramitar cambios de potencia.
          </li>
          <li>
            <strong>Meta Platforms Ireland Ltd.</strong>, si eliges comunicarte
            con nosotros por WhatsApp. Esa conversación se rige además por las
            condiciones y la política de privacidad de WhatsApp.
          </li>
          <li>
            <strong>Proveedores tecnológicos</strong> que actúan como encargados
            del tratamiento: alojamiento del sitio web (Vercel Inc.); correo
            electrónico transaccional, que enviamos con la plataforma Altavoz de
            Grupo New Energy sobre Amazon SES (Amazon Web Services); la base de
            datos y el almacén privado de documentos donde guardamos tu ficha,
            tu factura y tu documentación, y tu resultado del test (Supabase,
            servidores en la Unión Europea); el servicio antispam Cloudflare
            Turnstile (Cloudflare, Inc.); y, solo si marcas la casilla de
            consejos del test, la plataforma de email Brevo.
          </li>
          <li>
            <strong>Google (API de Gemini)</strong>, para dos funciones de la
            web: leer tu factura en la calculadora de ahorro y responder los
            mensajes del chat. Usamos el nivel gratuito del servicio, en el que
            Google puede utilizar el contenido enviado para mejorar sus
            productos. Google solo recibe tu factura (para leerla) y lo que
            escribas en el chat: nunca tu DNI, tu CIF ni tu IBAN. Nosotros no
            almacenamos tus conversaciones del chat, y tu factura solo la
            guardamos si decides dejarnos tus datos (ver más arriba). Si lo
            prefieres, oculta tus datos personales en la foto de la factura y no
            escribas datos personales en el chat.
          </li>
          <li>
            <strong>Asesoría fiscal y contable, y Administración Pública</strong>,
            cuando exista obligación legal.
          </li>
        </ul>
        <p>
          Algunos de estos proveedores están ubicados fuera del Espacio Económico
          Europeo. En esos casos las transferencias se amparan en decisiones de
          adecuación de la Comisión Europea o en cláusulas contractuales tipo.
        </p>
      </Apartado>

      <Apartado titulo="5. Cuánto tiempo los conservamos">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Consultas que no terminan en contrato</strong> (incluida tu
            ficha de la calculadora: nombre, email, móvil y estudio): hasta un
            año desde el último contacto, salvo que nos pidas antes la supresión.
          </li>
          <li>
            <strong>Tu factura y la documentación de la vía rápida (DNI o NIE,
            CIF e IBAN):</strong> 90 días desde que nos las das si no llega a
            haber contrato. Si lo hay, se conservan mientras dure la relación y
            durante los plazos de prescripción legal.
          </li>
          <li>
            <strong>Datos de clientes:</strong> mientras dure la relación y,
            después, durante los plazos de prescripción legal (con carácter
            general, seis años en materia mercantil y cuatro en materia fiscal).
          </li>
          <li>
            <strong>Tu acceso y tu resultado del test:</strong> se borran solos
            cuando pasa un año sin que entres, o antes si nos lo pides. Los
            códigos que te enviamos se borran a los dos días.
          </li>
          <li>
            <strong>Datos tratados con tu consentimiento:</strong> hasta que lo
            retires.
          </li>
        </ul>
      </Apartado>

      <Apartado titulo="6. Tus derechos">
        <p>Puedes ejercer en cualquier momento los siguientes derechos:</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Acceso:</strong> saber qué datos tuyos tenemos.
          </li>
          <li>
            <strong>Rectificación:</strong> corregir los que sean inexactos.
          </li>
          <li>
            <strong>Supresión:</strong> pedir que los borremos.
          </li>
          <li>
            <strong>Oposición:</strong> oponerte a un tratamiento concreto.
          </li>
          <li>
            <strong>Limitación:</strong> pedir que los conservemos pero no los
            usemos.
          </li>
          <li>
            <strong>Portabilidad:</strong> recibirlos en un formato estructurado.
          </li>
          <li>
            <strong>Retirar el consentimiento</strong> que hubieras dado, sin que
            ello afecte a lo tratado antes.
          </li>
        </ul>
        <p>
          Para ejercerlos, escribe a{" "}
          <a
            href={`mailto:${TITULAR.email}`}
            className="font-semibold text-[#f97316] underline underline-offset-4"
          >
            {TITULAR.email}
          </a>{" "}
          indicando el derecho que quieres ejercer. Te responderemos en el plazo
          máximo de un mes.
        </p>
        <p>
          Si consideras que no hemos atendido correctamente tu solicitud, puedes
          presentar una reclamación ante la Agencia Española de Protección de
          Datos (
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f97316] underline underline-offset-4"
          >
            www.aepd.es
          </a>
          ).
        </p>
      </Apartado>

      <Apartado titulo="7. Seguridad y menores">
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger tus
          datos frente a pérdida, acceso no autorizado o uso indebido. Ningún
          sistema es infalible, pero tratamos tu documentación —que incluye
          facturas y datos de suministro— con el cuidado que merece. El almacén
          donde guardamos tus documentos es privado (no se puede acceder a ellos
          sin autorización) y tu IBAN se guarda cifrado.
        </p>
        <p>
          Nuestros servicios se dirigen a mayores de edad. No recabamos
          conscientemente datos de menores de 14 años.
        </p>
      </Apartado>

      <Apartado titulo="8. Cambios en esta política">
        <p>
          Podemos actualizar esta política para adaptarla a cambios legales o a
          nuevos servicios. La versión vigente es siempre la publicada en esta
          página, con su fecha de actualización arriba indicada.
        </p>
      </Apartado>
    </LegalDoc>
  );
}
