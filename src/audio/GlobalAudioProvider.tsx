import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  GlobalAudioContext,
  type GlobalAudioContextValue,
} from './GlobalAudioContext'
import type { PlaybackTrack } from './types'

export function GlobalAudioProvider({
  children,
}: {
  children: ReactNode
}) {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [track, setTrack] = useState<PlaybackTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Lyrics disabled globally for all normal songs
  const [displayLyrics] = useState<readonly string[]>([])
  const [lyricsLoading] = useState(false)
  const [lyricsAuto] = useState(false)

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  const syncFromAudio = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    setCurrentTime(audio.currentTime)
    setDuration(audio.duration || 0)
    setIsPlaying(!audio.paused && !audio.ended)
  }, [])

  const play = useCallback(
    (next: PlaybackTrack) => {
      const audio = audioRef.current
      if (!audio) return

      if (track?.id === next.id) {
        void audio.play()
        return
      }

      setTrack(next)
      audio.src = next.src
      audio.load()
      void audio.play()
    },
    [track?.id],
  )

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.pause()
    audio.currentTime = 0
    setTrack(null)
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }, [])

  const toggle = useCallback(
    (next: PlaybackTrack) => {
      const audio = audioRef.current
      if (!audio) return

      if (track?.id === next.id) {
        if (!audio.paused) {
          audio.pause()
        } else {
          void audio.play()
        }
        return
      }

      play(next)
    },
    [play, track?.id],
  )

  const seek = useCallback((percent: number) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return

    const t = Math.min(1, Math.max(0, percent)) * audio.duration
    audio.currentTime = t
    setCurrentTime(t)
  }, [])

  const isTrackActive = useCallback(
    (id: string) => track?.id === id,
    [track?.id],
  )

  const isTrackPlaying = useCallback(
    (id: string) => track?.id === id && isPlaying,
    [track?.id, isPlaying],
  )

  useEffect(() => {
    document.body.classList.toggle(
      'has-now-playing',
      Boolean(track && isPlaying),
    )

    return () =>
      document.body.classList.remove('has-now-playing')
  }, [track, isPlaying])

  const value = useMemo<GlobalAudioContextValue>(
    () => ({
      track,
      isPlaying,
      currentTime,
      duration,
      progress,
      displayLyrics,
      lyricsLoading,
      lyricsAuto,
      play,
      toggle,
      pause,
      stop,
      seek,
      isTrackActive,
      isTrackPlaying,
    }),
    [
      track,
      isPlaying,
      currentTime,
      duration,
      progress,
      displayLyrics,
      lyricsLoading,
      lyricsAuto,
      play,
      toggle,
      pause,
      stop,
      seek,
      isTrackActive,
      isTrackPlaying,
    ],
  )

  return (
    <GlobalAudioContext.Provider value={value}>
      {children}

      <audio
        ref={audioRef}
        className="global-audio-engine"
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false)
          setCurrentTime(0)
        }}
        onTimeUpdate={syncFromAudio}
        onLoadedMetadata={syncFromAudio}
      />
    </GlobalAudioContext.Provider>
  )
}