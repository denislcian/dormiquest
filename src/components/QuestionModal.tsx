import { useState } from 'react'
import type { Category, Player, Question } from '../types'

type Props = {
  question: Question
  category?: Category
  players: Player[]
  /** Suma (sign=+1) o resta (sign=-1) los puntos de la pregunta a un jugador. */
  onScore: (playerId: string, sign: 1 | -1) => void
  /** Cierra el modal y marca la pregunta como respondida. */
  onClose: () => void
}

export function QuestionModal({ question, category, players, onScore, onClose }: Props) {
  const [revealed, setRevealed] = useState(false)
  const isShape = category?.id === 'formas'

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="q-meta">
          <span>
            {category?.icon} {category?.name}
          </span>
          <span className="q-points">{question.points} pts</span>
        </div>

        <div className="q-prompt">{question.prompt}</div>

        {question.image && (
          <div className={'q-image' + (isShape ? ' shape' : '')}>
            <img src={question.image} alt="Pista de la pregunta" />
          </div>
        )}

        {revealed ? (
          <div className="answer">
            <div className="label">Respuesta correcta</div>
            <div className="value">{question.answer}</div>
          </div>
        ) : (
          <button className="primary" onClick={() => setRevealed(true)}>
            👁️ Mostrar respuesta
          </button>
        )}

        {revealed && (
          <>
            <h3 className="section">Adjudicar puntos — ¿quién ha respondido?</h3>
            <div className="adjudicate">
              {players.map((p) => (
                <div key={p.id} className="adj-row" style={{ ['--accent' as string]: p.color }}>
                  <span className="name">{p.name}</span>
                  <button className="good" onClick={() => onScore(p.id, 1)}>
                    + {question.points}
                  </button>
                  <button className="bad" onClick={() => onScore(p.id, -1)}>
                    − {question.points}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="modal-actions">
          <button className="ghost" onClick={onClose}>
            {revealed ? 'Cerrar y pasar turno' : 'Nadie acierta — pasar'}
          </button>
        </div>
      </div>
    </div>
  )
}
