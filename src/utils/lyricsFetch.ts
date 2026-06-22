const CACHE = new Map<string, string[]>()

type LrclibHit = {
  trackName: string
  artistName: string
  plainLyrics: string | null
  syncedLyrics: string | null
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function scoreHit(hit: LrclibHit, title: string, artist: string) {
  const t = normalize(title)
  const a = artist.trim() ? normalize(artist) : ''
  const ht = normalize(hit.trackName)
  const ha = normalize(hit.artistName)

  let score = 0
  if (ht === t) score += 8
  else if (ht.includes(t) || t.includes(ht)) score += 5
  else {
    const tWords = t.split(' ').filter(Boolean)
    const matched = tWords.filter((w) => w.length > 2 && ht.includes(w)).length
    score += matched * 2
  }

  if (a) {
    if (ha === a) score += 4
    else if (ha.includes(a) || a.includes(ha)) score += 2
  }

  if (hit.plainLyrics?.trim()) score += 1
  return score
}

function pickBest(hits: LrclibHit[], title: string, artist: string) {
  return [...hits].sort((x, y) => scoreHit(y, title, artist) - scoreHit(x, title, artist))[0]
}

function parsePlainLyrics(text: string | null): string[] {
  if (!text?.trim()) return []
  return text
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !/^\[(verse|chorus|bridge|intro|outro|pre)/i.test(line))
}

function parseSyncedLyrics(text: string | null): string[] {
  if (!text?.trim()) return []
  const seen = new Set<string>()
  const lines: string[] = []
  for (const raw of text.split(/\n/)) {
    const line = raw.replace(/\[\d{1,2}:\d{2}(?:\.\d{2,3})?\]/g, '').trim()
    if (!line || seen.has(line)) continue
    seen.add(line)
    lines.push(line)
  }
  return lines
}

/** Group lines for on-photo display (2 short lines at a time feel natural). */
export function condenseLyricsForDisplay(lines: string[], maxSlides = 48): string[] {
  if (lines.length <= maxSlides) return lines

  const step = Math.ceil(lines.length / maxSlides)
  const condensed: string[] = []
  for (let i = 0; i < lines.length; i += step) {
    const chunk = lines.slice(i, i + step).join(' · ')
    if (chunk) condensed.push(chunk)
  }
  return condensed
}

/**
 * Fetches lyrics from LRCLIB (https://lrclib.net) using track title + optional artist.
 * Results are cached for the session. Not from your MP3 file — matched by name online.
 */
export async function fetchLyricsForTrack(
  title: string,
  artist = '',
): Promise<string[]> {
  const key = `${normalize(title)}|${normalize(artist)}`
  const cached = CACHE.get(key)
  if (cached) return cached

  const query = artist.trim() ? `${title} ${artist}`.trim() : title.trim()
  if (!query) return []

  try {
    const res = await fetch(
      `https://lrclib.net/api/search?q=${encodeURIComponent(query)}`,
      { headers: { Accept: 'application/json' } },
    )
    if (!res.ok) return []

    const hits = (await res.json()) as LrclibHit[]
    if (!Array.isArray(hits) || hits.length === 0) return []

    const best = pickBest(hits, title, artist)
    let lines = parsePlainLyrics(best.plainLyrics)
    if (!lines.length) lines = parseSyncedLyrics(best.syncedLyrics)
    lines = condenseLyricsForDisplay(lines)

    CACHE.set(key, lines)
    return lines
  } catch {
    return []
  }
}
