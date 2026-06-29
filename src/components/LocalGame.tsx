import { useMemo, useState } from 'react'
import type { Category, Player, Question } from '../types'
import { DEFAULT_CATEGORIES, pickRandomCategories } from '../data'
import { useLocalStorage } from '../useLocalStorage'
import { Scoreboard } from './Scoreboard'
import { Board, cellKey } from './Board'
import { QuestionModal } from './QuestionModal'
import { Setup } from './Setup'

type Props = {
  questions: Question[]
  onBack: () => void
}

type LocalPhase = 'setup' | 'board'

export function LocalGame({ questions, onBack }: Props) {
  const [phase, setPhase] = useState<LocalPhase>('setup')
  const [players, setPlayers] = useLocalStorage<Player[]>('dormiquest.local.players', [])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useLocalStorage<number>(
    'dormiquest.local.turn',
    0,
  )
  const [answered, setAnswered] = useLocalStorage<string[]>('dormiquest.local.answered', [])
  const [catIds, setCatIds] = useLocalStorage<string[]>('dormiquest.local.cats', [])

  const [openQuestion, setOpenQuestion] = useState<Question | null>(null)

  const categories: Category[] = useMemo(() => {
    const chosen = catIds
      .map((id) => DEFAULT_CATEGORIES.find((c) => c.id === id))
      .filter((c): c is Category => Boolean(c))
    return chosen.length ? chosen : DEFAULT_CATEGORIES.slice(0, 5)
  }, [catIds])

  const playableCells = useMemo(() => {
    const allowed = new Set(categories.map((c) => c.id))
    const set = new Set<string>()
    for (const q of questions) {
      if (allowed.has(q.categoryId)) set.add(cellKey(q.categoryId, q.points))
    }
    return set.size
  }, [questions, categories])
  const boardFinished = playableCells > 0 && answered.length >= playableCells

  const nextTurn = () => {
    if (players.length > 0) setCurrentPlayerIndex((i) => (i + 1) % players.length)
  }

  const handleScore = (playerId: string, sign: 1 | -1) => {
    if (!openQuestion) return
    setPlayers(
      players.map((p) =>
        p.id === playerId ? { ...p, score: p.score + sign * openQuestion.points } : p,
      ),
    )
  }

  const closeQuestion = () => {
    if (openQuestion) {
      const key = cellKey(openQuestion.categoryId, openQuestion.points)
      setAnswered((a) => (a.includes(key) ? a : [...a, key]))
      nextTurn()
    }
    setOpenQuestion(null)
  }

  const newGame = () => {
    setCatIds(pickRandomCategories(DEFAULT_CATEGORIES).map((c) => c.id))
    setAnswered([])
    setCurrentPlayerIndex(0)
    setPlayers(players.map((p) => ({ ...p, score: 0 })))
    setPhase('board')
  }

  const ranked = [...players].sort((a, b) => b.score - a.score)
  const winner = ranked[0]
  const hasTie = ranked.length > 1 && ranked[1].score === winner?.score

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="logo">🎲</span>
          <h1>DormiQuest</h1>
        </div>
        <nav className="toolbar">
          <button className="ghost" onClick={onBack}>
            ← Menú
          </button>
          {phase === 'board' && (
            <>
              <button onClick={() => setPhase('setup')}>👥 Jugadores</button>
              <button className="ghost" onClick={newGame}>
                ↺ Nueva partida
              </button>
            </>
          )}
        </nav>
      </header>

      {phase === 'setup' && <Setup players={players} setPlayers={setPlayers} onStart={newGame} />}

      {phase === 'board' && (
        <>
          <Scoreboard players={players} currentPlayerIndex={currentPlayerIndex} />

          {boardFinished && winner && (
            <div className="winner-banner">
              {hasTie ? (
                <div className="big">¡Empate en cabeza con {winner.score} pts! 🤝</div>
              ) : (
                <div className="big">
                  🏆 Gana {winner.name} con {winner.score} pts
                </div>
              )}
              <button className="primary" onClick={newGame} style={{ marginTop: 10 }}>
                Jugar otra vez
              </button>
            </div>
          )}

          <Board
            categories={categories}
            questions={questions}
            answered={answered}
            onPick={setOpenQuestion}
          />

          {!boardFinished && (
            <p className="footer-note">
              Turno de <strong>{players[currentPlayerIndex]?.name}</strong> — elige una categoría y
              una dificultad.
            </p>
          )}
        </>
      )}

      {openQuestion && (
        <QuestionModal
          question={openQuestion}
          category={categories.find((c) => c.id === openQuestion.categoryId)}
          players={players}
          onScore={handleScore}
          onClose={closeQuestion}
        />
      )}
    </div>
  )
}
