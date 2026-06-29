import type { Category, Question } from '../types'
import { LEVELS } from '../data'

type Props = {
  categories: Category[]
  questions: Question[]
  answered: string[]
  onPick: (q: Question) => void
}

/** Clave única de una casilla del tablero (categoría + nivel de puntos). */
export const cellKey = (categoryId: string, points: number) => `${categoryId}:${points}`

export function Board({ categories, questions, answered, onPick }: Props) {
  const cols = categories.length
  const done = new Set(answered)

  // Todas las preguntas de una casilla (puede haber varias = grupo de reserva).
  const poolFor = (catId: string, points: number) =>
    questions.filter((q) => q.categoryId === catId && q.points === points)

  // Elige una pregunta al azar del grupo de esa casilla.
  const pickRandom = (catId: string, points: number) => {
    const pool = poolFor(catId, points)
    return pool[Math.floor(Math.random() * pool.length)]
  }

  return (
    <div className="board" style={{ ['--cols' as string]: cols }}>
      {/* Cabeceras de categoría */}
      <div className="board-row" style={{ ['--cols' as string]: cols }}>
        {categories.map((c) => (
          <div key={c.id} className="cat-head">
            <span className="cat-icon">{c.icon}</span>
            <span>{c.name}</span>
          </div>
        ))}
      </div>

      {/* Filas por nivel de puntos */}
      {LEVELS.map((points) => (
        <div key={points} className="board-row" style={{ ['--cols' as string]: cols }}>
          {categories.map((c) => {
            const hasQuestions = poolFor(c.id, points).length > 0
            const isDone = done.has(cellKey(c.id, points))
            return (
              <button
                key={c.id + points}
                className={'cell' + (isDone ? ' done' : '')}
                disabled={isDone || !hasQuestions}
                onClick={() => {
                  const q = pickRandom(c.id, points)
                  if (q) onPick(q)
                }}
              >
                {hasQuestions ? points : '—'}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
