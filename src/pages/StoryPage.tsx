import { site } from '../siteContent'

export function StoryPage() {
  const p = site.storyPage
  return (
    <main className="page-main page-main--article">
      <header className="page-hero">
        <h1 className="page-hero__title">{p.title}</h1>
        <p className="page-hero__lead">{p.lead}</p>
      </header>
      <article className="article-sections">
        {p.sections.map((sec) => (
          <section key={sec.title} className="article-block">
            <h2 className="article-block__title">{sec.title}</h2>
            {sec.paragraphs.map((para, i) => (
              <p key={i} className="article-block__p">
                {para}
              </p>
            ))}
          </section>
        ))}
      </article>
    </main>
  )
}
