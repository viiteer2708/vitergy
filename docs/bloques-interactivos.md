# Catálogo de bloques interactivos (el menú)

El regalo de la lección del test (27-sep-2026): **100 tipos de bloque interactivo** que la web de
referencia del curso usa en sus tests, en las lecciones de sus cursos y en sus guías. **No están
montados**: es el MENÚ. Cada uno se construye cuando una pantalla lo pida («quiero un rasca y
descubre aquí»), en esta web y con su estética (naranja `#f97316`, azul oscuro `#1f2942`, Geist).

## Reglas al crear uno

1. **Cada bloque marca su «completado» con una interacción clara.** Lo que requiere tocar no avanza
   solo.
2. Los que usan sensores del móvil (agitar, inclinar) llevan **siempre un botón alternativo**.
3. Respetan la estética de la web y funcionan primero en el móvil.
4. Nada de cifras inventadas ni de rankings de compañías (reglas de Vitergy, ver `CLAUDE.md`).
5. Al crear uno, se apunta aquí con ✅, dónde vive y dónde se usa. **Es una pieza compartida**: si
   ya existe, se reutiliza; no se duplica.

## Ya montados en vitergy.es

| Bloque | Dónde vive | Dónde se usa |
|---|---|---|
| ✅ Escala 1-5 con avance automático (autoevaluación) | `src/components/tests/TestInteractivo.tsx` | `/test-factura-luz` |
| ✅ Barra que se llena (progreso por bloques) | `TestInteractivo.tsx` (`Bloques`) | `/test-factura-luz` |
| ✅ Barras de resultado por eje | `TestInteractivo.tsx` | `/test-factura-luz` |
| ✅ Resultado compartible (enlace, no imagen) | `TestInteractivo.tsx` (`compartir`) | `/test-factura-luz` |
| ✅ Semáforo rojo/amarillo/verde (horas caras, normales y baratas) | `src/lib/precios-luz.ts` (`classifyPrices`, `zoneColors`) | `/precio-luz-hoy`, `/precio-luz-manana` |

## El menú completo (100)

**Mostrar contenido (10):** texto con formato · dato impactante con número gordo · comparador de
dos cifras · cita destacada · evento en una línea de tiempo · caja de aviso (info/consejo/alerta) ·
imagen con puntos que revelan explicaciones · tarjeta de definición desplegable · antes/después
con deslizador · idea clave destacada.

**Descubrir (10):** clic para revelar · tarjetas que giran · viaje en acordeón · rasca y descubre ·
texto que aparece línea a línea · palabras ocultas que se destapan al tocar · cortina que se
arrastra · contenido tras candado (mini-pregunta para abrir) · capas que se pelan una a una ·
linterna que ilumina una pantalla oscura.

**Quiz y conocimiento (10):** pregunta de opciones con explicación · mito o realidad · rellena el
hueco · une las parejas · ordena la secuencia · quiz con imágenes · verdadero/falso a
contrarreloj · adivina el porcentaje con un deslizador · encuentra la palabra correcta entre
distractoras · encuentra la diferencia.

**Elección y opinión (12):** escenario con opciones y desenlace · esto o aquello · opinión caliente
con reacciones · ordenar prioridades · checklist espejo («marca las que te pasan») · espectro de
acuerdo/desacuerdo · qué preferirías, con lo que eligieron otros · dilema con consecuencias en
cascada · encuesta con barras · toma de postura con argumentos de los dos lados · marcar lo que
no aceptarías nunca · ranking de valores personales.

**Reflexión y escritura (9):** monólogo interno reconocible · pregunta abierta para escribir · carta
a tu yo del futuro · selector de emoción · tarro de gratitud · reescribir en positivo · recuerdo
guiado · tarjeta de compromiso firmada · nube de palabras propia.

**Autoevaluación (7):** escala 1-5 / 1-7 con respuesta · deslizador entre dos extremos · medidor de
energía · rueda de la vida con varios ejes · chequeo de frecuencia · medidor de confianza
antes/después · silueta donde marcar zonas.

**Tiempo y reto (7):** botón tentador contra tu impulso · ronda rápida con puntuación · respiración
guiada · mini-pomodoro de concentración · tiempo de reacción · pulsa en el momento justo · cuenta
atrás que revela.

**Clasificación (7):** arrastrar a cubos · deslizar tarjetas a izquierda/derecha · diagrama de Venn
arrastrable · colocar en un espectro · matriz 2×2 (urgente/importante) · semáforo
rojo/amarillo/verde · tier list S/A/B/C/D.

**Narrativa (7):** elige tu aventura · conversación simulada con respuestas a elegir · constructor
de historia · un día en la vida con decisiones · viaje al futuro (1 mes / 1 año / 5 años) · la misma
escena desde varios puntos de vista · viñetas secuenciales.

**Social (5):** resultado compartible como imagen · «el X % eligió lo mismo» · componer un mensaje
para alguien · explica lo aprendido a un amigo · consejo a un amigo ficticio.

**Gamificación (7):** colector de puntos · insignia que se desbloquea · racha de aciertos · mini
misión por pasos · barra que se llena con pequeñas acciones · logro desbloqueado · subida de
nivel.

**Físicos (6):** agita el móvil para revelar · laberinto inclinando el móvil · sigue el ritmo
tocando · dibuja un gesto · reto de foto real · ejercicio frente al espejo con temporizador.

**Creativos (3):** elige los colores de tu ánimo · cuéntalo solo con emojis · collage arrastrable.

## Ideas que encajan en vitergy.es (para cuando se pidan)

- **Mito o realidad** en el blog: «¿Cambiar de compañía corta la luz?» (no).
- **Checklist espejo** en el artículo del cambio sin consentimiento: «marca las señales que has
  visto en tu factura».
- **Adivina el porcentaje** con deslizador: «¿qué parte de tu factura es la potencia?», con la
  respuesta sacada de una factura real.
- **Antes/después con deslizador** en `/grandes-consumos`: la factura de un cliente antes y después
  (solo con cifras verificadas factura a factura).
- **Pulsa en el momento justo** con el semáforo de `/precio-luz-hoy`: «¿a qué hora pondrías la
  lavadora hoy?», y el acierto sale de los precios reales del día.
