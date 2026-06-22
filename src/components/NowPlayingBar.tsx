import { Link } from 'react-router-dom'
import { useGlobalAudio } from '../audio/useGlobalAudio'
import { AudioSeekBar } from './AudioSeekBar'

function formatTime(s: number) {
  if (!s || Number.isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function NowPlayingBar() {
  const {
    track,
    isPlaying,
    progress,
    currentTime,
    duration,
    pause,
    seek,
    toggle,
    stop,
  } = useGlobalAudio()

  if (!track) return null
  const playbackTrack = track

  return (
    <aside className="now-playing">
      <div className="now-playing__inner">
        {track.cover || track.imageSrc ? (
          <img
            src={track.cover ?? track.imageSrc}
            alt=""
            className="now-playing__thumb"
          />
        ) : (
          <div className="music-disc" />
        )}

        <div className="now-playing__meta">
          <p className="now-playing__title">{track.title}</p>

          <AudioSeekBar
            progress={progress}
            disabled={duration <= 0}
            onSeek={seek}
          />

          <div className="now-playing__times">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <p className="now-playing__hint">
            Still playing while you wander — <Link to="/gallery">Gallery</Link>
          </p>
        </div>

        <div className="player-controls">
          <button
            className="player-btn"
            onClick={() => (isPlaying ? pause() : toggle(playbackTrack))}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>

          <button className="player-btn close-btn" onClick={stop}>
            ✕
          </button>
        </div>
      </div>
    </aside>
  )
}