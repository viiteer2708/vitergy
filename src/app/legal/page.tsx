import type { Metadata } from "next";
import Link from "next/link";
import { Apartado, LegalDoc, TablaDatos, TITULAR } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Aviso Legal - Vitergy",
  description:
    "Aviso legal de vitergy.es: datos identificativos del titular, condiciones de uso del sitio, propiedad intelectual y régimen de responsabilidad.",
  alternates: { canonical: "https://vitergy.es/legal" },
};

export default function AvisoLegalPage() {
  const filas = [
    { label: "Titular", value: TITULAR.razonSocial },
    { label: "Nombre comercial", value: TITULAR.marca },
    ...(TITULAR.nif ? [{ label: "NIF", value: TITULAR.nif }] : []),
    { label: "Domicilio", value: TITULAR.domicilio },
    {
      label: "Correo electrónico",
      value: (
        <a
          href={`mailto:${TITULAR.email}`}
          className="text-[#f97316] underline underline-offset-4"
        >
          {TITULAR.email}
        </a>
      ),
    },
    {
      label: "Teléfono",
      value: (
        <a
          href={`tel:${TITULAR.telefonoLink}`}
          className="text-[#f97316] underline underline-offset-4"
        >
          {TITULAR.telefono}
        </a>
      ),
    },
    { label: "Sitio web", value: TITULAR.dominio },
    { label: "Actividad", value: "Asesoría y consultoría energética independiente" },
  ];

  return (
    <LegalDoc
      titulo="Aviso legal"
      entradilla="Quién está detrás de vitergy.es, en qué condiciones puedes usar este sitio y hasta dónde llega nuestra responsabilidad sobre lo que aquí se publica."
    >
      <Apartado titulo="1. Datos identificativos">
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la
          Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se
          facilitan los siguientes datos del titular de este sitio web:
        </p>
        <TablaDatos filas={filas} />
      </Apartado>

      <Apartado titulo="2. Objeto">
        <p>
          Este sitio web tiene una finalidad informativa y de contacto comercial.
          A través de él damos a conocer nuestros servicios de asesoría
          energética, publicamos contenidos divulgativos sobre el mercado de la
          luz y el gas, y ponemos a disposición del usuario herramientas de
          consulta de precios y de cálculo de consumo.
        </p>
        <p>
          El acceso al sitio es gratuito y no requiere registro. La utilización
          del mismo atribuye la condición de usuario e implica la aceptación de
          las condiciones recogidas en este aviso legal.
        </p>
      </Apartado>

      <Apartado titulo="3. Condiciones de uso">
        <p>
          El usuario se compromete a hacer un uso adecuado de los contenidos y
          servicios del sitio, y a no emplearlos para actividades contrarias a la
          ley, a la buena fe o al orden público, ni para dañar, inutilizar o
          sobrecargar el sitio o impedir su normal utilización por otros usuarios.
        </p>
        <p>
          Nos reservamos el derecho a modificar en cualquier momento la
          presentación, configuración y contenidos del sitio, así como a
          suspender temporalmente su disponibilidad por motivos técnicos.
        </p>
      </Apartado>

      <Apartado titulo="4. Propiedad intelectual e industrial">
        <p>
          Los textos, el diseño, la marca, el logotipo, los gráficos y el código
          fuente de este sitio son titularidad de {TITULAR.razonSocial} o de
          terceros que han autorizado su uso, y están protegidos por la normativa
          de propiedad intelectual e industrial.
        </p>
        <p>
          Queda prohibida su reproducción, distribución, comunicación pública o
          transformación sin autorización expresa. Sí está permitido citar
          fragmentos de nuestros contenidos siempre que se indique la fuente y se
          enlace a la página original.
        </p>
      </Apartado>

      <Apartado titulo="5. Responsabilidad sobre los contenidos energéticos">
        <p>
          Este es el punto que más nos importa dejar claro. La información sobre
          tarifas, precios, periodos horarios, ahorros y normativa que se publica
          en este sitio tiene <strong>carácter orientativo y divulgativo</strong>.
          El mercado energético cambia de forma constante: los precios de la
          energía, los peajes, los cargos y los impuestos se actualizan
          periódicamente por resolución administrativa o por evolución del
          mercado mayorista.
        </p>
        <p>
          En consecuencia, ninguna cifra, rango de ahorro, escenario de cálculo o
          ejemplo publicado en este sitio constituye una oferta, un compromiso
          contractual ni una garantía de resultado. Los escenarios de cálculo que
          aparecen en las páginas de sector están expresamente identificados como
          tales y no corresponden a clientes concretos.
        </p>
        <p>
          Cualquier recomendación con efectos económicos se realiza siempre de
          forma individualizada, tras analizar la documentación real del
          suministro del cliente, y se formaliza por escrito. Las herramientas de
          precio de la luz que ofrece este sitio se alimentan de la API pública de
          Red Eléctrica de España; no respondemos de la disponibilidad ni de la
          exactitud de los datos facilitados por esa fuente.
        </p>
      </Apartado>

      <Apartado titulo="6. Enlaces a sitios de terceros">
        <p>
          Este sitio puede contener enlaces a páginas de terceros (entre otros,
          Red Eléctrica de España, WhatsApp o comercializadoras energéticas). No
          controlamos ni respondemos de los contenidos, políticas o prácticas de
          esos sitios, que se rigen por sus propias condiciones.
        </p>
      </Apartado>

      <Apartado titulo="7. Protección de datos y cookies">
        <p>
          El tratamiento de los datos personales que nos facilites se rige por
          nuestra{" "}
          <Link
            href="/privacidad"
            className="font-semibold text-[#f97316] underline underline-offset-4"
          >
            política de privacidad
          </Link>
          . El uso de cookies y tecnologías similares se detalla en la{" "}
          <Link
            href="/cookies"
            className="font-semibold text-[#f97316] underline underline-offset-4"
          >
            política de cookies
          </Link>
          .
        </p>
      </Apartado>

      <Apartado titulo="8. Legislación aplicable y jurisdicción">
        <p>
          Este aviso legal se rige por la legislación española. Para la
          resolución de cualquier controversia derivada del acceso o uso del
          sitio, las partes se someten a los juzgados y tribunales que resulten
          competentes conforme a la normativa aplicable. Si el usuario tiene la
          condición de consumidor, serán competentes los tribunales de su
          domicilio.
        </p>
      </Apartado>
    </LegalDoc>
  );
}
