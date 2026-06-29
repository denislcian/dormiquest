import { useEffect, useMemo, useRef, useState } from 'react'
import type { PublicState, Self } from '../types'
import { getSelfId } from '../identity'
import { useRoom } from '../useRoom'

type Props = {
  onBack: () => void
}

export function PlayerGame({ onBack }: Props) {
  const id = useMemo(getSelfId, [])
  const [name, setName] = useState(() => localStorage.getItem('dormiquest.playerName') ?? '')
  const [codeInput, setCodeInput] = useState('')
  const [joined, setJoined] = useState(false)
  const [state, setState] = useState<PublicState | null>(null)
  const [notFound, setNotFound] = useState(false)
  const gotSync = useRef(false)

  const self: Self = { id, name: name.trim() || 'Jugador' }
  const code = joined ? codeInput.trim().toUpperCase() : null

  const { status, buzz } = useRoom({
    code,
    role: 'player',
    self,
    onSync: (s) => {
      gotSync.current = true
      setNotFound(false)
      setState(s)
    },
  })

  // Si tras conectar no llega ningún estado, la sala no existe.
  useEffect(() => {
    if (!joined || status !== 'connected') return
    gotSync.current = false
    const t = setTimeout(() => {
      if (!gotSync.current) setNotFound(true)
    }, 6000)
    return () => clearTimeout(t)
  }, [joined, status])

  const join = () => {
    if (!name.trim() || !codeInput.trim()) return
    localStorage.setItem('dormiquest.playerName', name.trim())
    setJoined(true)
  }

  const leave = () => {
    setJoined(false)
    setState(null)
    setNotFound(false)
  }

  // ---------- Pantalla de entrada ----------
  if (!joined) {
    return (
      <div className="app">
        <header className="topbar">
          <div className="brand">
            <span className="logo">📱</span>
            <h1>DormiQuest</h1>
          </div>
          <nav className="toolbar">
            <button className="ghost" onClick={onBack}>
              ← Menú
            </button>
          </nav>
        </header>

        <div className="panel">
          <h2>Unirse a una sala</h2>
          <p className="hint">Escribe tu nombre y el código que te dé el anfitrión.</p>
          <label className="field">
            <span className="l">Tu nombre</span>
            <input
              type="text"
              value={name}
              maxLength={16}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
            />
          </label>
          <label className="field">
            <span className="l">Código de sala</span>
            <input
              type="text"
              value={codeInput}
              maxLength={6}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && join()}
              placeholder="Ej. ABCD"
              style={{ textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 700 }}
            />
          </label>
          <div className="modal-actions">
            <span />
            <button className="primary" onClick={join} disabled={!name.trim() || !codeInput.trim()}>
              Entrar
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ---------- En sala ----------
  const connecting = status === 'connecting' || (status === 'connected' && !state && !notFound)
  const current = state?.current
  const winner = state?.buzzWinner ?? null
  const iWon = winner?.id === id
  const iMissed = state?.missed?.includes(id) ?? false
  const canBuzz = Boolean(current && state?.buzzOpen && !winner && !iMissed)
  const myScore = state?.scores?.[id] ?? 0
  const ranked = state ? [...state.players].sort((a, b) => (state.scores[b.id] ?? 0) - (state.scores[a.id] ?? 0)) : []

  return (
    <div className="app player-app">
      <header className="topbar">
        <div className="brand">
          <span className="logo">📱</span>
          <h1>{self.name}</h1>
        </div>
        <nav className="toolbar">
          <span className="conn-badge">{myScore} pts</span>
          <button className="ghost" onClick={leave}>
            ← Salir
          </button>
        </nav>
      </header>

      {status === 'error' && (
        <div className="panel">
          <h2>Sin conexión</h2>
          <p className="hint">No se pudo conectar al servicio en tiempo real. Inténtalo de nuevo.</p>
        </div>
      )}

      {notFound && (
        <div className="panel">
          <h2>Sala no encontrada</h2>
          <p className="hint">
            Nadie respondió con el código <strong>{code}</strong>. Comprueba que el anfitrión ha
            creado la sala y que el código es correcto.
          </p>
          <button onClick={leave}>Probar otro código</button>
        </div>
      )}

      {connecting && !notFound && <div className="empty">Conectando con la sala {code}…</div>}

      {state && !notFound && (
        <>
          {!current ? (
            <div className="player-wait">
              <div className="big-wait">⏳</div>
              <p>Esperando a que el anfitrión elija una pregunta…</p>
              <div className="lobby-players" style={{ justifyContent: 'center' }}>
                {state.categories.map((c) => (
                  <span key={c.id} className="chip">
                    {c.icon} {c.name}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="player-question">
              <div className="q-meta">
                <span>
                  {current.categoryIcon} {current.categoryName}
                </span>
                <span className="q-points">{current.points} pts</span>
              </div>
              <div className="q-prompt">{current.prompt}</div>
              {current.image && (
                <div className={'q-image' + (current.categoryId === 'formas' ? ' shape' : '')}>
                  <img src={current.image} alt="Pista de la pregunta" />
                </div>
              )}

              {state.revealed && state.answer && (
                <div className="answer">
                  <div className="label">Respuesta correcta</div>
                  <div className="value">{state.answer}</div>
                </div>
              )}

              {/* Pulsador */}
              <button
                className={'buzzer' + (iWon ? ' won' : '')}
                disabled={!canBuzz}
                onClick={buzz}
              >
                {iWon
                  ? '✋ ¡Pulsaste primero!'
                  : winner
                    ? `🔒 ${winner.name} se adelantó`
                    : iMissed
                      ? 'Has fallado — espera'
                      : canBuzz
                        ? '¡PULSA!'
                        : 'Pulsadores cerrados'}
              </button>
              {iWon && <p className="buzz-hint">Responde en voz alta. El anfitrión valida.</p>}
            </div>
          )}

          {/* Marcador compacto */}
          <div className="player-scores">
            {ranked.map((p) => (
              <div key={p.id} className={'pscore-row' + (p.id === id ? ' me' : '')}>
                <span>{p.id === id ? '⭐ ' : ''}{p.name}</span>
                <strong>{state.scores[p.id] ?? 0}</strong>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
