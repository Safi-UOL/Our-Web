import { site } from '../siteContent'

export function Footer() {
  return (
    <footer className="site-footer">
      <p className="site-footer__line">
        <span className="site-footer__heart" aria-hidden>
          ♥
        </span>{' '}
        {site.footer.line}
        <span className="site-footer__heart" aria-hidden>
          ♥
        </span>
      </p>
      <p className="site-footer__fine">{site.footer.finePrint}</p>
    </footer>
  )
}
