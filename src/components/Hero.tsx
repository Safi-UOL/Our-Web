import { Link } from 'react-router-dom'
import { site } from '../siteContent'
import { useState } from 'react'

export function Hero() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <>
      <section
        className="hero-block hero-block--cinematic"
        aria-labelledby="hero-title"
      >
        <div className="hero-bg" />

        <p className="hero-block__eyebrow">{site.hero.eyebrow}</p>

        <h1 id="hero-title" className="hero-block__title">
          {site.hero.headline}
        </h1>

        <p className="hero-block__lead">{site.hero.subline}</p>

        <button
          className="hero-music-btn"
          onClick={() => setShowVideo(true)}
          type="button"
        >
          Play the song to reveal my feelings
        </button>

        <div className="hero-block__actions">
          <Link className="btn btn--primary" to={site.hero.primaryCta.to}>
            {site.hero.primaryCta.label}
          </Link>

          <Link className="btn btn--ghost" to={site.hero.secondaryCta.to}>
            {site.hero.secondaryCta.label}
          </Link>
        </div>
      </section>

      {showVideo && (
        <div className="home-video-overlay">
          <div
            className="home-video-overlay__bg"
            onClick={() => setShowVideo(false)}
          />

          <button
            className="home-video-overlay__close"
            onClick={() => setShowVideo(false)}
          >
            ×
          </button>

          <video
            className="home-main-video"
            controls
            autoPlay
            playsInline
          >
            <source src="/audio/Home-main.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </>
  )
}