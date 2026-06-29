import { useState } from 'react'
import type { Category, Question } from '../types'
import { LEVELS } from '../data'

type Props = {
  categories: Category[]
  questions: Question[]
  setQuestions: (q: Question[]) => void
  onResetDefaults: () => void
}

const newId = () => 'q-' + Math.random().toString(36).slice(2, 9)

export function Editor({ categories, questions, setQuestions, onResetDefaults }: Props) {
  const [activeCat, setActiveCat] = useState(categories[0]?.id ?? '')

  const catQuestions = questions
    .filter((q) => q.categoryId === activeCat)
    .sort((a, b) => a.points - b.points)

  const update = (id: string, patch: Partial<Question>) =>
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...patch } : q)))

  const remove = (id: string) => setQuestions(questions.filter((q) => q.id !== id))

  const add = () => {
    const used = new Set(catQuestions.map((q) => q.points))
    const freeLevel = LEVELS.find((l) => !used.has(l)) ?? LEVELS[LEVELS.length - 1]
    setQuestions([
      ...questions,
      {
        id: newId(),
        categoryId: activeCat,
        points: freeLevel,
        prompt: '',
        answer: '',
      },
    ])
  }

  return (
    <div className="panel">
      <h2>Editor de preguntas</h2>
      <p className="hint">
        Edita, añade o borra preguntas. Si pones <strong>varias preguntas en el mismo nivel</strong>
        (100–1000), forman un grupo y el tablero elegirá una al azar cada partida (más rejugabilidad).
        Pega una URL de imagen para banderas o siluetas. Todo se guarda solo en este navegador.
      </p>

      <div className="tabs">
        {categories.map((c) => (
          <button
            key={c.id}
            className={c.id === activeCat ? 'active' : ''}
            onClick={() => setActiveCat(c.id)}
          >
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      <div className="editor-grid">
        {catQuestions.length === 0 && <div className="empty">No hay preguntas en esta categoría.</div>}

        {catQuestions.map((q) => (
          <div key={q.id} className="q-edit-card">
            <div className="q-edit-head">
              <div className="row-2">
                <label className="l" style={{ marginBottom: 0 }}>
                  Puntos
                </label>
                <select
                  value={q.points}
                  onChange={(e) => update(q.id, { points: Number(e.target.value) })}
                  style={{ width: 'auto' }}
                >
                  {LEVELS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <button className="danger" onClick={() => remove(q.id)}>
                Borrar
              </button>
            </div>

            <div className="q-edit-grid">
              <label className="field">
                <span className="l">Pregunta</span>
                <textarea
                  value={q.prompt}
                  onChange={(e) => update(q.id, { prompt: e.target.value })}
                  placeholder="Escribe la pregunta…"
                />
              </label>
              <label className="field">
                <span className="l">Respuesta</span>
                <textarea
                  value={q.answer}
                  onChange={(e) => update(q.id, { answer: e.target.value })}
                  placeholder="Respuesta correcta…"
                />
              </label>
            </div>

            <label className="field" style={{ marginBottom: 0 }}>
              <span className="l">URL de imagen (opcional)</span>
              <input
                type="text"
                value={q.image ?? ''}
                onChange={(e) => update(q.id, { image: e.target.value || undefined })}
                placeholder="https://… (bandera, silueta de país, foto…)"
              />
            </label>
          </div>
        ))}
      </div>

      <div className="modal-actions">
        <button className="danger" onClick={onResetDefaults}>
          ↺ Restaurar preguntas de ejemplo
        </button>
        <button className="primary" onClick={add}>
          + Añadir pregunta a {categories.find((c) => c.id === activeCat)?.name}
        </button>
      </div>
    </div>
  )
}
