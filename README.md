# 🎲 DormiQuest

Juego de preguntas tipo concurso (estilo *Jeopardy*) para jugar en grupo. Tablero de
**categorías × dificultad** (100 → 1000 pts); cada acierto suma puntos y cada fallo resta.
Tiene **dos modos**:

- **🎤 Online con pulsadores** — un *anfitrión* controla el juego desde su pantalla y los
  *concursantes* se unen desde el móvil. El más rápido en pulsar se lleva el turno. (Necesita
  Supabase, ver abajo.)
- **🖥️ Local** — una sola pantalla (tele/portátil), sin internet; el anfitrión adjudica los puntos
  a mano.

## Características

- **Pool de 20 categorías**; cada partida saca **5 al azar** (tablero 5 × 5).
- **100 preguntas** de ejemplo: Banderas (foto), Formas de países (silueta), Historia, Matemáticas,
  League of Legends, Cultura general, Cine, Música, Deportes, Videojuegos, Geografía, Ciencia,
  Animales, Comida, Mitología, Anime, Internet, Espacio, Arte y Refranes. Cada casilla tiene varias
  preguntas y sale una al azar (rejugabilidad).
- **Pulsadores en tiempo real** (modo online) vía Supabase Realtime.
- **Editor de preguntas** integrado.
- **Marcador en vivo** y ganador al terminar.

## Cómo se juega (online)

1. El anfitrión elige **Crear sala** → aparece un **código de 4 letras**.
2. Cada concursante abre la web, elige **Unirse a una sala**, pone su nombre y el código.
3. El anfitrión pulsa **Empezar** y elige una casilla del tablero.
4. La pregunta aparece en los móviles; los concursantes pulsan **¡PULSA!**. El primero gana el turno.
5. El anfitrión valida: **Correcto** (+pts) o **Fallo** (−pts y se reabre para el resto), revela la
   respuesta y pasa a la siguiente.

## Activar el modo online (Supabase, gratis)

El tiempo real usa **Supabase Realtime** (broadcast + presencia). No hace falta crear tablas ni SQL.

1. Crea una cuenta gratis en [supabase.com](https://supabase.com) y un **New project**.
2. Ve a **Settings → API** y copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY` (es pública, seguro exponerla)
3. **En local:** copia `.env.example` a `.env.local` y pega ahí las dos claves.
4. **En Vercel:** *Project → Settings → Environment Variables* → añade `VITE_SUPABASE_URL` y
   `VITE_SUPABASE_ANON_KEY`, y vuelve a desplegar (*Redeploy*).

Sin estas variables, el modo online aparece desactivado y solo funciona el modo local.

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/ para producción
```

## Desplegar en Vercel

Proyecto **Vite estático**, Vercel lo detecta solo.

1. Sube el repo a GitHub (ya está en `denislcian/dormiquest`).
2. En [vercel.com](https://vercel.com) → *Add New… → Project* → importa el repo (Framework: **Vite**).
3. Añade las variables de entorno de Supabase (ver arriba) y pulsa *Deploy*.
4. Cada `git push` a `main` vuelve a desplegar automáticamente.

## Notas

- Las imágenes de banderas y siluetas se cargan desde internet (flagcdn.com y GitHub).
- El pulsador decide el ganador por **orden de llegada al anfitrión**; con buena conexión es justo
  para una fiesta (no es un sistema de competición con milisegundos garantizados).
- El estado del modo local se guarda en el navegador (localStorage).
