import { trackId, type MusicTrack } from '../audio/types'
import { useGlobalAudio } from '../audio/useGlobalAudio'
import { AudioSeekBar } from './AudioSeekBar'

type Props = {
  track?: MusicTrack
  className?: string
  imageSrc?: string
}

function formatTime(s: number) {
  if (!s || Number.isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function ImageMusicPlayer({ track, className, imageSrc }: Props) {
  const audio = useGlobalAudio()

  if (!track) return null

  const id = trackId(track.src)
  const active = audio.isTrackActive(id)
  const playing = audio.isTrackPlaying(id)
  const showArtist = Boolean(track.artist?.trim())

  const playback = {
    id,
    src: track.src,
    title: track.title,
    artist: track.artist,
    lyrics: track.lyrics,
    imageSrc,
  }

  return (
    <div className={`image-music${className ? ` ${className}` : ''}`}>
      <div className="image-music__head">
        <p className="image-music__title">{track.title}</p>
        {showArtist ? <p className="image-music__artist">{track.artist}</p> : null}
      </div>
      <div className="image-music__controls">
        <button
          type="button"
          className={`image-music__play${playing ? ' image-music__play--on' : ''}`}
          onClick={() => audio.toggle(playback)}
          aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
        >
          {playing ? '❚❚' : '▶'}
        </button>
        <div className="image-music__seek-wrap">
          <AudioSeekBar
            className="image-music__seek"
            progress={active ? audio.progress : 0}
            disabled={!active || audio.duration <= 0}
            onSeek={audio.seek}
          />
          <div className="image-music__times">
            <span>{formatTime(active ? audio.currentTime : 0)}</span>
            <span>{formatTime(active ? audio.duration : 0)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
