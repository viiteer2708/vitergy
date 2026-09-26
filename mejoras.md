# Mejoras de vitergy.es

Cajón de mejoras que propone el arquitecto (`.claude/skills/arquitecto/`). Cuando Victor pregunte
«¿qué mejoro hoy?», se abre este archivo y se elige. Las hechas se marcan con su fecha y **no se
borran**: el historial cuenta cómo ha evolucionado la web. Las descartadas no se apuntan.

## Pendientes

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

## Hechas

- ✅ **26-sep-2026 — El chat recomienda artículos del blog.** Cuando una duda la responde un
  artículo, el asistente deja su enlace y la burbuja lo convierte en un enlace interno: al pulsarlo,
  la conversación sigue abierta. Conecta el chat de IA con el blog.
- ✅ **26-sep-2026 — Los 3 últimos artículos en la portada** (sección «Del blog», antes de la
  llamada final). La portada, la página con más fuerza, enlaza cada artículo nuevo. Conecta la
  portada con el blog.
