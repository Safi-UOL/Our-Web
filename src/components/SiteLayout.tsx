import { Outlet } from 'react-router-dom'
import { GlobalAudioProvider } from '../audio/GlobalAudioProvider'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { NowPlayingBar } from './NowPlayingBar'

export function SiteLayout() {
  return (
    <GlobalAudioProvider>
      <div className="site-shell">
        <Navbar />
        <div className="landing">
          <Outlet />
        </div>
        <div className="landing">
          <Footer />
        </div>
      </div>
      <NowPlayingBar />
    </GlobalAudioProvider>
  )
}
