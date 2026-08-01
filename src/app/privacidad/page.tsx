import type { Metadata } from "next";
import Link from "next/link";
import { Apartado, LegalDoc, TablaDatos, TITULAR } from "@/components/LegalDoc";

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
    >
      <Apartado titulo="1. Responsable del tratamiento">
        <TablaDatos
          filas={[
            { label: "Responsable", value: TITULAR.razonSocial },
            { label: "Nombre comercial", value: TITULAR.marca },
            ...(TITULAR.nif ? [{ label: "NIF", value: TITULAR.nif }] : []),
            { label: "Domicilio", value: TITULAR.domicilio },
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
            <strong>Datos de contacto:</strong> nombre, teléfono, correo
            electrónico y el contenido de tu consulta, cuando nos escribes por
            WhatsApp, por correo o nos llamas.
          </li>
          <li>
            <strong>Datos del suministro:</strong> facturas de luz o gas, código
            CUPS, dirección del punto de suministro, potencia y datos de consumo,
            cuando nos los envías para que hagamos el estudio.
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
          tu nombre, dirección, CUPS ni IBAN, y nosotros no guardamos el
          archivo</strong>. Ten en cuenta que usamos el nivel gratuito del
          servicio de Google, y Google puede utilizar el contenido enviado para
          mejorar sus productos; si lo prefieres, tapa u oculta tus datos
          personales en la foto antes de subirla — el análisis funciona igual.
          El email que nos dejas para recibir el estudio se guarda en nuestra
          herramienta de email (Brevo) junto con esos datos técnicos.
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
            previa y solo a las que participen en tu caso.
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
            del tratamiento: alojamiento del sitio web (Vercel Inc.), servicio de
            correo electrónico, y la plataforma de email donde guardamos tu email
            y los datos técnicos de tu estudio (Brevo).
          </li>
          <li>
            <strong>Google (API de Gemini)</strong>, para dos funciones de la
            web: leer tu factura en la calculadora de ahorro y responder los
            mensajes del chat. Usamos el nivel gratuito del servicio, en el que
            Google puede utilizar el contenido enviado para mejorar sus
            productos. Nosotros no almacenamos tu factura ni tus conversaciones;
            si lo prefieres, oculta tus datos personales en la foto de la
            factura y no escribas datos personales en el chat.
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
            <strong>Consultas que no terminan en contrato:</strong> hasta un año
            desde el último contacto, salvo que nos pidas antes la supresión.
          </li>
          <li>
            <strong>Datos de clientes:</strong> mientras dure la relación y,
            después, durante los plazos de prescripción legal (con carácter
            general, seis años en materia mercantil y cuatro en materia fiscal).
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
          facturas y datos de suministro— con el cuidado que merece.
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
