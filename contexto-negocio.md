# Contexto de negocio (Prompt 0) — Vitergy

> Archivo base de la skill `seo-local`. Se carga una vez y se referencia en cada auditoría.
> Rellenado el 5-jul-2026 a partir del código del proyecto. Revisa/corrige lo marcado `⚠️` y `PENDIENTE`.

## 1. Identidad del negocio (NAP)
- **Nombre exacto (GBP):** Vitergy — Asesoría Energética  ⚠️ confirmar que coincide literalmente con la ficha de Google
- **Dirección:** Carrer de Ferran Agulló 6, local · 08750 Molins de Rei (Barcelona)
- **Teléfono:** 633 15 10 83 (+34633151083) — mismo en web, WhatsApp y schema ✅
- **Web:** https://vitergy.es
- **Email:** info@vitergy.es
- **Razón social:** Por encima del techo del cielo SL

## 2. Ficha de Google Business Profile
- **URL pública (Google Maps):** PENDIENTE (necesaria para las auditorías 1-8)
- **Categoría principal actual:** PENDIENTE (probable: "Asesor energético" / "Consultor")
- **Categorías secundarias:** PENDIENTE
- **¿Acceso de gestión a la ficha?** PENDIENTE

## 3. Qué vende y dónde
- **Servicios principales:** consultoría energética, comparador de tarifas de luz, estudio de
  factura, cambio de compañía, optimización de potencia, autoconsumo fotovoltaico, instalación
  de baterías, monitorización de consumo, penalizaciones eléctricas.
- **Servicio estrella:** análisis de factura → ahorro ("si no te ahorro, no cobro").
- **Zona de servicio:** Molins de Rei · Barcelona · Cataluña · España (SAB + local).
- **Local con clientes o a domicilio:** local físico en Molins de Rei + servicio remoto.

## 4. Cliente y propuesta de valor
- **Cliente ideal:** familias, negocios de barrio y comunidades de vecinos que pagan de más.
- **Propuesta única:** asesor independiente (no trabaja para ninguna eléctrica), análisis gratis,
  cobra solo si ahorra, gestiona todo el papeleo sin cortes de luz.
- **Objeciones frecuentes:** "¿me cortan la luz?", "¿cuánto cuesta?", "¿trabajáis para una compañía?".

## 5. Competidores locales (mínimo 3)
- **Competidor 1:** PENDIENTE
- **Competidor 2:** PENDIENTE
- **Competidor 3:** PENDIENTE
> Sin navegador en este entorno no puedo descubrirlos en Google Maps. Dímelos tú, o córrelo en
> Cowork (con navegador) para la mitad "yo vs 3" de cada auditoría.

## 6. Keywords objetivo
- **3 principales:** "asesoría energética Molins de Rei", "asesor energético Barcelona",
  "ahorrar en la factura de la luz".
- **Long-tail / secundarias:** "cambiar de compañía de luz", "optimización de potencia",
  "estudio de factura eléctrica", "autoconsumo fotovoltaico Barcelona".
- **Términos de cliente:** "me cambian de compañía sin avisar", "pago mucho de luz", "penalizaciones".

## 7. Activos y accesos
- **Google Search Console:** PENDIENTE (habilita la auditoría 12)
- **Google Analytics:** PENDIENTE
- **CMS:** Next.js 16 (App Router) en Vercel — control total del código y del schema.
- **Directorios ya dados de alta:** PENDIENTE (auditoría 15 · NAP/citaciones)

## 8. Objetivo y restricciones
- **Objetivo 90 días:** más contactos por WhatsApp/formulario desde SEO local.
- **Idioma entregables:** Español (España).
- **Tono de marca:** cercano, honesto, "sin humo"; naranja #f97316 + navy #1f2942 (Geist).
- **Líneas rojas:** captación 100% por WhatsApp/teléfono (el formulario no envía email; abre WhatsApp).

---

## Registro de auditorías

| Fecha | Auditoría | Estado | Acciones abiertas |
|-------|-----------|--------|-------------------|
| 2026-07-05 | 10 · Money page (home `/`) | Hecha (mitad "yo"); competidores pendientes | P1: quitar `aggregateRating` self-serving + reforzar H1 con keyword+geo · P2: `streetAddress` en schema, `Service` schema, `priceRange`, click-to-call en hero · P3: calibrar FAQPage, revisar testimonio "GRUPO NEW ENERGY" |
