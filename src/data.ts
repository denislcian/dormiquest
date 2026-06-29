import type { Category, Question } from './types'

/** Niveles de dificultad (puntos) en orden ascendente. */
export const LEVELS = [100, 250, 500, 750, 1000]

/** Colores asignados a los jugadores por orden. */
export const PLAYER_COLORS = [
  '#f5c542', // oro
  '#4ea1ff', // azul
  '#ff6b6b', // rojo
  '#51cf66', // verde
  '#cc5de8', // morado
  '#ff922b', // naranja
  '#22d3ee', // cian
  '#f783ac', // rosa
]

// Banderas: imágenes vía flagcdn.com (código ISO en minúsculas)
const flag = (code: string) => `https://flagcdn.com/w640/${code}.png`
// Siluetas de países: imágenes en negro vía mapsicon (código ISO en minúsculas)
const shape = (code: string) =>
  `https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${code}/1024.png`

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'banderas', name: 'Banderas', icon: '🚩' },
  { id: 'formas', name: 'Formas de países', icon: '🗺️' },
  { id: 'historia', name: 'Historia', icon: '📜' },
  { id: 'mates', name: 'Matemáticas', icon: '🔢' },
  { id: 'lol', name: 'League of Legends', icon: '⚔️' },
  { id: 'cultura', name: 'Cultura general', icon: '🧠' },
]

export const DEFAULT_QUESTIONS: Question[] = [
  // ---------- BANDERAS ----------
  { id: 'ban-1', categoryId: 'banderas', points: 100, prompt: '¿De qué país es esta bandera?', answer: 'Japón', image: flag('jp') },
  { id: 'ban-2', categoryId: 'banderas', points: 250, prompt: '¿De qué país es esta bandera?', answer: 'Brasil', image: flag('br') },
  { id: 'ban-3', categoryId: 'banderas', points: 500, prompt: '¿De qué país es esta bandera?', answer: 'Suecia', image: flag('se') },
  { id: 'ban-4', categoryId: 'banderas', points: 750, prompt: '¿De qué país es esta bandera?', answer: 'Sudáfrica', image: flag('za') },
  { id: 'ban-5', categoryId: 'banderas', points: 1000, prompt: '¿De qué país es esta bandera?', answer: 'Bután', image: flag('bt') },

  // ---------- FORMAS DE PAÍSES ----------
  { id: 'for-1', categoryId: 'formas', points: 100, prompt: '¿Qué país tiene esta forma?', answer: 'Italia', image: shape('it') },
  { id: 'for-2', categoryId: 'formas', points: 250, prompt: '¿Qué país tiene esta forma?', answer: 'Francia', image: shape('fr') },
  { id: 'for-3', categoryId: 'formas', points: 500, prompt: '¿Qué país tiene esta forma?', answer: 'Chile', image: shape('cl') },
  { id: 'for-4', categoryId: 'formas', points: 750, prompt: '¿Qué país tiene esta forma?', answer: 'India', image: shape('in') },
  { id: 'for-5', categoryId: 'formas', points: 1000, prompt: '¿Qué país tiene esta forma?', answer: 'Croacia', image: shape('hr') },

  // ---------- HISTORIA ----------
  { id: 'his-1', categoryId: 'historia', points: 100, prompt: '¿En qué año llegó Cristóbal Colón a América?', answer: '1492' },
  { id: 'his-2', categoryId: 'historia', points: 250, prompt: '¿Qué civilización construyó Machu Picchu?', answer: 'Los incas (el Imperio inca)' },
  { id: 'his-3', categoryId: 'historia', points: 500, prompt: '¿En qué año cayó el Muro de Berlín?', answer: '1989' },
  { id: 'his-4', categoryId: 'historia', points: 750, prompt: '¿Quién fue el primer emperador del Imperio romano?', answer: 'Augusto (Octavio)' },
  { id: 'his-5', categoryId: 'historia', points: 1000, prompt: '¿Qué tratado puso fin oficialmente a la Primera Guerra Mundial en 1919?', answer: 'El Tratado de Versalles' },

  // ---------- MATEMÁTICAS ----------
  { id: 'mat-1', categoryId: 'mates', points: 100, prompt: '¿Cuánto es 7 × 8?', answer: '56' },
  { id: 'mat-2', categoryId: 'mates', points: 250, prompt: '¿Cuántos grados suman los ángulos interiores de un triángulo?', answer: '180 grados' },
  { id: 'mat-3', categoryId: 'mates', points: 500, prompt: '¿Cuál es el número primo inmediatamente posterior al 13?', answer: '17' },
  { id: 'mat-4', categoryId: 'mates', points: 750, prompt: '¿Cuánto es el 15 % de 200?', answer: '30' },
  { id: 'mat-5', categoryId: 'mates', points: 1000, prompt: '¿Cuánto es 2 elevado a 10 (2¹⁰)?', answer: '1024' },

  // ---------- LEAGUE OF LEGENDS ----------
  { id: 'lol-1', categoryId: 'lol', points: 100, prompt: '¿Cuál es el objetivo final que hay que destruir para ganar la partida?', answer: 'El Nexo (Nexus)' },
  { id: 'lol-2', categoryId: 'lol', points: 250, prompt: '¿Cuántos jugadores hay por equipo en una partida clásica (Grieta del Invocador)?', answer: '5' },
  { id: 'lol-3', categoryId: 'lol', points: 500, prompt: '¿Cómo se llama el monstruo del río cuyo "buff" potencia el empuje de minions y a todo el equipo?', answer: 'Barón Nashor' },
  { id: 'lol-4', categoryId: 'lol', points: 750, prompt: '¿En qué año se lanzó oficialmente League of Legends?', answer: '2009' },
  { id: 'lol-5', categoryId: 'lol', points: 1000, prompt: 'Piltover y su ciudad subterránea son la región natal de Jinx, Vi y Caitlyn. ¿Cómo se llama esa ciudad subterránea?', answer: 'Zaun' },

  // ---------- CULTURA GENERAL ----------
  { id: 'cul-1', categoryId: 'cultura', points: 100, prompt: '¿Cuál es el planeta más grande del sistema solar?', answer: 'Júpiter' },
  { id: 'cul-2', categoryId: 'cultura', points: 250, prompt: '¿Cuántos huesos tiene aproximadamente el cuerpo humano adulto?', answer: '206' },
  { id: 'cul-3', categoryId: 'cultura', points: 500, prompt: '¿Quién pintó la Mona Lisa (La Gioconda)?', answer: 'Leonardo da Vinci' },
  { id: 'cul-4', categoryId: 'cultura', points: 750, prompt: 'En química, ¿qué elemento tiene el símbolo "Au"?', answer: 'El oro' },
  { id: 'cul-5', categoryId: 'cultura', points: 1000, prompt: '¿Cuántos corazones tiene un pulpo?', answer: 'Tres (3)' },

  // ===================================================================
  //  SET 2 — preguntas de reserva (una por casilla; salen al azar)
  // ===================================================================

  // ---------- BANDERAS ----------
  { id: 'ban-6', categoryId: 'banderas', points: 100, prompt: '¿De qué país es esta bandera?', answer: 'Italia', image: flag('it') },
  { id: 'ban-7', categoryId: 'banderas', points: 250, prompt: '¿De qué país es esta bandera?', answer: 'Argentina', image: flag('ar') },
  { id: 'ban-8', categoryId: 'banderas', points: 500, prompt: '¿De qué país es esta bandera?', answer: 'Grecia', image: flag('gr') },
  { id: 'ban-9', categoryId: 'banderas', points: 750, prompt: '¿De qué país es esta bandera?', answer: 'Corea del Sur', image: flag('kr') },
  { id: 'ban-10', categoryId: 'banderas', points: 1000, prompt: '¿De qué país es esta bandera?', answer: 'Nepal', image: flag('np') },

  // ---------- FORMAS DE PAÍSES ----------
  { id: 'for-6', categoryId: 'formas', points: 100, prompt: '¿Qué país tiene esta forma?', answer: 'España', image: shape('es') },
  { id: 'for-7', categoryId: 'formas', points: 250, prompt: '¿Qué país tiene esta forma?', answer: 'Portugal', image: shape('pt') },
  { id: 'for-8', categoryId: 'formas', points: 500, prompt: '¿Qué país tiene esta forma?', answer: 'Japón', image: shape('jp') },
  { id: 'for-9', categoryId: 'formas', points: 750, prompt: '¿Qué país tiene esta forma?', answer: 'Noruega', image: shape('no') },
  { id: 'for-10', categoryId: 'formas', points: 1000, prompt: '¿Qué país tiene esta forma?', answer: 'Vietnam', image: shape('vn') },

  // ---------- HISTORIA ----------
  { id: 'his-6', categoryId: 'historia', points: 100, prompt: '¿Qué civilización antigua construyó las pirámides de Guiza?', answer: 'Los antiguos egipcios' },
  { id: 'his-7', categoryId: 'historia', points: 250, prompt: '¿Quién lideró la Alemania nazi durante la Segunda Guerra Mundial?', answer: 'Adolf Hitler' },
  { id: 'his-8', categoryId: 'historia', points: 500, prompt: '¿En qué año empezó la Segunda Guerra Mundial?', answer: '1939' },
  { id: 'his-9', categoryId: 'historia', points: 750, prompt: '¿Qué reina de Egipto se relacionó con Julio César y Marco Antonio?', answer: 'Cleopatra' },
  { id: 'his-10', categoryId: 'historia', points: 1000, prompt: '¿En qué siglo comenzó la Revolución Industrial en Inglaterra?', answer: 'El siglo XVIII' },

  // ---------- MATEMÁTICAS ----------
  { id: 'mat-6', categoryId: 'mates', points: 100, prompt: '¿Cuánto es 9 × 9?', answer: '81' },
  { id: 'mat-7', categoryId: 'mates', points: 250, prompt: '¿Cuántos lados tiene un hexágono?', answer: '6' },
  { id: 'mat-8', categoryId: 'mates', points: 500, prompt: '¿Cuánto es la mitad de 250?', answer: '125' },
  { id: 'mat-9', categoryId: 'mates', points: 750, prompt: '¿Cuánto es 12 al cuadrado (12²)?', answer: '144' },
  { id: 'mat-10', categoryId: 'mates', points: 1000, prompt: 'Un producto cuesta 80 € y tiene un 25 % de descuento. ¿Cuánto pagas?', answer: '60 €' },

  // ---------- LEAGUE OF LEGENDS ----------
  { id: 'lol-6', categoryId: 'lol', points: 100, prompt: '¿Cómo se llaman las criaturas que avanzan en oleadas por las calles atacando al rival?', answer: 'Los súbditos (minions)' },
  { id: 'lol-7', categoryId: 'lol', points: 250, prompt: '¿Cómo se llama la empresa que desarrolla League of Legends?', answer: 'Riot Games' },
  { id: 'lol-8', categoryId: 'lol', points: 500, prompt: '¿Cómo se llama la exitosa serie de animación de Netflix basada en League of Legends?', answer: 'Arcane' },
  { id: 'lol-9', categoryId: 'lol', points: 750, prompt: '¿Cuántas calles (líneas) principales tiene la Grieta del Invocador?', answer: '3 (superior, central e inferior)' },
  { id: 'lol-10', categoryId: 'lol', points: 1000, prompt: '¿Cómo se llama el dragón que aparece en la fase tardía y otorga un "buff" muy potente al equipo que lo derrota?', answer: 'El Dragón Anciano (Elder Dragon)' },

  // ---------- CULTURA GENERAL ----------
  { id: 'cul-6', categoryId: 'cultura', points: 100, prompt: '¿Qué color se obtiene al mezclar azul y amarillo?', answer: 'Verde' },
  { id: 'cul-7', categoryId: 'cultura', points: 250, prompt: '¿Cuál es el océano más grande del mundo?', answer: 'El océano Pacífico' },
  { id: 'cul-8', categoryId: 'cultura', points: 500, prompt: '¿En qué ciudad (y país) se encuentra la Torre Eiffel?', answer: 'París (Francia)' },
  { id: 'cul-9', categoryId: 'cultura', points: 750, prompt: '¿Cuál es el animal terrestre más rápido del mundo?', answer: 'El guepardo' },
  { id: 'cul-10', categoryId: 'cultura', points: 1000, prompt: '¿Cuál es el único metal que es líquido a temperatura ambiente?', answer: 'El mercurio' },
]
