import { NavLink } from 'react-router-dom'
import { site } from '../siteContent'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  return (
    <header className="site-nav-outer">
      <div className="site-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            'site-nav__brand' + (isActive ? ' site-nav__brand--active' : '')
          }
        >
          <img
            src="/images/favicon.png"
            alt="Rifi logo"
            className="site-nav__logo"
          />
          {site.nav.brand}
        </NavLink>
        <div className="site-nav__row">
          <nav className="site-nav__links" aria-label="Primary">
            <ul>
              {site.nav.links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      'site-nav__link' + (isActive ? ' site-nav__link--active' : '')
                    }
                    end={l.to === '/'}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}