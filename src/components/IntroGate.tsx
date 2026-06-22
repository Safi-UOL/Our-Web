import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { site } from '../siteContent'
import { ThemeToggle } from './ThemeToggle'

type Pos = { leftPct: number; topPct: number }

function randomViewportPosition(): Pos {
  return {
    leftPct: 6 + Math.random() * 88,
    topPct: 28 + Math.random() * 66,
  }
}

function centerOfElement(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return {
    x: (rect.left + rect.width / 2) / window.innerWidth,
    y: (rect.top + rect.height / 2) / window.innerHeight,
  }
}

function runLongFireworks(origin: { x: number; y: number }, onDone: () => void) {
  const durationMs = 900
  const endAt = Date.now() + durationMs
  const launchBurst = () => {
    confetti({ origin, particleCount: 70, spread: 80, startVelocity: 38, gravity: 0.95, scalar: 1, colors: ['#ff8fab', '#ffd166', '#7bdff2', '#cdb4db'] })
    confetti({ origin: { x: 0.02, y: 0.72 }, angle: 60, particleCount: 45, spread: 70, startVelocity: 48, gravity: 1.05, drift: 0.35, scalar: 0.9, colors: ['#ff6b6b', '#feca57', '#48dbfb'] })
    confetti({ origin: { x: 0.98, y: 0.72 }, angle: 120, particleCount: 45, spread: 70, startVelocity: 48, gravity: 1.05, drift: -0.35, scalar: 0.9, colors: ['#74c69d', '#ffafcc', '#a0c4ff'] })
    confetti({ origin: { x: 0.5, y: 0.2 + Math.random() * 0.18 }, particleCount: 30, spread: 150, startVelocity: 30, gravity: 0.85, scalar: 1.15, colors: ['#ffffff', '#ffd6a5', '#bdb2ff'] })
  }
  launchBurst()
  const interval = window.setInterval(() => {
    launchBurst()
    if (Date.now() >= endAt) {
      window.clearInterval(interval)
      onDone()
    }
  }, 160)
}

type Petal = {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  sway: number
  opacity: number
}

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 8,
    size: 8 + Math.random() * 14,
    sway: 30 + Math.random() * 60,
    opacity: 0.25 + Math.random() * 0.45,
  }))
}

const PETALS = generatePetals(22)

type Props = { onComplete: () => void }

export function IntroGate({ onComplete }: Props) {
  const leadUp = site.intro.leadUpButtonLabels
  const promiseStepIndex = leadUp.length
  const openStepIndex = leadUp.length + 1

  const [step, setStep] = useState(0)
  const [pos, setPos] = useState<Pos>(() => randomViewportPosition())
  const [entranceDone, setEntranceDone] = useState(false)
  const busyRef = useRef(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const reduceMotion = useRef(false)

  const label = useMemo(() => {
    if (step < leadUp.length) return leadUp[step]!
    if (step === promiseStepIndex) return site.intro.finalButtonLabel
    return site.intro.openButtonLabel
  }, [leadUp, promiseStepIndex, step])

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const handleActivate = useCallback(() => {
    if (reduceMotion.current) {
      if (!busyRef.current) {
        busyRef.current = true
        setEntranceDone(true)
        onComplete()
      }
      return
    }
    if (busyRef.current) return
    if (step < openStepIndex) {
      setPos(randomViewportPosition())
      setStep((s) => s + 1)
      return
    }
    busyRef.current = true
    setEntranceDone(true)
    const origin = buttonRef.current ? centerOfElement(buttonRef.current) : { x: 0.5, y: 0.45 }
    runLongFireworks(origin, onComplete)
  }, [onComplete, openStepIndex, step])

  return (
    <div className="intro-gate" role="dialog" aria-modal="true" aria-labelledby="intro-headline">
      <div className="intro-gate__petals" aria-hidden="true">
        {PETALS.map((p) => (
          <span
            key={p.id}
            className="intro-gate__petal"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s, ${p.duration * 0.5}s`,
              animationDelay: `-${p.delay}s, -${p.delay * 0.5}s`,
              '--sway': `${p.sway}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="intro-gate__theme-toggle">
        <ThemeToggle />
      </div>

      <div className="intro-gate__panel">
        <p className="intro-gate__eyebrow">Welcome</p>
        <h1 id="intro-headline" className="intro-gate__title">
          {site.intro.headline}
        </h1>
        <p className="intro-gate__sub">{site.intro.subline}</p>
      </div>

      {!entranceDone && (
        <button
          ref={buttonRef}
          type="button"
          className="intro-gate__btn intro-gate__btn--viewport"
          style={{ left: `${pos.leftPct}%`, top: `${pos.topPct}%` }}
          onClick={handleActivate}
        >
          {label}
        </button>
      )}
    </div>
  )
}