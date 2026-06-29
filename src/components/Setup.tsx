import { useState } from 'react'
import type { Player } from '../types'
import { PLAYER_COLORS } from '../data'

type Props = {
  players: Player[]
  setPlayers: (p: Player[]) => void
  onStart: () => void
}

const newId = () => 'p-' + Math.random().toString(36).slice(2, 9)

export function Setup({ players, setPlayers, onStart }: Props) {
  const [name, setName] = useState('')

  const addPlayer = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    if (players.length >= PLAYER_COLORS.length) return
    const color = PLAYER_COLORS[players.length % PLAYER_COLORS.length]
    setPlayers([...players, { id: newId(), name: trimmed, score: 0, color }])
    setName('')
  }

  const removePlayer = (id: string) => {
    const next = players
      .filter((p) => p.id !== id)
      .map((p, i) => ({ ...p, color: PLAYER_COLORS[i % PLAYER_COLORS.length] }))
    setPlayers(next)
  }

  const rename = (id: string, value: string) =>
    setPlayers(players.map((p) => (p.id === id ? { ...p, name: value } : p)))

  return (
    <div className="panel">
      <h2>Configura la partida</h2>
      <p className="hint">
        Añade jugadores o equipos (de 1 a {PLAYER_COLORS.length}). El turno irá rotando entre ellos
        durante la partida.
      </p>

      <div className="player-rows">
        {players.map((p) => (
          <div key={p.id} className="player-row">
            <span className="swatch" style={{ background: p.color }} />
            <input
              type="text"
              value={p.name}
              onChange={(e) => rename(p.id, e.target.value)}
              placeholder="Nombre del jugador o equipo"
            />
            <button className="danger" onClick={() => removePlayer(p.id)} aria-label="Quitar">
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="row-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
          placeholder="Añadir jugador o equipo…"
          style={{ flex: '1 1 220px' }}
        />
        <button onClick={addPlayer} disabled={players.length >= PLAYER_COLORS.length}>
          + Añadir
        </button>
      </div>

      <div className="modal-actions">
        <span className="hint" style={{ margin: 0 }}>
          {players.length} {players.length === 1 ? 'jugador' : 'jugadores'}
        </span>
        <button className="primary" onClick={onStart} disabled={players.length === 0}>
          ▶ Empezar partida
        </button>
      </div>
    </div>
  )
}
