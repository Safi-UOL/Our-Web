import { useEffect, useMemo, useState } from 'react'
import { site } from '../siteContent'
import { getElapsedCalendar } from '../utils/elapsedSince'

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

export function TimeTogetherPage() {
  const start = useMemo(() => new Date(site.meet.startUtcIso), [])
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const p = site.timeTogetherPage
  const e = getElapsedCalendar(start, now)

  return (
    <main className="page-main">
      <header className="page-hero">
        <h1 className="page-hero__title">{p.title}</h1>
        <p className="page-hero__lead">{p.lead}</p>
      </header>

      <div className="clock-since">
        <div className="clock-since__grid">
          <div className="clock-unit">
            <span className="clock-unit__value">{e.years}</span>
            <span className="clock-unit__label">{p.labels.years}</span>
          </div>

          <div className="clock-unit">
            <span className="clock-unit__value">{e.months}</span>
            <span className="clock-unit__label">{p.labels.months}</span>
          </div>

          <div className="clock-unit">
            <span className="clock-unit__value">{e.days}</span>
            <span className="clock-unit__label">{p.labels.days}</span>
          </div>

          <div className="clock-unit">
            <span className="clock-unit__value">{pad2(e.hours)}</span>
            <span className="clock-unit__label">{p.labels.hours}</span>
          </div>

          <div className="clock-unit">
            <span className="clock-unit__value">{pad2(e.minutes)}</span>
            <span className="clock-unit__label">{p.labels.minutes}</span>
          </div>

          <div className="clock-unit clock-unit--pulse">
            <span className="clock-unit__value">{pad2(e.seconds)}</span>
            <span className="clock-unit__label">{p.labels.seconds}</span>
          </div>
        </div>

        <p className="clock-since__anchor">
          Together since {site.meet.labelDisplay}
        </p>

        <div className="clock-since__notes">
          {p.noteLines.map((line) => (
            <p key={line} className="clock-since__note">
              {line}
            </p>
          ))}
        </div>

        <div className="time-video-wrap">
          <video
            className="time-video"
            controls
            preload="metadata"
          >
            <source src="/images/time-together.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </main>
  )
}