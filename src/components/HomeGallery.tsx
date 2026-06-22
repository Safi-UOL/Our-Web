import { site } from '../siteContent'
import { GalleryMusicCard } from './GalleryMusicCard'

export function HomeGallery() {
  const g = site.homeGallery
  return (
    <section className="section section--alt home-gallery" id={g.id} aria-labelledby="gallery-title">
      <div className="section__head section__head--wide">
        <h2 id="gallery-title" className="section__title">
          {g.title}
        </h2>
        <p className="section__lead">{g.lead}</p>
      </div>
      <ul className="gallery-music-grid gallery-music-grid--masonry">
        {g.images.map((img) => (
          <GalleryMusicCard key={img.src} image={img} track={img.track} />
        ))}
      </ul>
    </section>
  )
}
