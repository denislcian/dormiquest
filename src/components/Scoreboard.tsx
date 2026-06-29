import type { Player } from '../types'

type Props = {
  players: Player[]
  currentPlayerIndex: number
}

export function Scoreboard({ players, currentPlayerIndex }: Props) {
  if (players.length === 0) return null
  return (
    <div className="scoreboard">
      {players.map((p, i) => (
        <div
          key={p.id}
          className={'score-card' + (i === currentPlayerIndex ? ' active' : '')}
          style={{ ['--accent' as string]: p.color }}
        >
          {i === currentPlayerIndex && <span className="turn-tag">Turno</span>}
          <div className="pname">{p.name}</div>
          <div className="pscore">{p.score}</div>
        </div>
      ))}
    </div>
  )
}
