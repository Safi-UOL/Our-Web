import { useCallback, useRef, useState } from 'react'

type Props = {
  progress: number
  disabled?: boolean
  onSeek: (percent: number) => void
  className?: string
}

export function AudioSeekBar({ progress, disabled, onSeek, className }: Props) {
  const barRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)

  const seekFromClientX = useCallback(
    (clientX: number) => {
      const bar = barRef.current
      if (!bar || disabled) return
      const rect = bar.getBoundingClientRect()
      if (rect.width <= 0) return
      const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
      onSeek(pct)
    },
    [disabled, onSeek],
  )

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled) return
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    seekFromClientX(e.clientX)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging || disabled) return
    seekFromClientX(e.clientX)
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return
    setDragging(false)
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (disabled) return
    const step = e.key === 'ArrowLeft' ? -0.02 : e.key === 'ArrowRight' ? 0.02 : 0
    if (!step) return
    e.preventDefault()
    onSeek(Math.min(1, Math.max(0, progress / 100 + step)))
  }

  const pct = Math.min(100, Math.max(0, progress))

  return (
    <div
      ref={barRef}
      className={`audio-seek${className ? ` ${className}` : ''}${dragging ? ' audio-seek--dragging' : ''}${disabled ? ' audio-seek--disabled' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label="Seek"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-disabled={disabled || undefined}
    >
      <div className="audio-seek__track">
        <div
          className="audio-seek__fill"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div
        className="audio-seek__thumb"
        style={{ left: `${pct}%` }}
        aria-hidden
      />
    </div>
  )
}
