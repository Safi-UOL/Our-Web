import { site } from '../siteContent'

export function AboutSection() {
  const s = site.about
  return (
    <section className="section" id={s.id} aria-labelledby="about-title">
      <div className="section__head">
        <h2 id="about-title" className="section__title">
          {s.title}
        </h2>
        <p className="section__lead">{s.lead}</p>
      </div>
      <ul className="card-grid">
        {s.points.map((p) => (
          <li key={p.title} className="card">
            <h3 className="card__title">{p.title}</h3>
            <p className="card__body">{p.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
