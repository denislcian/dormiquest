export type Category = {
  id: string
  name: string
  icon: string
}

export type Question = {
  id: string
  categoryId: string
  points: number
  prompt: string
  answer: string
  /** URL de imagen opcional (banderas, siluetas de países, etc.) */
  image?: string
}

export type Player = {
  id: string
  name: string
  score: number
  color: string
}

export type Phase = 'setup' | 'board' | 'editor'

export type GameState = {
  players: Player[]
  currentPlayerIndex: number
  /** IDs de preguntas ya respondidas (celdas gastadas) */
  answered: string[]
}
