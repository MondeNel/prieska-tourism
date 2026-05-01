// src/App.jsx
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import GalleryPage from './pages/GalleryPage'
import FAQ from './pages/FAQ'
import Booking from './pages/Booking'

function App() {
  const [activeFeed, setActiveFeed] = useState('feed')

  const switchFeed = (feedName) => {
    setActiveFeed(feedName)
  }

  return (
    <Router>
      <AppContent activeFeed={activeFeed} switchFeed={switchFeed} />
    </Router>
  )
}

function AppContent({ activeFeed, switchFeed }) {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const feedParam = searchParams.get('feed')
    if (feedParam && feedParam !== activeFeed) {
      switchFeed(feedParam)
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