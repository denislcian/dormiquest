import { useState } from 'react'
import type { Question } from './types'
import { DEFAULT_CATEGORIES, DEFAULT_QUESTIONS } from './data'
import { useLocalStorage } from './useLocalStorage'
import { Menu } from './components/Menu'
import { LocalGame } from './components/LocalGame'
import { HostGame } from './components/HostGame'
import { PlayerGame } from './components/PlayerGame'
import { Editor } from './components/Editor'

type Screen = 'menu' | 'local' | 'host' | 'player' | 'editor'

export default function App() {
  const [screen, setScreen] = useState<Screen>('menu')
  // Banco de preguntas compartido (local, anfitrión y editor). v4 = pool de 20 categorías.
  const [questions, setQuestions] = useLocalStorage<Question[]>(
    'dormiquest.questions.v4',
    DEFAULT_QUESTIONS,
  )

  const back = () => setScreen('menu')

  if (screen === 'menu') return <Menu onChoose={setScreen} />
  if (screen === 'local') return <LocalGame questions={questions} onBack={back} />
  if (screen === 'host') return <HostGame questions={questions} onBack={back} />
  if (screen === 'player') return <PlayerGame onBack={back} />

  // editor
  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="logo">✏️</span>
          <h1>DormiQuest · Editor</h1>
        </div>
        <nav className="toolbar">
          <button className="ghost" onClick={back}>
            ← Menú
          </button>
        </nav>
      </header>
      <Editor
        categories={DEFAULT_CATEGORIES}
        questions={questions}
        setQuestions={setQuestions}
        onResetDefaults={() => setQuestions(DEFAULT_QUESTIONS)}
      />
    </div>
  )
}
