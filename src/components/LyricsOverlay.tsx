import { useEffect, useState } from 'react'

type Props = {
  lyrics?: readonly string[]
  active: boolean
}

export function LyricsOverlay({ lyrics, active }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!active || !lyrics?.length) return

    setIndex(0)

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % lyrics.length)
    }, 4800)

    return () => window.clearInterval(id)
  }, [active, lyrics])

  if (!active) return null

  // NO lyrics? show disc instead
  if (!lyrics?.length) {
    return (
      <div className="music-disc-wrap">
        <div className="music-disc" />
      </div>
    )
  }

  return (
    <div className="lyrics-overlay" aria-live="polite">
      <p key={`${index}-${lyrics[index]}`} className="lyrics-overlay__line">
        {lyrics[index]}
      </p>
    </div>
  )
}