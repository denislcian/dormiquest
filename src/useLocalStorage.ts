import { useEffect, useState } from 'react'

/** useState que se persiste en localStorage bajo `key`. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // almacenamiento lleno o no disponible: ignorar
    }
  }, [key, value])

  return [value, setValue] as const
}
