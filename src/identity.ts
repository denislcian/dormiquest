/** Id estable del dispositivo/usuario, persistido en localStorage. */
export function getSelfId(): string {
  const key = 'dormiquest.selfId'
  let v = localStorage.getItem(key)
  if (!v) {
    v = 'u-' + Math.random().toString(36).slice(2, 10)
    localStorage.setItem(key, v)
  }
  return v
}

/** Genera un código de sala corto y legible (sin caracteres ambiguos). */
export function makeRoomCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 4; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)]
  return code
}
