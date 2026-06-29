import { isSupabaseConfigured } from '../supabase'

type Mode = 'local' | 'host' | 'player' | 'editor'

type Props = {
  onChoose: (mode: Mode) => void
}

export function Menu({ onChoose }: Props) {
  const online = isSupabaseConfigured()

  return (
    <div className="menu">
      <div className="menu-hero">
        <span className="menu-logo">🎲</span>
        <h1>DormiQuest</h1>
        <p>Concurso de preguntas para jugar en grupo. Elige cómo queréis jugar.</p>
      </div>

      <div className="menu-grid">
        <button className="menu-card primary-card" onClick={() => onChoose('host')} disabled={!online}>
          <span className="mc-icon">🎤</span>
          <span className="mc-title">Crear sala</span>
          <span className="mc-desc">
            Eres el anfitrión: lees las preguntas y controlas el juego. Los concursantes se unen
            desde su móvil y compiten con pulsadores.
          </span>
        </button>

        <button className="menu-card" onClick={() => onChoose('player')} disabled={!online}>
          <span className="mc-icon">📱</span>
          <span className="mc-title">Unirse a una sala</span>
          <span className="mc-desc">
            Entra con el código que te dé el anfitrión y usa tu móvil como pulsador.
          </span>
        </button>

        <button className="menu-card" onClick={() => onChoose('local')}>
          <span className="mc-icon">🖥️</span>
          <span className="mc-title">Jugar en local</span>
          <span className="mc-desc">
            Una sola pantalla (tele o portátil), sin internet. El anfitrión adjudica los puntos a
            mano.
          </span>
        </button>

        <button className="menu-card" onClick={() => onChoose('editor')}>
          <span className="mc-icon">✏️</span>
          <span className="mc-title">Editor de preguntas</span>
          <span className="mc-desc">Edita, añade o borra preguntas de las 20 categorías.</span>
        </button>
      </div>

      {!online && (
        <p className="menu-note">
          ⚠️ El modo online (salas con pulsadores) está desactivado porque falta configurar
          Supabase. Mientras tanto puedes usar el modo local. Revisa el <code>README</code> para
          activarlo.
        </p>
      )}
    </div>
  )
}
