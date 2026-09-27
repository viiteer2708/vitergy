# Decisiones de vitergy.es

Registro de las decisiones de Victor al montar cada función (lecciones del curso y lo que salga).
Lo lee el arquitecto (`.claude/skills/arquitecto/`) antes de proponer nada. Lo nuevo va arriba.

## 27-sep-2026 · Test interactivo «¿Estás pagando la luz de más sin saberlo?»

Lección del curso «Test interactivo con resultados». Doc: [docs/tests-interactivos.md](docs/tests-interactivos.md).

### Dónde y para qué

- **Web**: vitergy.es. Victor eligió entre vitergy.es, DPC (comerciales) y Gnew (CRM interno):
  *«vitergy.es, para tus clientes»*.
- **Papel en el negocio**: el imán de contactos para quien NO tiene la factura a mano (la
  calculadora de `/contacto` sí la pide). Termina empujando a la calculadora o al WhatsApp.

### Diseño aprobado (Victor eligió la propuesta «Fugas de la factura» entre tres)

- **Tema**: «¿Estás pagando la luz de más sin saberlo?». Para casas. La versión para negocios
  quedó como posible segundo test.
- **3 ejes**: Contrato · Potencia · Hábitos.
- **15 frases en 3 bloques de 5** (escala Para nada · Poco · A medias · Bastante · Totalmente):
  1. Llevo años con la misma compañía sin comparar precios.
  2. Mi factura subió cuando se acabó una oferta o un descuento.
  3. Pago extras (mantenimiento, seguro, asistencia…) que no recuerdo haber pedido.
  4. No sé si tengo precio fijo, indexado o la tarifa regulada.
  5. De la factura solo miro el total.
  6. No sé cuántos kW de potencia tengo contratados.
  7. En casa nunca salta el automático, aunque ponga muchas cosas a la vez.
  8. No he revisado la potencia desde que vivo aquí.
  9. Aunque apenas esté en casa, la factura casi no baja.
  10. Cuando contraté la luz, nadie me preguntó qué aparatos tengo.
  11. Pongo la lavadora o el lavavajillas sin mirar la hora.
  12. No sé qué horas del día son las más caras.
  13. Dejo la tele, la consola o los cargadores enchufados todo el día.
  14. Tengo algún electrodoméstico grande con más de 10 años.
  15. La calefacción o el aire acondicionado van a tope y sin programar.
- **5 perfiles** (nombres elegidos por Victor): 😴 Contrato Dormido · 👻 Potencia Fantasma ·
  🧛 Consumo Vampiro · 🌪️ Factura Tormenta (los tres ejes ≥ 65) · 🛡️ Factura Blindada (los tres
  < 45).
- **Textos de cada perfil**: los redactó Claude con las reglas de siempre (sin cifras inventadas,
  sin rankings, independencia). **Pendiente de que Victor los lea en la web** y diga qué cambiar:
  viven en `src/lib/tests/factura-luz.ts`.
- **Llamada final**: «Sube tu factura y te digo cuánto ahorras» (→ `/contacto`) + WhatsApp con el
  perfil ya escrito. «Análisis gratis. Si no te ahorro, no cobro.»
- **Aviso**: no es un tema de salud (no hace falta el aviso clínico), pero lleva el equivalente:
  «Test orientativo: la cifra exacta de lo que puedes ahorrar solo sale de tu factura».

### Infraestructura (lo que la lección daba por hecho y vitergy no tenía)

- **Base de datos**: esquema propio `vitergy` dentro de la base de datos de DPC (Supabase, UE).
  Victor eligió esto (0 €) frente a un proyecto nuevo de Supabase (unos 10 $/mes). Aislado: sin
  API pública, solo por funciones que usa el servidor. SQL en `db/001_acceso_y_tests.sql`.
- **Acceso con código por email**: montado aquí como pieza compartida (la lección del login solo
  se había hecho en Gnew, que no admite gente de fuera). Doc: [docs/acceso-con-codigo.md](docs/acceso-con-codigo.md).
- **Remitente**: `Vitergy <hola@vitergy.es>` (elección de Victor). vitergy.es dado de alta y
  autenticado en Brevo el 27-sep-2026 (2 TXT en Hostinger: DKIM `mail._domainkey` + `brevo-code`),
  tras reconectar Victor el conector de Hostinger, cuya clave había caducado.
- **Login funcionando en producción: 27-sep-2026.** Probado de punta a punta con un alias de
  Victor: el código llega en segundos a la bandeja de entrada, se guarda el resultado, la casilla
  de consejos da de alta en `suscriptores` y en la lista 488, y con sesión no se vuelve a pedir el
  email. Los datos de prueba se borraron.
- **Suscriptores**: solo quien marca la casilla opcional de consejos (tabla `vitergy.suscriptores`
  + lista 488 de Brevo), igual que la calculadora. La lección metía a todo el que verifica.
- **Sin página `/login`, modal ni middleware**: no hay zonas privadas todavía; el formulario vive
  dentro del test y está listo para reutilizarse.
- **Colores de las barras** (validados para daltonismo y contraste): contrato `#ea580c`, potencia
  `#4f46e5`, hábitos `#0d9488`.
- **Cookies**: la web sigue sin banner. Solo instala 2 cookies técnicas (`vitergy_codigo`,
  `vitergy_sesion`) cuando alguien pide el código; políticas de cookies y privacidad
  actualizadas el 27-sep-2026.
