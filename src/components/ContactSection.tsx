import { Link } from 'react-router-dom'
import { site } from '../siteContent'

export function ContactSection() {
  const c = site.contact

  return (
    <section className="section contact-strip">
      <h2 className="section__title">{c.title}</h2>
      <p className="section__lead contact-strip__lead">{c.lead}</p>

      <Link className="btn btn--primary" to="/contact">
        Send a Message
      </Link>
    </section>
  )
}