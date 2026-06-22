import { site } from '../siteContent'
import { GalleryMusicCard } from '../components/GalleryMusicCard'

export function GalleryPage() {
  const p = site.galleryPage
  return (
    <main className="page-main">
      <header className="page-hero">
        <h1 className="page-hero__title">{p.title}</h1>
        <p className="page-hero__lead">{p.lead}</p>
      </header>
      <ul className="gallery-music-grid gallery-music-grid--masonry">
        {p.images.map((img, i) => {
          const track = p.tracks[i % p.tracks.length]!
          return <GalleryMusicCard key={img.src} image={img} track={track} />
        })}
      </ul>
      {p.closing && <p className="gallery-page__closing">{p.closing}</p>}
    </main>
  )
}
