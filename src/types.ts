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

// ===================================================================
//  Modo online (pulsadores en tiempo real con Supabase)
// ===================================================================

export type Role = 'host' | 'player'

/** Identidad de un participante en una sala online. */
export type Self = { id: string; name: string }

/** Pregunta tal y como se envía a los concursantes (sin la respuesta). */
export type PublicQuestion = {
  categoryId: string
  categoryName: string
  categoryIcon: string
  points: number
  prompt: string
  image?: string
}

/** Estado público de la sala que el anfitrión difunde a los concursantes. */
export type PublicState = {
  step: 'lobby' | 'playing'
  /** Las categorías que entran en esta partida. */
  categories: Category[]
  /** Claves de casilla ya jugadas (`categoria:puntos`). */
  answered: string[]
  /** Puntuación por id de jugador. */
  scores: Record<string, number>
  /** Concursantes conectados. */
  players: Self[]
  current: PublicQuestion | null
  buzzOpen: boolean
  buzzWinner: Self | null
  /** Ids de jugadores que ya han fallado la pregunta actual. */
  missed: string[]
  revealed: boolean
  /** Solo presente cuando `revealed` es true. */
  answer?: string
  /** Segundos restantes para responder (cuenta atrás), o null si no hay. */
  secondsLeft: number | null
  /** El tablero se ha completado (mostrar podio). */
  finished: boolean
}
