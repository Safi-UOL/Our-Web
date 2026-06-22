import { ImageMusicPlayer } from '../components/ImageMusicPlayer'
import { site } from '../siteContent'

function MemoryPhoto({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  return (
    <div className="memory-card__photo-wrap">
      <img
        src={src}
        alt={alt}
        width={1200}
        height={700}
        loading="lazy"
        decoding="async"
        className="memory-card__img"
      />
    </div>
  )
}

export function MemoriesPage() {
  const p = site.memoriesPage

  return (
    <main className="page-main page-main--memories">
      <header className="page-hero page-hero--romantic">
        <h1 className="page-hero__title">{p.title}</h1>
        <p className="page-hero__lead">{p.lead}</p>
      </header>

      <ul className="memory-list">
        {p.items.map((item) => (
          <li key={`${item.title}-${item.date}`} className="memory-card">
            {'image' in item && item.image ? (
              <div className="memory-card__media">
                <MemoryPhoto
                  src={item.image.src}
                  alt={item.image.alt}
                />

                <ImageMusicPlayer
                  track={'track' in item ? item.track : undefined}
                  imageSrc={item.image.src}
                  className="memory-card__music"
                />
              </div>
            ) : null}

            <div className="memory-card__content">
              <p className="memory-card__date">{item.date}</p>
              <h2 className="memory-card__title">{item.title}</h2>
              <p className="memory-card__body">{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}