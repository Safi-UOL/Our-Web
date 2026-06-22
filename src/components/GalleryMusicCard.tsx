import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { trackId, type GalleryImage, type MusicTrack } from '../audio/types'
import { useGlobalAudio } from '../audio/useGlobalAudio'
import { AudioSeekBar } from './AudioSeekBar'
import { LyricsOverlay } from './LyricsOverlay'

type Props = {
  image: GalleryImage
  track: MusicTrack
}

function formatTime(s: number) {
  if (!s || Number.isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function GalleryMusicCard({ image, track }: Props) {
  const audio = useGlobalAudio()
  const id = trackId(track.src)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [aspectRatio, setAspectRatio] = useState(image.aspectRatio ?? '4 / 3')

  const cover = track.cover ?? image.src
  const showArtist = Boolean(track.artist?.trim())
  const active = audio.isTrackActive(id)
  const playing = audio.isTrackPlaying(id)
  const canSeek = active && audio.duration > 0
  const overlayLyrics = active ? audio.displayLyrics : []
  const lyricsLoading = active && audio.lyricsLoading
  const showLyricsLayer = playing && (lyricsLoading || overlayLyrics.length > 0)

  const playback = {
    id,
    src: track.src,
    title: track.title,
    artist: track.artist,
    cover,
    lyrics: track.lyrics,
    imageSrc: image.src,
  }

  const applyAspectFromImage = useCallback(
    (img: HTMLImageElement) => {
      if (image.aspectRatio) return
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        setAspectRatio(`${img.naturalWidth} / ${img.naturalHeight}`)
      }
    },
    [image.aspectRatio],
  )

  function handlePhotoLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    applyAspectFromImage(e.currentTarget)
  }

  useEffect(() => {
    if (image.aspectRatio) setAspectRatio(image.aspectRatio)
  }, [image.aspectRatio, image.src])

  useEffect(() => {
    if (!lightboxOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightboxOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [lightboxOpen])

  const cardStyle = { ['--music-card-ratio' as string]: aspectRatio } as CSSProperties

  return (
    <li
      className={`music-card${playing ? ' music-card--playing' : ''}${active ? ' music-card--active' : ''}`}
      style={cardStyle}
    >
      <div className="music-card__frame">
        <div className={`music-card__bg${showLyricsLayer ? ' music-card__bg--lyrics' : ''}`}>
          <img
            src={image.src}
            alt=""
            aria-hidden
            className="music-card__bg-blur"
            onLoad={handlePhotoLoad}
          />
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="music-card__bg-img"
            onLoad={handlePhotoLoad}
          />
          <LyricsOverlay
  lyrics={overlayLyrics}
  active={playing}
/>
          <button
            type="button"
            className="music-card__view-photo"
            onClick={() => setLightboxOpen(true)}
            aria-label={`View full size: ${image.alt}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden>
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </button>
        </div>

        <div className="music-card__dock">
          <div className="music-card__player">
            <div className="music-card__cover-wrap">
              <img src={cover} alt="" className="music-card__cover" aria-hidden />
            </div>

            <div className="music-card__info">
              <p className="music-card__title">{track.title}</p>
              {showArtist ? <p className="music-card__artist">{track.artist}</p> : null}
              <AudioSeekBar
                className="music-card__seek"
                progress={active ? audio.progress : 0}
                disabled={!canSeek}
                onSeek={audio.seek}
              />
              <div className="music-card__times">
                <span>{formatTime(active ? audio.currentTime : 0)}</span>
                <span>{formatTime(active ? audio.duration : 0)}</span>
              </div>
            </div>

            <button
              type="button"
              className={`music-card__play${playing ? ' music-card__play--playing' : ''}`}
              onClick={() => audio.toggle(playback)}
              aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden>
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden>
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {lightboxOpen ? (
        <div
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="photo-lightbox__close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close photo"
          >
            ×
          </button>
          <img
            src={image.src}
            alt={image.alt}
            className="photo-lightbox__img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </li>
  )
}
