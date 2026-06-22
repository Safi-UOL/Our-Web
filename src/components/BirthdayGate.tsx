import { useEffect, useRef, useState } from 'react'
import { site } from '../siteContent'

type Props = { onOpenGift: () => void }

export function BirthdayGate({ onOpenGift }: Props) {
  const b = site.birthdayGate
  const track = b.image.track
  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const raf1 = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setVisible(true))
    })
    return () => window.cancelAnimationFrame(raf1)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const tryPlay = () => {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }

    const id = window.setTimeout(tryPlay, 600)
    return () => window.clearTimeout(id)
  }, [])

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
    }
  }

  function handleTimeUpdate() {
    const audio = audioRef.current
    if (!audio) return

    setCurrentTime(audio.currentTime)
    setDuration(audio.duration || 0)
    setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
  }

  function handleEnded() {
    setPlaying(false)
    setProgress(0)
    setCurrentTime(0)
  }

  function handleLoadedMetadata() {
    const audio = audioRef.current
    if (!audio) return
    setDuration(audio.duration)
  }

  function handlePause() {
    setPlaying(false)
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current
    if (!audio || !audio.duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    audio.currentTime = pct * audio.duration
  }

  function handleOpen() {
    const audio = audioRef.current
    if (audio) audio.pause()
    window.scrollTo({ top: 0, behavior: 'instant' })
    onOpenGift()
  }

  function formatTime(s: number) {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <main className="birthday-gate" aria-labelledby="birthday-title">
      <div
        className={`birthday-gate__card birthday-gate__card--animate${
          visible ? ' birthday-gate__card--visible' : ''
        }`}
      >
        <p className="birthday-gate__eyebrow">A Special Moment</p>

        <h1 id="birthday-title" className="birthday-gate__title">
          {b.title}
        </h1>

        <p className="birthday-gate__subtitle">{b.subtitle}</p>
        <p className="birthday-gate__message">{b.message}</p>

        <figure className="birthday-gate__media">
          <img
            src={b.image.src}
            alt={b.image.alt}
            loading="eager"
            decoding="async"
            className="birthday-gate__img"
          />
        </figure>

        <div className="bday-player">
          <div className="bday-player__info">
            <p className="bday-player__title">{track.title}</p>
            <p className="bday-player__artist">{track.artist}</p>

            <div
              className="bday-player__bar"
              onClick={handleSeek}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="bday-player__bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="bday-player__times">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <button
            type="button"
            className={`bday-player__play${playing ? ' bday-player__play--playing' : ''}`}
            onClick={togglePlay}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            )}
          </button>
        </div>

        <audio
          ref={audioRef}
          src={track.src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onLoadedMetadata={handleLoadedMetadata}
          onPause={handlePause}
          preload="auto"
        />

        <div className="birthday-gate__scroll-hint" aria-hidden="true">
          <span className="birthday-gate__scroll-hint__icon">
            <svg
              className="birthday-gate__scroll-hint__chev"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M12 16.5 5 9h14l-7 7.5z" />
            </svg>

            <svg
              className="birthday-gate__scroll-hint__chev birthday-gate__scroll-hint__chev--accent"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path d="M12 16.5 5 9h14l-7 7.5z" />
            </svg>
          </span>
        </div>

        <button
          type="button"
          className="btn btn--primary birthday-gate__button birthday-gate__button--glow"
          onClick={handleOpen}
        >
          {b.buttonLabel}
        </button>
      </div>
    </main>
  )
}