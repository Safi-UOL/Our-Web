export type LyricCue = {
  text: string
  at: number
}

export function buildLyricCues(lines: readonly string[], duration: number): LyricCue[] {
  if (!duration || !lines.length) return []

  const start = 17
  const end = duration - 6
  const span = end - start

  const weights = lines.map(line => {
    const words = line.split(' ').length
    return Math.max(1, words / 3)
  })

  const totalWeight = weights.reduce((a, b) => a + b, 0)

  let current = start

  return lines.map((text, i) => {
    const cue = {
      text,
      at: current,
    }

    current += (weights[i] / totalWeight) * span
    return cue
  })
}

export function getActiveCueIndex(cues: LyricCue[], time: number) {
  if (!cues.length || time < cues[0].at) return -1

  let idx = 0
  for (let i = 0; i < cues.length; i++) {
    if (time >= cues[i].at) idx = i
    else break
  }
  return idx
}