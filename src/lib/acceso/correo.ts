// El correo con el código de acceso. Breve y limpio: el código grande, cuánto
// dura y qué hacer si no lo has pedido tú. Sale de hola@vitergy.es por Brevo.

import { enviarEmail } from "@/lib/brevo";
import { CODIGO_CADUCA_MIN, ORIGENES, type Origen } from "./reglas";

export function enviarCodigoPorEmail(email: string, codigo: string, origen: Origen): Promise<boolean> {
  const para = ORIGENES[origen];
  const separado = `${codigo.slice(0, 3)} ${codigo.slice(3)}`;

  const html = `<!doctype html><html lang="es"><body style="margin:0;background:#fff7ed;padding:24px 12px;">
<div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1f2942;">
  <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#f97316;">Vitergy</p>
  <p style="margin:0 0 20px;font-size:16px;line-height:1.5;">Este es tu código para ${para}:</p>
  <p style="margin:0 0 20px;padding:18px 0;background:#fff7ed;border-radius:12px;text-align:center;font-size:34px;font-weight:700;letter-spacing:6px;">${separado}</p>
  <p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#6b7280;">Caduca en ${CODIGO_CADUCA_MIN} minutos y solo sirve una vez.</p>
  <p style="margin:0 0 24px;font-size:14px;line-height:1.5;color:#6b7280;">Si no lo has pedido tú, ignora este correo: sin el código nadie puede entrar.</p>
  <p style="margin:0;font-size:13px;line-height:1.5;color:#6b7280;">Víctor Marrón · Vitergy, asesoría energética independiente · <a href="https://vitergy.es" style="color:#f97316;">vitergy.es</a></p>
</div></body></html>`;

  const texto = `Este es tu código para ${para}: ${separado}

Caduca en ${CODIGO_CADUCA_MIN} minutos y solo sirve una vez.
Si no lo has pedido tú, ignora este correo: sin el código nadie puede entrar.

Víctor Marrón · Vitergy, asesoría energética independiente · https://vitergy.es`;

  return enviarEmail({
    para: email,
    asunto: `${separado} es tu código de Vitergy`,
    html,
    texto,
    etiqueta: "codigo-acceso",
  });
}
