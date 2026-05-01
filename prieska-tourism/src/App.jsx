// src/App.jsx
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useSearchParams, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import GalleryPage from './pages/GalleryPage'
import FAQ from './pages/FAQ'
import Booking from './pages/Booking'

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

function AppContent() {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const [activeFeed, setActiveFeed] = useState(() => {
    // Read from URL on initial load
    const feedParam = new URLSearchParams(window.location.search).get('feed')
    return feedParam || 'feed'
  })

  const switchFeed = (feedName) => {
    setActiveFeed(feedName)
    // Update URL without page reload
    if (feedName !== 'feed') {
      setSearchParams({ feed: feedName }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }

  // Sync state from URL when navigating back/forward
  useEffect(() => {
    const feedParam = searchParams.get('feed')
    if (feedParam && feedParam !== activeFeed) {
      setActiveFeed(feedParam)
    } else if (!feedParam && activeFeed !== 'feed') {
      setActiveFeed('feed')
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar switchFeed={switchFeed} activeFeed={activeFeed} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home activeFeed={activeFeed} switchFeed={switchFeed} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App