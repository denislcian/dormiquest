import { useMemo, useState } from 'react'
import type { Phase, Player, Question } from './types'
import { DEFAULT_CATEGORIES, DEFAULT_QUESTIONS } from './data'
import { useLocalStorage } from './useLocalStorage'
import { Scoreboard } from './components/Scoreboard'
import { Board, cellKey } from './components/Board'
import { QuestionModal } from './components/QuestionModal'
import { Setup } from './components/Setup'
import { Editor } from './components/Editor'

export default function App() {
  const [phase, setPhase] = useState<Phase>('setup')
  const [players, setPlayers] = useLocalStorage<Player[]>('dormiquest.players', [])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useLocalStorage<number>(
    'dormiquest.turn',
    0,
  )
  const [answered, setAnswered] = useLocalStorage<string[]>('dormiquest.answered', [])
  // La versión (v2) se sube cuando cambia el banco de preguntas por defecto,
  // para que se cargue el nuevo en navegadores que ya tenían el anterior guardado.
  const [questions, setQuestions] = useLocalStorage<Question[]>(
    'dormiquest.questions.v2',
    DEFAULT_QUESTIONS,
  )

  // Categorías son fijas (estructura); las preguntas sí se editan.
  const categories = DEFAULT_CATEGORIES

  const [openQuestion, setOpenQuestion] = useState<Question | null>(null)

  // Casillas con al menos una pregunta (categoría × nivel).
  const playableCells = useMemo(() => {
    const set = new Set<string>()
    for (const q of questions) set.add(cellKey(q.categoryId, q.points))
    return set.size
  }, [questions])
  const boardFinished = playableCells > 0 && answered.length >= playableCells
  const allDone = boardFinished

  const nextTurn = () => {
    if (players.length > 0) {
      setCurrentPlayerIndex((i) => (i + 1) % players.length)
    }
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
    setAnswered([])
    setCurrentPlayerIndex(0)
    setPlayers(players.map((p) => ({ ...p, score: 0 })))
    setPhase('board')
  }

  const backToSetup = () => {
    setOpenQuestion(null)
    setPhase('setup')
  }

  const resetDefaults = () => {
    setQuestions(DEFAULT_QUESTIONS)
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
          {phase !== 'board' && (
            <button onClick={() => setPhase('board')} disabled={players.length === 0}>
              🎯 Tablero
            </button>
          )}
          {phase !== 'setup' && <button onClick={backToSetup}>👥 Jugadores</button>}
          {phase !== 'editor' && <button onClick={() => setPhase('editor')}>✏️ Editor</button>}
          {phase === 'board' && (
            <button className="ghost" onClick={newGame}>
              ↺ Reiniciar tablero
            </button>
          )}
        </nav>
      </header>

      {phase === 'setup' && (
        <Setup players={players} setPlayers={setPlayers} onStart={newGame} />
      )}

      {phase === 'editor' && (
        <Editor
          categories={categories}
          questions={questions}
          setQuestions={setQuestions}
          onResetDefaults={resetDefaults}
        />
      )}

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

          {!allDone && (
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
