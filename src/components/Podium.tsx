type Entry = { name: string; score: number }

type Props = {
  entries: Entry[]
  onRestart?: () => void
}

const MEDALS = ['🥇', '🥈', '🥉']
// Orden visual del podio: 2º a la izquierda, 1º en el centro, 3º a la derecha.
const ORDER = [1, 0, 2]
// Altura de barra según posición visual: 2º (medio), 1º (alto), 3º (bajo).
const HEIGHTS = ['130px', '190px', '92px']

export function Podium({ entries, onRestart }: Props) {
  const ranked = [...entries].sort((a, b) => b.score - a.score)
  const top = ORDER.map((i) => (ranked[i] ? { ...ranked[i], place: i } : null))
  const rest = ranked.slice(3)

  return (
    <div className="podium-wrap">
      <h2 className="podium-title">🏁 ¡Fin de la partida!</h2>

      <div className="podium">
        {top.map((e, idx) =>
          e ? (
            <div key={e.place} className={'podium-col place-' + e.place}>
              <div className="podium-medal">{MEDALS[e.place]}</div>
              <div className="podium-name">{e.name}</div>
              <div className="podium-bar" style={{ height: HEIGHTS[idx] }}>
                <span className="podium-score">{e.score}</span>
                <span className="podium-place">{e.place + 1}º</span>
              </div>
            </div>
          ) : (
            <div key={'empty-' + idx} className="podium-col empty" />
          ),
        )}
      </div>

      {rest.length > 0 && (
        <div className="podium-rest">
          {rest.map((e, i) => (
            <div key={e.name + i} className="podium-rest-row">
              <span>
                {i + 4}º {e.name}
              </span>
              <strong>{e.score}</strong>
            </div>
          ))}
        </div>
      )}

      {onRestart && (
        <button className="primary" onClick={onRestart} style={{ marginTop: 18 }}>
          🔄 Jugar otra vez
        </button>
      )}
    </div>
  )
}
