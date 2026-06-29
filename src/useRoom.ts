import { useCallback, useEffect, useRef, useState } from 'react'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { getSupabase } from './supabase'
import type { PublicState, Role, Self } from './types'

export type RoomStatus = 'idle' | 'connecting' | 'connected' | 'error'

type Options = {
  code: string | null
  role: Role
  self: Self
  /** (concursante) Llega un estado nuevo del anfitrión. */
  onSync?: (state: PublicState) => void
  /** (anfitrión) Un concursante acaba de entrar y pide el estado. */
  onHello?: (from: Self) => void
  /** (anfitrión) Un concursante ha pulsado el botón. */
  onBuzz?: (from: Self) => void
  /** (anfitrión) Cambió la lista de concursantes conectados. */
  onPlayersChange?: (players: Self[]) => void
}

/**
 * Conecta a una sala (canal de Supabase Realtime) usando broadcast + presencia.
 * El anfitrión es la fuente de la verdad: difunde `sync`; los concursantes
 * envían `hello` (al entrar) y `buzz` (al pulsar).
 */
export function useRoom(opts: Options) {
  const [status, setStatus] = useState<RoomStatus>('idle')
  const channelRef = useRef<RealtimeChannel | null>(null)
  // Mantener los callbacks actuales sin re-suscribir el canal.
  const cb = useRef(opts)
  cb.current = opts

  useEffect(() => {
    if (!opts.code) return
    const supabase = getSupabase()
    if (!supabase) {
      setStatus('error')
      return
    }
    setStatus('connecting')

    const channel = supabase.channel(`dormiquest:${opts.code}`, {
      config: { presence: { key: opts.self.id }, broadcast: { self: false } },
    })
    channelRef.current = channel

    channel.on('broadcast', { event: 'sync' }, ({ payload }) =>
      cb.current.onSync?.(payload as PublicState),
    )
    channel.on('broadcast', { event: 'hello' }, ({ payload }) =>
      cb.current.onHello?.(payload as Self),
    )
    channel.on('broadcast', { event: 'buzz' }, ({ payload }) =>
      cb.current.onBuzz?.(payload as Self),
    )
    channel.on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState() as Record<string, Array<Record<string, unknown>>>
      const players: Self[] = []
      for (const key of Object.keys(state)) {
        const meta = state[key][0]
        if (meta?.role === 'player') players.push({ id: String(meta.id), name: String(meta.name) })
      }
      cb.current.onPlayersChange?.(players)
    })

    channel.subscribe(async (st) => {
      if (st === 'SUBSCRIBED') {
        setStatus('connected')
        await channel.track({ id: opts.self.id, name: opts.self.name, role: opts.role })
        if (opts.role === 'player') {
          channel.send({ type: 'broadcast', event: 'hello', payload: opts.self })
        }
      } else if (st === 'CHANNEL_ERROR' || st === 'TIMED_OUT') {
        setStatus('error')
      }
    })

    return () => {
      supabase.removeChannel(channel)
      channelRef.current = null
      setStatus('idle')
    }
    // Re-suscribir solo si cambia la sala, el rol o el id propio.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.code, opts.role, opts.self.id])

  /** (anfitrión) Difunde el estado público a los concursantes. */
  const sync = useCallback((state: PublicState) => {
    channelRef.current?.send({ type: 'broadcast', event: 'sync', payload: state })
  }, [])

  /** (concursante) Pulsa el botón. */
  const buzz = useCallback(() => {
    channelRef.current?.send({ type: 'broadcast', event: 'buzz', payload: cb.current.self })
  }, [])

  return { status, sync, buzz }
}
