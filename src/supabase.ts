import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

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
