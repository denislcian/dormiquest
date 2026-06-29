import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

const looksLikeUrl = (v?: string) => Boolean(v) && /^https?:\/\//i.test(v as string)

let client: SupabaseClient | null = null
let initFailed = false

/** ¿Hay credenciales de Supabase válidas? (modo online disponible) */
export const isSupabaseConfigured = (): boolean =>
  looksLikeUrl(url) && Boolean(anon) && !initFailed

/** Cliente Supabase (singleton). Devuelve null si no está configurado o falla. */
export function getSupabase(): SupabaseClient | null {
  if (client) return client
  if (!looksLikeUrl(url) || !anon) return null
  try {
    client = createClient(url as string, anon, {
      realtime: { params: { eventsPerSecond: 20 } },
    })
    return client
  } catch (e) {
    // Una URL/clave mal puesta no debe romper toda la app.
    console.error('No se pudo inicializar Supabase. Revisa VITE_SUPABASE_URL / _ANON_KEY:', e)
    initFailed = true
    return null
  }
}

// Diagnóstico (consola del navegador):
//   __DQ_ONLINE → true si las credenciales son válidas en el build.
//   __DQ_URL    → la Project URL que usa el build (es pública, no secreta).
//   __DQ_HASKEY → true si la anon key llegó al build (no se muestra la clave).
if (typeof window !== 'undefined') {
  const w = window as unknown as Record<string, unknown>
  w.__DQ_ONLINE = isSupabaseConfigured()
  w.__DQ_URL = url ?? null
  w.__DQ_HASKEY = Boolean(anon)
}
