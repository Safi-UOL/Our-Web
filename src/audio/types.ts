/** Lyrics load automatically from title + artist; optional `lyrics: [...]` overrides. */
export type MusicTrack = {
  title: string
  artist: string
  src: string
  cover?: string
  lyrics?: readonly string[]
}

export type GalleryImage = {
  src: string
  alt: string
  /** Optional override, e.g. "16 / 9". Otherwise detected from the file. */
  aspectRatio?: string
}

export type PlaybackTrack = MusicTrack & {
  id: string
  imageSrc?: string
}

export function trackId(src: string) {
  return src
}
