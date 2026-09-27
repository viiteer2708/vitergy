import type { Metadata } from "next";
import Link from "next/link";
import { Apartado, LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Política de Cookies - Vitergy",
  description:
    "Política de cookies de vitergy.es. Esta web no instala cookies de análisis, publicidad ni perfilado. Te explicamos qué ocurre exactamente cuando navegas por el sitio.",
  alternates: { canonical: "https://vitergy.es/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalDoc
      titulo="Política de cookies"
      entradilla="La versión corta: esta web no te instala cookies de análisis, de publicidad ni de perfilado. Ninguna. Solo una cookie técnica, y solo si tú verificas tu email en el test. Aquí tienes la versión larga."
    >
      <Apartado titulo="1. Qué es una cookie">
        <p>
          Una cookie es un pequeño archivo que un sitio web guarda en tu
          navegador cuando lo visitas. Sirve para recordar información entre
          páginas o entre visitas: desde mantener una sesión abierta hasta
          registrar por dónde navegas para mostrarte publicidad después.
        </p>
      </Apartado>

      <Apartado titulo="2. Qué cookies usa vitergy.es">
        <div className="rounded-2xl border border-orange-100 bg-[#fff7ed] p-6">
          <p className="font-semibold text-[#1f2942]">
            Solo cookies técnicas, y solo si tú las pides.
          </p>
          <p className="mt-2 text-sm leading-6">
            Navegar por la web no instala ninguna cookie. No usamos Google
            Analytics, ni píxeles de redes sociales, ni herramientas de mapas de
            calor o grabación de sesiones.
          </p>
          <p className="mt-2 text-sm leading-6">
            La única excepción es el{" "}
            <Link
              href="/test-factura-luz"
              className="font-semibold text-[#f97316] underline underline-offset-4"
            >
              test de la factura de la luz
            </Link>
            : si al terminarlo pides un código para guardar tu resultado, se
            instalan estas dos cookies técnicas, propias y necesarias para el
            servicio que nos pides:
          </p>
          <ul className="mt-2 ml-5 list-disc space-y-1 text-sm leading-6">
            <li>
              <strong>vitergy_codigo</strong>: une tu navegador con el código que
              te acabamos de enviar. Dura 15 minutos.
            </li>
            <li>
              <strong>vitergy_sesion</strong>: te mantiene identificado una vez
              verificado tu email, para guardar y enseñarte tu resultado sin
              volver a pedirte el código. Dura un año; se borra si pulsas
              «¿No eres tú? Salir».
            </li>
          </ul>
          <p className="mt-2 text-sm leading-6">
            Por eso no verás un banner de consentimiento al entrar: la normativa
            (art. 22.2 de la LSSI) solo exige pedirlo para cookies que no sean
            estrictamente necesarias, y aquí no se instala ninguna de ese tipo.
          </p>
        </div>
      </Apartado>

      <Apartado titulo="3. Servicios de terceros con los que conecta el sitio">
        <p>
          Aunque no instalemos cookies, el sitio se comunica con dos servicios
          externos. Conviene que sepas qué implica cada uno:
        </p>
        <ul className="ml-5 list-disc space-y-3">
          <li>
            <strong>Red Eléctrica de España (apidatos.ree.es).</strong> Las
            herramientas de precio de la luz consultan la API pública de REE
            directamente desde tu navegador para mostrarte los precios del día. Es
            una consulta de datos públicos: no enviamos ningún dato tuyo en esa
            llamada ni la utilizamos para identificarte o seguirte.
          </li>
          <li>
            <strong>WhatsApp (Meta Platforms Ireland Ltd.).</strong> Los botones
            de WhatsApp del sitio son enlaces. Mientras no los pulses, no ocurre
            nada. Si los pulsas, sales de vitergy.es hacia un dominio de Meta, que
            sí puede utilizar sus propias cookies y se rige por su propia política
            de privacidad.
          </li>
        </ul>
      </Apartado>

      <Apartado titulo="4. Cómo gestionar las cookies en tu navegador">
        <p>
          Aunque aquí no haga falta, puedes revisar, bloquear o eliminar las
          cookies de cualquier sitio desde la configuración de tu navegador:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Chrome: Configuración → Privacidad y seguridad → Cookies</li>
          <li>Firefox: Ajustes → Privacidad y seguridad → Cookies y datos</li>
          <li>Safari: Preferencias → Privacidad</li>
          <li>Edge: Configuración → Cookies y permisos del sitio</li>
        </ul>
        <p>
          Ten en cuenta que bloquear todas las cookies puede impedir el
          funcionamiento normal de otros sitios web.
        </p>
      </Apartado>

      <Apartado titulo="5. Si esto cambia">
        <p>
          Si en el futuro incorporamos analítica web o cualquier otra tecnología
          que sí instale cookies no necesarias, actualizaremos esta política,
          detallaremos cada cookie con su finalidad y su duración, y mostraremos
          un banner de consentimiento previo antes de instalarlas. Hasta entonces,
          esta página describe exactamente lo que ocurre.
        </p>
        <p>
          El tratamiento de los datos que nos facilitas por otras vías se explica
          en nuestra{" "}
          <Link
            href="/privacidad"
            className="font-semibold text-[#f97316] underline underline-offset-4"
          >
            política de privacidad
          </Link>
          .
        </p>
      </Apartado>
    </LegalDoc>
  );
}
