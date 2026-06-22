import { createContext } from 'react'
import type { PlaybackTrack } from './types'

export type GlobalAudioContextValue = {
  track: PlaybackTrack | null
  isPlaying: boolean
  currentTime: number
  duration: number
  progress: number

  /** Lyrics shown on the photo (manual in siteContent, or auto-fetched). */
  displayLyrics: readonly string[]
  lyricsLoading: boolean
  lyricsAuto: boolean

  play: (track: PlaybackTrack) => void
  toggle: (track: PlaybackTrack) => void
  pause: () => void
  stop: () => void
  seek: (percent: number) => void

  isTrackActive: (id: string) => boolean
  isTrackPlaying: (id: string) => boolean
}

export const GlobalAudioContext =
  createContext<GlobalAudioContextValue | null>(null)