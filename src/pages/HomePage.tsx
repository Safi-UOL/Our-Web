import { Link } from 'react-router-dom'
import { AboutSection } from '../components/AboutSection'
import { ContactSection } from '../components/ContactSection'
import { Hero } from '../components/Hero'
import { HomeGallery } from '../components/HomeGallery'
import { HomeStorySection } from '../components/HomeStorySection'
import { site } from '../siteContent'

export function HomePage() {
  const t = site.homeMemoriesTeaser

  return (
    <main>
      <Hero />
      <HomeStorySection />
      <HomeGallery />

      <section className="section home-teaser" aria-labelledby="mem-teaser-title">
        <h2 id="mem-teaser-title" className="section__title">
          {t.title}
        </h2>

        <p className="section__lead home-teaser__lead">
          {t.lead}
        </p>

        <Link className="btn btn--primary" to={t.cta.to}>
          {t.cta.label}
        </Link>
      </section>

      <AboutSection />
      <ContactSection />
    </main>
  )
}