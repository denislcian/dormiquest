# ⚖️ El Tribunal

Juego de preguntas tipo concurso (estilo *Jeopardy*) para jugar en grupo: un tablero de
**categorías × dificultad**, el turno va rotando, cada acierto suma puntos y cada fallo resta.
Pensado para proyectar en una pantalla/tele y que un presentador lo controle.

## Características

- **Jugadores/equipos configurables** (de 1 a 8): añade y quita nombres antes de empezar.
- **Tablero 6 categorías × 5 niveles** (100 → 1000 puntos).
- **6 categorías de ejemplo**: Banderas (con foto), Formas de países (silueta), Historia,
  Matemáticas, League of Legends y Cultura general.
- **Editor de preguntas** integrado: edita, añade o borra preguntas y pega URLs de imágenes.
- **Marcador en vivo** con turno actual resaltado y ganador al terminar.
- Todo se **guarda en el navegador** (localStorage): la partida y tus preguntas no se pierden al recargar.

## Cómo se juega

1. **Jugadores** → añade a todos los participantes o equipos y pulsa *Empezar partida*.
2. En el **Tablero**, el jugador del turno elige una casilla (categoría + puntos).
3. Se abre la pregunta. Tras debatir, pulsa **Mostrar respuesta**.
4. Adjudica los puntos: **+** al que acertó (o **−** si penalizáis los fallos). Si nadie acierta,
   pulsa *Pasar*. El turno avanza solo al siguiente jugador.
5. Al gastar todas las casillas se muestra el **ganador**.

> Las preguntas se editan en la pestaña **✏️ Editor**. Para banderas usa
> `https://flagcdn.com/w640/CODIGO.png` y para siluetas
> `https://raw.githubusercontent.com/djaiss/mapsicon/master/all/CODIGO/1024.png`
> (CODIGO = código ISO del país en minúsculas, p. ej. `es`, `fr`, `jp`).

## Desarrollo local

```bash
npm install
npm run dev      # abre http://localhost:5173
npm run build    # genera dist/ para producción
```

## Desplegar en Vercel

Es un proyecto **Vite estático**, Vercel lo detecta automáticamente.

**Opción A — desde la web (sin instalar nada):**
1. Sube esta carpeta a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com) → *Add New… → Project* → importa el repo.
3. Framework: **Vite** (autodetectado). Build: `npm run build`. Output: `dist`. Pulsa *Deploy*.
4. Comparte la URL `*.vercel.app` con todos.

**Opción B — desde la terminal:**
```bash
npm i -g vercel
vercel          # sigue el asistente (la primera vez)
vercel --prod   # despliegue de producción
```

## Notas

- Las imágenes de banderas y siluetas se cargan desde internet (flagcdn.com y GitHub), así que
  hace falta conexión durante la partida.
- El estado se guarda por navegador. Si quieres empezar de cero, usa *Reiniciar tablero* o borra
  los datos del sitio.
