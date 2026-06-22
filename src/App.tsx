import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { BirthdayGate } from './components/BirthdayGate'
import { IntroGate } from './components/IntroGate'
import { SiteLayout } from './components/SiteLayout'
import { ContactPage } from './pages/ContactPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import { MemoriesPage } from './pages/MemoriesPage'
import { StoryPage } from './pages/StoryPage'
import { TimeTogetherPage } from './pages/TimeTogetherPage'
import { MeetupPage } from './pages/MeetupPage'
import { site } from './siteContent'
import './App.css'

type GatePhase = 'intro' | 'birthday' | 'site'

export default function App() {
  const [phase, setPhase] = useState<GatePhase>('intro')

  useEffect(() => {
    document.title = site.documentTitle
  }, [])

  if (phase === 'intro') {
    return <IntroGate onComplete={() => setPhase('birthday')} />
  }

  if (phase === 'birthday') {
    return <BirthdayGate onOpenGift={() => setPhase('site')} />
  }

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/memories" element={<MemoriesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/time-together" element={<TimeTogetherPage />} />
        <Route path="/meetup" element={<MeetupPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}