import { useEffect, useMemo, useRef, useState } from 'react'
import type { Category, PublicState, Question, Self } from '../types'
import { DEFAULT_CATEGORIES, pickRandomCategories } from '../data'
import { getSelfId, makeRoomCode } from '../identity'
import { useRoom } from '../useRoom'
import { Board, cellKey } from './Board'
import { Podium } from './Podium'

type Props = {
  questions: Question[]
  onBack: () => void
}

export function HostGame({ questions, onBack }: Props) {
  const [code] = useState(makeRoomCode)
  const self: Self = useMemo(() => ({ id: getSelfId(), name: 'Anfitrión' }), [])

  const [step, setStep] = useState<'lobby' | 'playing'>('lobby')
  const [categories, setCategories] = useState<Category[]>(() => pickRandomCategories(DEFAULT_CATEGORIES))
  const [players, setPlayers] = useState<Self[]>([])
  const [scores, setScores] = useState<Record<string, number>>({})
  const [answered, setAnswered] = useState<string[]>([])

  const [current, setCurrent] = useState<Question | null>(null)
  const [buzzOpen, setBuzzOpen] = useState(false)
  const [buzzWinner, setBuzzWinner] = useState<Self | null>(null)
  const [missed, setMissed] = useState<string[]>([])
  const [revealed, setRevealed] = useState(false)

  // Temporizador de respuesta
  const [timerEnabled, setTimerEnabled] = useState(true)
  const [answerSeconds, setAnswerSeconds] = useState(12)
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)

  // Refs para resolver el pulsador de forma autoritaria e inmediata.
  const buzzOpenRef = useRef(false)
  const buzzWinnerRef = useRef<Self | null>(null)
  const missedRef = useRef<string[]>([])
  const setBuzzOpenB = (v: boolean) => {
    buzzOpenRef.current = v
    setBuzzOpen(v)
  }
  const setBuzzWinnerB = (v: Self | null) => {
    buzzWinnerRef.current = v
    setBuzzWinner(v)
  }
  const setMissedB = (v: string[]) => {
    missedRef.current = v
    setMissed(v)
  }

  const playableCells = useMemo(() => {
    const allowed = new Set(categories.map((c) => c.id))
    const set = new Set<string>()
    for (const q of questions) if (allowed.has(q.categoryId)) set.add(cellKey(q.categoryId, q.points))
    return set.size
  }, [questions, categories])
  const boardFinished = step === 'playing' && playableCells > 0 && answered.length >= playableCells

  const buildPublic = (): PublicState => {
    const allScores: Record<string, number> = {}
    for (const p of players) allScores[p.id] = scores[p.id] ?? 0
    return {
      step,
      categories,
      answered,
      scores: allScores,
      players,
      current: current
        ? {
            categoryId: current.categoryId,
            categoryName: categories.find((c) => c.id === current.categoryId)?.name ?? '',
            categoryIcon: categories.find((c) => c.id === current.categoryId)?.icon ?? '',
            points: current.points,
            prompt: current.prompt,
            image: current.image,
          }
        : null,
      buzzOpen,
      buzzWinner,
      missed,
      revealed,
      answer: revealed ? current?.answer : undefined,
      secondsLeft,
      finished: boardFinished,
    }
  }
  // Mantener una referencia fresca para responder a `hello`.
  const publicRef = useRef(buildPublic())
  publicRef.current = buildPublic()

  const { status, sync } = useRoom({
    code,
    role: 'host',
    self,
    onPlayersChange: setPlayers,
    onHello: () => sync(publicRef.current),
    onBuzz: (from) => {
      if (!buzzOpenRef.current || buzzWinnerRef.current) return
      if (missedRef.current.includes(from.id)) return
      setBuzzWinnerB(from)
      setBuzzOpenB(false)
    },
  })

  // Difundir el estado cada vez que cambie algo relevante.
  useEffect(() => {
    if (status === 'connected') sync(publicRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, step, categories, answered, scores, players, current, buzzOpen, buzzWinner, missed, revealed, secondsLeft])

  // Temporizador: cuando alguien se adelanta, cuenta atrás para responder.
  useEffect(() => {
    if (!timerEnabled || !buzzWinner || revealed) {
      setSecondsLeft(null)
      return
    }
    const loser = buzzWinner
    const pts = current?.points ?? 0
    let s = answerSeconds
    setSecondsLeft(s)
    const iv = setInterval(() => {
      s -= 1
      setSecondsLeft(s)
      if (s <= 0) {
        clearInterval(iv)
        // Se acabó el tiempo = fallo: penaliza y reabre el pulsador.
        setScores((sc) => ({ ...sc, [loser.id]: (sc[loser.id] ?? 0) - pts }))
        setMissedB([...missedRef.current, loser.id])
        setBuzzWinnerB(null)
        setBuzzOpenB(true)
        setSecondsLeft(null)
      }
    }, 1000)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buzzWinner, timerEnabled, revealed, answerSeconds])

  // ---------- Acciones del anfitrión ----------
  const pickCell = (q: Question) => {
    setCurrent(q)
    setRevealed(false)
    setMissedB([])
    setBuzzWinnerB(null)
    setBuzzOpenB(true)
  }

  const award = (sign: 1 | -1) => {
    if (!current || !buzzWinner) return
    const id = buzzWinner.id
    setScores((s) => ({ ...s, [id]: (s[id] ?? 0) + sign * current.points }))
    if (sign === 1) {
      setRevealed(true)
      setBuzzOpenB(false)
    } else {
      // Fallo: penaliza y reabre el pulsador para el resto.
      setMissedB([...missedRef.current, id])
      setBuzzWinnerB(null)
      setBuzzOpenB(true)
    }
  }

  const reopen = () => {
    setBuzzWinnerB(null)
    setBuzzOpenB(true)
  }
  const reveal = () => {
    setRevealed(true)
    setBuzzOpenB(false)
  }
  const closeQuestion = () => {
    if (current) {
      const key = cellKey(current.categoryId, current.points)
      setAnswered((a) => (a.includes(key) ? a : [...a, key]))
    }
    setCurrent(null)
    setRevealed(false)
    setMissedB([])
    setBuzzWinnerB(null)
    setBuzzOpenB(false)
  }

  const reshuffle = () => setCategories(pickRandomCategories(DEFAULT_CATEGORIES))
  const startGame = () => {
    setScores({})
    setAnswered([])
    setStep('playing')
  }
  const restart = () => {
    setAnswered([])
    setScores({})
    setCurrent(null)
    setBuzzOpenB(false)
    setBuzzWinnerB(null)
    setMissedB([])
    setRevealed(false)
  }

  const ranked = [...players].sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0))

  const connBadge =
    status === 'connected' ? '🟢 En línea' : status === 'error' ? '🔴 Sin conexión' : '🟡 Conectando…'

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="logo">🎤</span>
          <h1>DormiQuest · Anfitrión</h1>
        </div>
        <nav className="toolbar">
          <span className="conn-badge">{connBadge}</span>
          <button className="ghost" onClick={onBack}>
            ← Salir
          </button>
          {step === 'playing' && (
            <button className="ghost" onClick={restart}>
              ↺ Reiniciar
            </button>
          )}
        </nav>
      </header>

      {status === 'error' && (
        <div className="panel">
          <h2>No se pudo conectar</h2>
          <p className="hint">
            Falta configurar Supabase o no hay conexión. Revisa el <code>README</code> (variables
            <code> VITE_SUPABASE_URL</code> y <code>VITE_SUPABASE_ANON_KEY</code>).
          </p>
        </div>
      )}

      {step === 'lobby' && status !== 'error' && (
        <div className="panel lobby">
          <h2>Sala creada</h2>
          <p className="hint">
            Comparte este código. Los concursantes entran en la web, eligen «Unirse a una sala» y lo
            escriben.
          </p>
          <div className="room-code">{code}</div>

          <h3 className="section">Concursantes conectados ({players.length})</h3>
          {players.length === 0 ? (
            <div className="empty">Aún no se ha unido nadie…</div>
          ) : (
            <div className="lobby-players">
              {players.map((p) => (
                <span key={p.id} className="chip">
                  📱 {p.name}
                </span>
              ))}
            </div>
          )}

          <h3 className="section">Categorías de esta partida</h3>
          <div className="lobby-players">
            {categories.map((c) => (
              <span key={c.id} className="chip">
                {c.icon} {c.name}
              </span>
            ))}
          </div>

          <h3 className="section">Temporizador de respuesta</h3>
          <div className="row-2">
            <label className="row-2" style={{ gap: 8, marginBottom: 0 }}>
              <input
                type="checkbox"
                checked={timerEnabled}
                onChange={(e) => setTimerEnabled(e.target.checked)}
              />
              Cuenta atrás al pulsar
            </label>
            <select
              value={answerSeconds}
              onChange={(e) => setAnswerSeconds(Number(e.target.value))}
              disabled={!timerEnabled}
              style={{ width: 'auto' }}
            >
              {[8, 10, 12, 15, 20].map((s) => (
                <option key={s} value={s}>
                  {s} s
                </option>
              ))}
            </select>
          </div>

          <div className="modal-actions">
            <button onClick={reshuffle}>🎲 Otras 5 categorías</button>
            <button className="primary" onClick={startGame} disabled={players.length === 0}>
              ▶ Empezar partida
            </button>
          </div>
        </div>
      )}

      {step === 'playing' && (
        <>
          <div className="scoreboard">
            {ranked.length === 0 && <div className="empty">Sin concursantes conectados.</div>}
            {ranked.map((p) => (
              <div key={p.id} className="score-card" style={{ ['--accent' as string]: '#f5c542' }}>
                <div className="pname">📱 {p.name}</div>
                <div className="pscore">{scores[p.id] ?? 0}</div>
              </div>
            ))}
          </div>

          {boardFinished && ranked.length > 0 && (
            <Podium
              entries={ranked.map((p) => ({ name: p.name, score: scores[p.id] ?? 0 }))}
              onRestart={restart}
            />
          )}

          <Board
            categories={categories}
            questions={questions}
            answered={answered}
            onPick={pickCell}
          />

          {current && (
            <HostQuestionPanel
              question={current}
              icon={categories.find((c) => c.id === current.categoryId)?.icon ?? ''}
              name={categories.find((c) => c.id === current.categoryId)?.name ?? ''}
              buzzOpen={buzzOpen}
              buzzWinner={buzzWinner}
              revealed={revealed}
              secondsLeft={secondsLeft}
              onCorrect={() => award(1)}
              onWrong={() => award(-1)}
              onReopen={reopen}
              onReveal={reveal}
              onClose={closeQuestion}
            />
          )}
        </>
      )}
    </div>
  )
}

type PanelProps = {
  question: Question
  icon: string
  name: string
  buzzOpen: boolean
  buzzWinner: Self | null
  revealed: boolean
  secondsLeft: number | null
  onCorrect: () => void
  onWrong: () => void
  onReopen: () => void
  onReveal: () => void
  onClose: () => void
}

function HostQuestionPanel({
  question,
  icon,
  name,
  buzzOpen,
  buzzWinner,
  revealed,
  secondsLeft,
  onCorrect,
  onWrong,
  onReopen,
  onReveal,
  onClose,
}: PanelProps) {
  const isShape = question.categoryId === 'formas'
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="q-meta">
          <span>
            {icon} {name}
          </span>
          <span className="q-points">{question.points} pts</span>
        </div>
        <div className="q-prompt">{question.prompt}</div>
        {question.image && (
          <div className={'q-image' + (isShape ? ' shape' : '')}>
            <img src={question.image} alt="Pista de la pregunta" />
          </div>
        )}

        <div className="answer">
          <div className="label">Respuesta (solo tú la ves)</div>
          <div className="value">{question.answer}</div>
        </div>

        <div className={'buzz-status ' + (buzzWinner ? 'won' : buzzOpen ? 'open' : 'closed')}>
          {buzzWinner ? (
            <>
              🔔 <strong>{buzzWinner.name}</strong> se adelantó — que responda
              {secondsLeft != null && (
                <span className={'countdown' + (secondsLeft <= 3 ? ' urgent' : '')}> ⏱ {secondsLeft}s</span>
              )}
            </>
          ) : buzzOpen ? (
            <>⏱️ Pulsadores abiertos — esperando a que alguien pulse…</>
          ) : (
            <>Pulsadores cerrados</>
          )}
        </div>

        {buzzWinner && (
          <div className="adj-row" style={{ ['--accent' as string]: '#51cf66' }}>
            <span className="name">{buzzWinner.name}</span>
            <button className="good" onClick={onCorrect}>
              ✅ Correcto +{question.points}
            </button>
            <button className="bad" onClick={onWrong}>
              ❌ Fallo −{question.points}
            </button>
          </div>
        )}

        <div className="modal-actions" style={{ marginTop: 16 }}>
          <div className="row-2">
            {!buzzOpen && !buzzWinner && !revealed && (
              <button onClick={onReopen}>🔔 Reabrir pulsadores</button>
            )}
            {!revealed && (
              <button onClick={onReveal}>👁 Revelar respuesta a todos</button>
            )}
          </div>
          <button className="primary" onClick={onClose}>
            Cerrar y siguiente →
          </button>
        </div>
      </div>
    </div>
  )
}
