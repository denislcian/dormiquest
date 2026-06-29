import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

let client: SupabaseClient | null = null

/** ¿Hay credenciales de Supabase configuradas? (modo online disponible) */
export const isSupabaseConfigured = (): boolean => Boolean(url && anon)

/** Cliente Supabase (singleton). Devuelve null si no está configurado. */
export function getSupabase(): SupabaseClient | null {
  if (client) return client
  if (!url || !anon) return null
  client = createClient(url, anon, {
    realtime: { params: { eventsPerSecond: 20 } },
  })
  return client
}

// Diagnóstico: en el navegador, escribe `__DQ_ONLINE` en la consola.
// true  = las variables llegaron al build (modo online activo).
// false = el build NO tiene las variables (revisar env vars / redeploy).
if (typeof window !== 'undefined') {
  ;(window as unknown as { __DQ_ONLINE: boolean }).__DQ_ONLINE = isSupabaseConfigured()
}
