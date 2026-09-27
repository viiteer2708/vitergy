# Mejoras de vitergy.es

Cajón de mejoras que propone el arquitecto (`.claude/skills/arquitecto/`). Cuando Victor pregunte
«¿qué mejoro hoy?», se abre este archivo y se elige. Las hechas se marcan con su fecha y **no se
borran**: el historial cuenta cómo ha evolucionado la web. Las descartadas no se apuntan.

## Pendientes

### Del test a la calculadora sin volver a escribir el email
- **Fecha:** 27-sep-2026 (escaneo tras montar el test de la factura)
- **Qué:** quien termina el test y pulsa «Sube tu factura» llega a la calculadora con su email ya
  puesto, y el aviso del estudio que llega a hola@vitergy.es incluye su perfil del test (p. ej.
  «👻 Potencia Fantasma, potencia 85/100»).
- **Para qué:** menos pasos, más estudios terminados; y Victor sabe por dónde empezar antes de
  llamar.
- **Tamaño:** mediana (toca la calculadora, que ya funciona: probarla a fondo). La sesión del test
  ya sabe quién es (`/api/auth/me`) y su resultado (`vitergy_test_resultado`).
- **Conecta:** test ↔ calculadora ↔ aviso de leads.

### Que el chat y el blog lleven al test
- **Fecha:** 27-sep-2026 (escaneo tras montar el test de la factura)
- **Qué:** si alguien pregunta al chat «¿estoy pagando mucho?», el chat le propone el test; y al
  final de cada artículo sale una caja «¿Pagas la luz de más? Test de 4 minutos».
- **Para qué:** el test solo capta emails si la gente llega a él, y el blog y el chat son puertas
  por las que ya entra gente.
- **Tamaño:** pequeña (`instrucciones()` de `src/app/api/chat/route.ts` y la llamada final de
  `src/app/blog/[slug]/page.tsx` y de los 10 artículos originales).
- **Conecta:** chat y blog ↔ test.

### Publicar el test en la ficha de Google Maps
- **Fecha:** 27-sep-2026 (escaneo tras montar el test de la factura)
- **Qué:** una publicación en la ficha («¿Pagas la luz de más? Descúbrelo en 4 minutos») con el
  botón al test. Claude prepara el texto (sin precios ni teléfonos) y Victor la pega, igual que con
  los artículos (la publicación automática sigue bloqueada por Google, ver la de abajo).
- **Para qué:** la ficha es lo que más clientes trae y una publicación nueva la mantiene activa.
- **Tamaño:** pequeña (5 minutos de Victor).
- **Conecta:** ficha de Google Maps ↔ test.

### Cada artículo nuevo, publicado también en la ficha de Google Maps de Vitergy
- **Fecha:** 26-sep-2026 (escaneo tras montar el blog)
- **Qué:** al publicar un artículo, sale una publicación en la ficha de Google de Vitergy con su
  enlace y un botón «Más información», como ya hace Horizonte Exclusivo.
- **Para qué:** la ficha es lo que más clientes trae (Vitergy sale el primero en Maps en Molins de
  Rei); publicar con regularidad la mantiene activa y manda visitas al blog.
- **Tamaño:** mediana. Hace falta que Victor dé permiso una vez con su cuenta de Google (OAuth con
  el permiso `business.manage`). Después se reutiliza `scripts_seo/gbp_post.py` del repo
  `luxury-travel`, que ya publica en la ficha de Horizonte (cola de publicaciones + botón con UTM).
- **Conecta:** blog ↔ ficha de Google Maps.
- **Estado (26-sep-2026):** Victor dio su permiso, pero **el bloqueo es de Google**: para publicar
  por programa en una ficha, Google tiene que aprobar el acceso de la aplicación a la API de
  publicaciones (`localPosts`, cuota 0 hasta la aprobación). Se pidió para Horizonte en agosto y
  sigue sin aprobarse; allí funciona el plan B (cada lunes, `/root/avisos/gbp-post-lunes.sh` manda
  a Victor por Telegram el texto listo para pegar). **Plan B en vitergy mientras tanto:** al
  publicar un artículo, Claude prepara la publicación (texto sin precios ni teléfonos, de 1.500
  caracteres como mucho, con el botón «Más información» al artículo) y Victor la pega en la ficha.
  El primero se entregó el 26-sep. Si Google aprueba el acceso, se automatiza con `gbp_post.py`.

## Hechas

- ✅ **26-sep-2026 — El chat recomienda artículos del blog.** Cuando una duda la responde un
  artículo, el asistente deja su enlace y la burbuja lo convierte en un enlace interno: al pulsarlo,
  la conversación sigue abierta. Conecta el chat de IA con el blog.
- ✅ **26-sep-2026 — Los 3 últimos artículos en la portada** (sección «Del blog», antes de la
  llamada final). La portada, la página con más fuerza, enlaza cada artículo nuevo. Conecta la
  portada con el blog.
