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
  { id: 'cine', name: 'Cine y series', icon: '🎬' },
  { id: 'musica', name: 'Música', icon: '🎵' },
  { id: 'deportes', name: 'Deportes', icon: '⚽' },
  { id: 'videojuegos', name: 'Videojuegos', icon: '🎮' },
  { id: 'geografia', name: 'Geografía', icon: '🌍' },
  { id: 'ciencia', name: 'Ciencia', icon: '🔬' },
  { id: 'animales', name: 'Animales', icon: '🐾' },
  { id: 'comida', name: 'Comida y bebida', icon: '🍔' },
  { id: 'mitologia', name: 'Mitología', icon: '🏛️' },
  { id: 'anime', name: 'Anime y manga', icon: '🍥' },
  { id: 'internet', name: 'Internet y memes', icon: '📱' },
  { id: 'espacio', name: 'Espacio', icon: '🚀' },
  { id: 'arte', name: 'Arte', icon: '🎨' },
  { id: 'refranes', name: 'Refranes y lengua', icon: '📖' },
]

/** Número de categorías que entran en el tablero de cada partida. */
export const CATEGORIES_PER_GAME = 5

/** Elige `n` categorías al azar del pool (sin repetir). */
export function pickRandomCategories(pool: Category[], n = CATEGORIES_PER_GAME): Category[] {
  const copy = [...pool]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, Math.min(n, copy.length))
}

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

  // ===================================================================
  //  CATEGORÍAS NUEVAS — cine, música, deportes y videojuegos
  // ===================================================================

  // ---------- CINE Y SERIES ----------
  { id: 'cin-1', categoryId: 'cine', points: 100, prompt: '¿Qué vaquero de juguete es el protagonista de la saga "Toy Story"?', answer: 'Woody' },
  { id: 'cin-2', categoryId: 'cine', points: 250, prompt: 'En esta saga, Jedi y Sith luchan con sables de luz. ¿Cómo se llama?', answer: 'Star Wars (La guerra de las galaxias)' },
  { id: 'cin-3', categoryId: 'cine', points: 500, prompt: '¿Quién dirigió la película "Titanic" (1997)?', answer: 'James Cameron' },
  { id: 'cin-4', categoryId: 'cine', points: 750, prompt: 'En "Juego de Tronos", ¿cuál es el apellido de Jon, Arya y Sansa?', answer: 'Stark' },
  { id: 'cin-5', categoryId: 'cine', points: 1000, prompt: '¿Qué película surcoreana ganó el Óscar a Mejor Película en 2020?', answer: 'Parásitos (Parasite)' },
  { id: 'cin-6', categoryId: 'cine', points: 100, prompt: '¿Cómo se llama el mago con una cicatriz en la frente de la saga de J.K. Rowling?', answer: 'Harry Potter' },
  { id: 'cin-7', categoryId: 'cine', points: 250, prompt: '¿Qué película de Disney tiene a una reina del hielo llamada Elsa?', answer: 'Frozen' },
  { id: 'cin-8', categoryId: 'cine', points: 500, prompt: '¿Qué actor interpreta a Iron Man (Tony Stark) en el universo Marvel?', answer: 'Robert Downey Jr.' },
  { id: 'cin-9', categoryId: 'cine', points: 750, prompt: '¿En qué serie española "El Profesor" planea un atraco a la Fábrica de Moneda y Timbre?', answer: 'La casa de papel' },
  { id: 'cin-10', categoryId: 'cine', points: 1000, prompt: '¿Quién dirigió "Pulp Fiction" (1994)?', answer: 'Quentin Tarantino' },

  // ---------- MÚSICA ----------
  { id: 'mus-1', categoryId: 'musica', points: 100, prompt: '¿Qué cantante es conocida como la "Reina del Pop"?', answer: 'Madonna' },
  { id: 'mus-2', categoryId: 'musica', points: 250, prompt: '¿De qué país (y ciudad) es la banda The Beatles?', answer: 'Reino Unido (Liverpool, Inglaterra)' },
  { id: 'mus-3', categoryId: 'musica', points: 500, prompt: '¿Qué artista británico canta "Shape of You"?', answer: 'Ed Sheeran' },
  { id: 'mus-4', categoryId: 'musica', points: 750, prompt: '¿Cómo se llama el cantante de Queen, fallecido en 1991?', answer: 'Freddie Mercury' },
  { id: 'mus-5', categoryId: 'musica', points: 1000, prompt: '¿Qué grupo sueco es famoso por "Dancing Queen" y "Mamma Mia"?', answer: 'ABBA' },
  { id: 'mus-6', categoryId: 'musica', points: 100, prompt: '¿Qué instrumento de 6 cuerdas es básico en el rock y el flamenco?', answer: 'La guitarra' },
  { id: 'mus-7', categoryId: 'musica', points: 250, prompt: '¿Qué artista colombiana es famosa por "Hips Don\'t Lie" y "Waka Waka"?', answer: 'Shakira' },
  { id: 'mus-8', categoryId: 'musica', points: 500, prompt: '¿Qué banda canta "Bohemian Rhapsody"?', answer: 'Queen' },
  { id: 'mus-9', categoryId: 'musica', points: 750, prompt: '¿Cuántas cuerdas tiene un bajo eléctrico estándar?', answer: '4' },
  { id: 'mus-10', categoryId: 'musica', points: 1000, prompt: '¿Qué artista grabó "Thriller", el álbum más vendido de la historia?', answer: 'Michael Jackson' },

  // ---------- DEPORTES ----------
  { id: 'dep-1', categoryId: 'deportes', points: 100, prompt: '¿Cuántos jugadores tiene un equipo de fútbol en el campo, incluido el portero?', answer: '11' },
  { id: 'dep-2', categoryId: 'deportes', points: 250, prompt: '¿En qué deporte destaca Rafael Nadal?', answer: 'Tenis' },
  { id: 'dep-3', categoryId: 'deportes', points: 500, prompt: '¿Cada cuántos años se celebran los Juegos Olímpicos de verano?', answer: 'Cada 4 años' },
  { id: 'dep-4', categoryId: 'deportes', points: 750, prompt: '¿Qué país ganó el Mundial de fútbol de 2010, celebrado en Sudáfrica?', answer: 'España' },
  { id: 'dep-5', categoryId: 'deportes', points: 1000, prompt: 'En ciclismo, ¿en qué gran vuelta se lleva la "maglia rosa" el líder?', answer: 'El Giro de Italia' },
  { id: 'dep-6', categoryId: 'deportes', points: 100, prompt: '¿En qué deporte se anota un "triple" o un "mate"?', answer: 'Baloncesto' },
  { id: 'dep-7', categoryId: 'deportes', points: 250, prompt: '¿Cuántos anillos tiene el símbolo olímpico?', answer: '5' },
  { id: 'dep-8', categoryId: 'deportes', points: 500, prompt: '¿Qué jugador argentino levantó el Mundial de fútbol de 2022?', answer: 'Lionel Messi' },
  { id: 'dep-9', categoryId: 'deportes', points: 750, prompt: '¿En qué país se inventó el judo?', answer: 'Japón' },
  { id: 'dep-10', categoryId: 'deportes', points: 1000, prompt: '¿Cuántos puntos vale un ensayo ("try") en el rugby?', answer: '5 puntos' },

  // ---------- VIDEOJUEGOS ----------
  { id: 'vid-1', categoryId: 'videojuegos', points: 100, prompt: '¿Cómo se llama el fontanero bigotudo mascota de Nintendo?', answer: 'Mario' },
  { id: 'vid-2', categoryId: 'videojuegos', points: 250, prompt: '¿En qué juego construyes y exploras un mundo hecho de bloques?', answer: 'Minecraft' },
  { id: 'vid-3', categoryId: 'videojuegos', points: 500, prompt: '¿Qué empresa fabrica la consola PlayStation?', answer: 'Sony' },
  { id: 'vid-4', categoryId: 'videojuegos', points: 750, prompt: '¿Cómo se llama el erizo azul mascota de SEGA?', answer: 'Sonic' },
  { id: 'vid-5', categoryId: 'videojuegos', points: 1000, prompt: '¿En qué año salió la primera PlayStation en Japón?', answer: '1994' },
  { id: 'vid-6', categoryId: 'videojuegos', points: 100, prompt: '¿De qué color es Pikachu, de Pokémon?', answer: 'Amarillo' },
  { id: 'vid-7', categoryId: 'videojuegos', points: 250, prompt: '¿Cómo se llama el "battle royale" de Epic Games con bailes y construcción?', answer: 'Fortnite' },
  { id: 'vid-8', categoryId: 'videojuegos', points: 500, prompt: '¿A qué princesa rescata habitualmente Link en la saga "The Legend of Zelda"?', answer: 'La princesa Zelda' },
  { id: 'vid-9', categoryId: 'videojuegos', points: 750, prompt: '¿Qué estudio creó la saga "Grand Theft Auto" (GTA)?', answer: 'Rockstar Games' },
  { id: 'vid-10', categoryId: 'videojuegos', points: 1000, prompt: '¿Cómo se llama la protagonista arqueóloga de la saga "Tomb Raider"?', answer: 'Lara Croft' },

  // ---------- GEOGRAFÍA ----------
  { id: 'geo-1', categoryId: 'geografia', points: 100, prompt: '¿Cuál es la capital de Francia?', answer: 'París' },
  { id: 'geo-2', categoryId: 'geografia', points: 250, prompt: '¿Cuál es el río más largo de la península ibérica?', answer: 'El Tajo' },
  { id: 'geo-3', categoryId: 'geografia', points: 500, prompt: '¿Cuál es el desierto cálido más grande del mundo?', answer: 'El Sahara' },
  { id: 'geo-4', categoryId: 'geografia', points: 750, prompt: '¿Cuál es el país más poblado del mundo (2024)?', answer: 'India' },
  { id: 'geo-5', categoryId: 'geografia', points: 1000, prompt: '¿Cuál es la capital de Australia?', answer: 'Canberra' },

  // ---------- CIENCIA ----------
  { id: 'cie-1', categoryId: 'ciencia', points: 100, prompt: '¿Qué gas absorben las plantas para hacer la fotosíntesis?', answer: 'El dióxido de carbono (CO₂)' },
  { id: 'cie-2', categoryId: 'ciencia', points: 250, prompt: '¿Cuál es la fórmula química del agua?', answer: 'H₂O' },
  { id: 'cie-3', categoryId: 'ciencia', points: 500, prompt: '¿Qué científico propuso la teoría de la relatividad?', answer: 'Albert Einstein' },
  { id: 'cie-4', categoryId: 'ciencia', points: 750, prompt: '¿Cuál es el hueso más largo del cuerpo humano?', answer: 'El fémur' },
  { id: 'cie-5', categoryId: 'ciencia', points: 1000, prompt: '¿A qué velocidad aproximada viaja la luz en el vacío?', answer: 'Unos 300.000 km/s' },

  // ---------- ANIMALES ----------
  { id: 'ani-1', categoryId: 'animales', points: 100, prompt: '¿Cuál es el animal más grande del mundo?', answer: 'La ballena azul' },
  { id: 'ani-2', categoryId: 'animales', points: 250, prompt: '¿Cuántas patas tiene una araña?', answer: '8' },
  { id: 'ani-3', categoryId: 'animales', points: 500, prompt: '¿Qué felino es conocido como el "rey de la selva"?', answer: 'El león' },
  { id: 'ani-4', categoryId: 'animales', points: 750, prompt: '¿Cuál es el único mamífero capaz de volar?', answer: 'El murciélago' },
  { id: 'ani-5', categoryId: 'animales', points: 1000, prompt: '¿Cuál es el animal más rápido del mundo (en picado)?', answer: 'El halcón peregrino' },

  // ---------- COMIDA Y BEBIDA ----------
  { id: 'com-1', categoryId: 'comida', points: 100, prompt: '¿De qué país es originaria la pizza?', answer: 'Italia' },
  { id: 'com-2', categoryId: 'comida', points: 250, prompt: '¿Cuál es el ingrediente principal del guacamole?', answer: 'El aguacate' },
  { id: 'com-3', categoryId: 'comida', points: 500, prompt: '¿De qué semilla se obtiene el chocolate?', answer: 'Del cacao' },
  { id: 'com-4', categoryId: 'comida', points: 750, prompt: '¿Qué bebida alcohólica se obtiene fermentando uvas?', answer: 'El vino' },
  { id: 'com-5', categoryId: 'comida', points: 1000, prompt: '¿Cómo se llama el plato japonés de arroz avinagrado con pescado crudo?', answer: 'El sushi' },

  // ---------- MITOLOGÍA ----------
  { id: 'mit-1', categoryId: 'mitologia', points: 100, prompt: '¿Quién es el dios griego del rayo y rey de los dioses?', answer: 'Zeus' },
  { id: 'mit-2', categoryId: 'mitologia', points: 250, prompt: '¿Cómo se llama el caballo alado de la mitología griega?', answer: 'Pegaso' },
  { id: 'mit-3', categoryId: 'mitologia', points: 500, prompt: '¿Cuál es el dios romano de la guerra?', answer: 'Marte' },
  { id: 'mit-4', categoryId: 'mitologia', points: 750, prompt: '¿Qué héroe griego tenía su único punto débil en el talón?', answer: 'Aquiles' },
  { id: 'mit-5', categoryId: 'mitologia', points: 1000, prompt: 'En la mitología nórdica, ¿cómo se llama el martillo de Thor?', answer: 'Mjölnir' },

  // ---------- ANIME Y MANGA ----------
  { id: 'anm-1', categoryId: 'anime', points: 100, prompt: '¿Cómo se llama el ninja rubio que sueña con ser Hokage?', answer: 'Naruto' },
  { id: 'anm-2', categoryId: 'anime', points: 250, prompt: '¿Qué pirata de goma busca el tesoro "One Piece"?', answer: 'Monkey D. Luffy' },
  { id: 'anm-3', categoryId: 'anime', points: 500, prompt: 'En "Dragon Ball", ¿de qué raza guerrera es Goku?', answer: 'Saiyan (saiyajin)' },
  { id: 'anm-4', categoryId: 'anime', points: 750, prompt: 'En "Death Note", ¿qué pasa si escribes el nombre de alguien en el cuaderno?', answer: 'Que esa persona muere' },
  { id: 'anm-5', categoryId: 'anime', points: 1000, prompt: '¿Qué estudio hizo "El viaje de Chihiro" y "Mi vecino Totoro"?', answer: 'Studio Ghibli' },

  // ---------- INTERNET Y MEMES ----------
  { id: 'int-1', categoryId: 'internet', points: 100, prompt: '¿En qué app se suben vídeos cortos verticales con bailes y retos?', answer: 'TikTok' },
  { id: 'int-2', categoryId: 'internet', points: 250, prompt: '¿Qué plataforma de vídeos es propiedad de Google?', answer: 'YouTube' },
  { id: 'int-3', categoryId: 'internet', points: 500, prompt: '¿Cómo se llama a quienes retransmiten partidas y directos en Twitch?', answer: 'Streamers' },
  { id: 'int-4', categoryId: 'internet', points: 750, prompt: '¿Qué red social cambió su nombre de "Twitter" a "X" en 2023?', answer: 'Twitter (ahora X)' },
  { id: 'int-5', categoryId: 'internet', points: 1000, prompt: '¿Qué empresa es dueña de Instagram y WhatsApp?', answer: 'Meta (antes Facebook)' },

  // ---------- ESPACIO ----------
  { id: 'esp-1', categoryId: 'espacio', points: 100, prompt: '¿Cuál es la estrella más cercana a la Tierra?', answer: 'El Sol' },
  { id: 'esp-2', categoryId: 'espacio', points: 250, prompt: '¿Qué planeta es conocido como el "planeta rojo"?', answer: 'Marte' },
  { id: 'esp-3', categoryId: 'espacio', points: 500, prompt: '¿Cómo se llama nuestra galaxia?', answer: 'La Vía Láctea' },
  { id: 'esp-4', categoryId: 'espacio', points: 750, prompt: '¿Quién fue el primer ser humano en pisar la Luna?', answer: 'Neil Armstrong' },
  { id: 'esp-5', categoryId: 'espacio', points: 1000, prompt: '¿Cuál es el planeta más cercano al Sol?', answer: 'Mercurio' },

  // ---------- ARTE ----------
  { id: 'art-1', categoryId: 'arte', points: 100, prompt: '¿Quién pintó "La noche estrellada" y se cortó una oreja?', answer: 'Vincent van Gogh' },
  { id: 'art-2', categoryId: 'arte', points: 250, prompt: '¿Qué pintor malagueño es famoso por el cubismo y el "Guernica"?', answer: 'Pablo Picasso' },
  { id: 'art-3', categoryId: 'arte', points: 500, prompt: '¿En qué museo de Madrid está "Las meninas" de Velázquez?', answer: 'El Museo del Prado' },
  { id: 'art-4', categoryId: 'arte', points: 750, prompt: '¿Qué artista pintó el techo de la Capilla Sixtina?', answer: 'Miguel Ángel' },
  { id: 'art-5', categoryId: 'arte', points: 1000, prompt: '¿A qué movimiento artístico pertenecen los relojes derretidos de Dalí?', answer: 'El surrealismo' },

  // ---------- REFRANES Y LENGUA ----------
  { id: 'ref-1', categoryId: 'refranes', points: 100, prompt: 'Completa el refrán: "A caballo regalado…"', answer: '"…no le mires el diente."' },
  { id: 'ref-2', categoryId: 'refranes', points: 250, prompt: '¿Cuántas letras tiene el abecedario español (incluida la Ñ)?', answer: '27' },
  { id: 'ref-3', categoryId: 'refranes', points: 500, prompt: 'Completa el refrán: "Más vale pájaro en mano…"', answer: '"…que ciento volando."' },
  { id: 'ref-4', categoryId: 'refranes', points: 750, prompt: '¿Qué figura literaria compara dos cosas usando "como" (p. ej. "dientes como perlas")?', answer: 'El símil (la comparación)' },
  { id: 'ref-5', categoryId: 'refranes', points: 1000, prompt: '¿Quién escribió "Don Quijote de la Mancha"?', answer: 'Miguel de Cervantes' },
]
