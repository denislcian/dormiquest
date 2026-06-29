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

// Diagnóstico: en el navegador, escribe `__DQ_ONLINE` en la consola.
// true  = credenciales válidas en el build.  false = revisar las env vars.
if (typeof window !== 'undefined') {
  ;(window as unknown as { __DQ_ONLINE: boolean }).__DQ_ONLINE = isSupabaseConfigured()
}
