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
// Logos de marca: iconos a color vía Simple Icons CDN (slug de la marca)
const brand = (slug: string) => `https://cdn.simpleicons.org/${slug}`

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
  { id: 'series', name: 'Series y streaming', icon: '📺' },
  { id: 'famosos', name: 'Famosos y redes', icon: '⭐' },
  { id: 'logos', name: 'Marcas y logos', icon: '™️' },
  { id: 'emoji', name: 'Adivina el emoji', icon: '😄' },
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

  // ---------- SERIES Y STREAMING ----------
  { id: 'ser-1', categoryId: 'series', points: 100, prompt: '¿En qué plataforma se estrenó "Stranger Things"?', answer: 'Netflix' },
  { id: 'ser-2', categoryId: 'series', points: 100, prompt: '¿Cómo se llama la serie surcoreana de Netflix con juegos infantiles mortales por dinero?', answer: 'El juego del calamar (Squid Game)' },
  { id: 'ser-3', categoryId: 'series', points: 250, prompt: 'En esta serie, el profesor Walter White cocina metanfetamina. ¿Cómo se titula?', answer: 'Breaking Bad' },
  { id: 'ser-4', categoryId: 'series', points: 250, prompt: '¿Qué serie española de Netflix sigue los crímenes en el instituto Las Encinas?', answer: 'Élite' },
  { id: 'ser-5', categoryId: 'series', points: 500, prompt: '¿Qué serie animada de Matt Groening lleva más de 30 temporadas en Springfield?', answer: 'Los Simpson' },
  { id: 'ser-6', categoryId: 'series', points: 500, prompt: '¿Qué serie de HBO sobre un brote de un hongo zombi está basada en un videojuego?', answer: 'The Last of Us' },
  { id: 'ser-7', categoryId: 'series', points: 750, prompt: 'En "The Mandalorian", ¿cómo se conoce popularmente a la criatura Grogu?', answer: 'Baby Yoda' },
  { id: 'ser-8', categoryId: 'series', points: 750, prompt: '¿Cómo se titula la precuela de "Juego de Tronos" centrada en la casa Targaryen?', answer: 'La Casa del Dragón' },
  { id: 'ser-9', categoryId: 'series', points: 1000, prompt: '¿Qué serie de Netflix narra el reinado de la reina Isabel II del Reino Unido?', answer: 'The Crown' },
  { id: 'ser-10', categoryId: 'series', points: 1000, prompt: '¿Cómo se llama la serie de Disney+ protagonizada por el dios del engaño de Marvel?', answer: 'Loki' },

  // ---------- FAMOSOS Y REDES ----------
  { id: 'fam-1', categoryId: 'famosos', points: 100, prompt: '¿Qué cantante canadiense saltó a la fama de adolescente con la canción "Baby" en YouTube?', answer: 'Justin Bieber' },
  { id: 'fam-2', categoryId: 'famosos', points: 100, prompt: '¿Qué streamer español, antes top de YouTube, es conocido como "el Rubius"?', answer: 'ElRubius (Rubén Doblas)' },
  { id: 'fam-3', categoryId: 'famosos', points: 250, prompt: '¿Qué streamer español organiza "La Velada del Año", su evento de boxeo entre creadores?', answer: 'Ibai Llanos' },
  { id: 'fam-4', categoryId: 'famosos', points: 250, prompt: '¿Qué empresario es dueño de Tesla y SpaceX y compró Twitter (ahora X)?', answer: 'Elon Musk' },
  { id: 'fam-5', categoryId: 'famosos', points: 500, prompt: '¿Qué youtuber estadounidense es famoso por sus retos millonarios y regalar dinero?', answer: 'MrBeast' },
  { id: 'fam-6', categoryId: 'famosos', points: 500, prompt: '¿Qué cantante hizo "The Eras Tour", la gira más taquillera de la historia?', answer: 'Taylor Swift' },
  { id: 'fam-7', categoryId: 'famosos', points: 750, prompt: '¿Qué futbolista portugués es de las personas con más seguidores en Instagram?', answer: 'Cristiano Ronaldo' },
  { id: 'fam-8', categoryId: 'famosos', points: 750, prompt: '¿Qué artista puertorriqueño fue varios años el más escuchado del mundo en Spotify?', answer: 'Bad Bunny' },
  { id: 'fam-9', categoryId: 'famosos', points: 1000, prompt: '¿Cuál es el apellido de la famosa familia del reality con Kim, Kylie y Kendall?', answer: 'Kardashian (Kardashian-Jenner)' },
  { id: 'fam-10', categoryId: 'famosos', points: 1000, prompt: '¿Qué creador español, de los pioneros del humor en internet, se llama Raúl Álvarez?', answer: 'AuronPlay' },

  // ---------- MARCAS Y LOGOS ----------
  { id: 'log-1', categoryId: 'logos', points: 100, prompt: '¿De qué marca es este logo?', answer: 'Nike', image: brand('nike') },
  { id: 'log-2', categoryId: 'logos', points: 100, prompt: '¿De qué marca es este logo?', answer: "McDonald's", image: brand('mcdonalds') },
  { id: 'log-3', categoryId: 'logos', points: 250, prompt: '¿De qué marca es este logo?', answer: 'Adidas', image: brand('adidas') },
  { id: 'log-4', categoryId: 'logos', points: 250, prompt: '¿De qué marca es este logo?', answer: 'Spotify', image: brand('spotify') },
  { id: 'log-5', categoryId: 'logos', points: 500, prompt: '¿De qué marca es este logo?', answer: 'Netflix', image: brand('netflix') },
  { id: 'log-6', categoryId: 'logos', points: 500, prompt: '¿De qué marca es este logo?', answer: 'Starbucks', image: brand('starbucks') },
  { id: 'log-7', categoryId: 'logos', points: 750, prompt: '¿De qué marca es este logo?', answer: 'PlayStation', image: brand('playstation') },
  { id: 'log-8', categoryId: 'logos', points: 750, prompt: '¿De qué marca es este logo?', answer: 'LEGO', image: brand('lego') },
  { id: 'log-9', categoryId: 'logos', points: 1000, prompt: '¿De qué marca es este logo?', answer: 'Ferrari', image: brand('ferrari') },
  { id: 'log-10', categoryId: 'logos', points: 1000, prompt: '¿De qué marca es este logo?', answer: 'Lacoste', image: brand('lacoste') },

  // ---------- ADIVINA EL EMOJI ----------
  { id: 'emo-1', categoryId: 'emoji', points: 100, prompt: '¿Qué película es? 🦁👑', answer: 'El Rey León' },
  { id: 'emo-2', categoryId: 'emoji', points: 100, prompt: '¿Qué superhéroe es? 🕷️🧑', answer: 'Spider-Man' },
  { id: 'emo-3', categoryId: 'emoji', points: 250, prompt: '¿Qué película de Disney es? ❄️👸⛄', answer: 'Frozen' },
  { id: 'emo-4', categoryId: 'emoji', points: 250, prompt: '¿Qué saga es? ⚡️🧙‍♂️🦉', answer: 'Harry Potter' },
  { id: 'emo-5', categoryId: 'emoji', points: 500, prompt: '¿Qué película es? 🐠🔍👨‍👧', answer: 'Buscando a Nemo' },
  { id: 'emo-6', categoryId: 'emoji', points: 500, prompt: '¿Qué película es? 🚢🧊💔', answer: 'Titanic' },
  { id: 'emo-7', categoryId: 'emoji', points: 750, prompt: '¿Qué película es? 🦖🏝️🧬', answer: 'Jurassic Park (Parque Jurásico)' },
  { id: 'emo-8', categoryId: 'emoji', points: 750, prompt: '¿Qué película es? 👽📞🏠🚲', answer: 'E.T., el extraterrestre' },
  { id: 'emo-9', categoryId: 'emoji', points: 1000, prompt: '¿Qué saga es? 💍🌋🧙‍♂️🧝', answer: 'El Señor de los Anillos' },
  { id: 'emo-10', categoryId: 'emoji', points: 1000, prompt: '¿Qué película de terror es? 🤡🎈🚸', answer: 'It (Eso)' },

  // ---------- ACTUALIDAD (preguntas recientes; conviene refrescarlas con el tiempo) ----------
  { id: 'cin-11', categoryId: 'cine', points: 250, prompt: '¿Qué película rosa de Greta Gerwig fue un fenómeno mundial en 2023?', answer: 'Barbie' },
  { id: 'cin-12', categoryId: 'cine', points: 750, prompt: '"Oppenheimer" ganó el Óscar a Mejor Película en 2024. ¿Quién la dirigió?', answer: 'Christopher Nolan' },
  { id: 'mus-11', categoryId: 'musica', points: 500, prompt: '¿Cómo se llama la gira récord de Taylor Swift de 2023-2024?', answer: 'The Eras Tour' },
  { id: 'dep-11', categoryId: 'deportes', points: 250, prompt: '¿Qué selección ganó la Eurocopa de fútbol de 2024?', answer: 'España' },
  { id: 'dep-12', categoryId: 'deportes', points: 750, prompt: '¿Qué centrocampista español del Manchester City ganó el Balón de Oro 2024?', answer: 'Rodri (Rodrigo Hernández)' },
]
