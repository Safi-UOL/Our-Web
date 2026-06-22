import { site } from '../siteContent'

export function HomeStorySection() {
  const s = site.homeStory
  return (
    <section className="section home-story" id={s.id} aria-labelledby="home-story-title">
      <div className="section__head section__head--wide">
        <h2 id="home-story-title" className="section__title">
          {s.title}
        </h2>
      </div>
      <div className="home-story__body">
        {s.paragraphs.map((p, i) => (
          <p key={i} className="home-story__p">
            {p}
          </p>
        ))}
      </div>
    </section>
  )
}
