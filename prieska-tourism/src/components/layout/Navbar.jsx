// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Facebook, Instagram, Twitter, ArrowRight, Sun, Moon,
  Newspaper, Landmark, Bell, CalendarDays, Store, Bed, Briefcase, MapPin, Shield,
  GraduationCap, Users, Megaphone, AlertCircle, Fuel, Home, Clock, Image, HelpCircle
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import Logo from '../ui/Logo'

const Navbar = ({ switchFeed, activeFeed, openModal }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (path) => { setIsOpen(false); navigate(path) }

  const handleFeedNavigation = (feedName) => {
    setIsOpen(false)
    if (location.pathname !== '/') { navigate(`/?feed=${feedName}`) }
    else { switchFeed?.(feedName) }
  }

  const pageLinks = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Services', icon: Clock, path: '/services' },
    { name: 'Gallery', icon: Image, path: '/gallery' },
    { name: 'FAQ', icon: HelpCircle, path: '/faq' },
    { name: 'Book Now', icon: CalendarDays, path: '/booking', highlight: true },
  ]

  const quickLinks = [
    { id: 'feed', name: 'News Feed', icon: Newspaper, action: () => handleFeedNavigation('feed') },
    { id: 'history', name: 'History', icon: Landmark, action: () => handleFeedNavigation('history') },
    { id: 'news', name: 'Local News', icon: Newspaper, action: () => handleFeedNavigation('news') },
    { id: 'noticeboard', name: 'Notice Board', icon: Bell, action: () => handleFeedNavigation('noticeboard') },
    { id: 'events', name: 'Events', icon: CalendarDays, action: () => handleFeedNavigation('events') },
    { id: 'businesses', name: 'Businesses', icon: Store, action: () => handleFeedNavigation('businesses') },
    { id: 'vacancies', name: 'Vacancies', icon: Briefcase, action: () => handleFeedNavigation('vacancies') },
    { id: 'guesthouses', name: 'Guesthouses', icon: Bed, action: () => handleFeedNavigation('guesthouses') },
    { id: 'fuel', name: 'Fuel Prices', icon: Fuel, action: () => handleFeedNavigation('fuel') },
    { id: 'map', name: 'Map', icon: MapPin, action: () => handleFeedNavigation('map') },
    { id: 'emergency', name: 'Emergency', icon: Shield, action: () => handleFeedNavigation('emergency') },
    { id: 'schools', name: 'Schools', icon: GraduationCap, action: () => handleFeedNavigation('schools') },
    { id: 'community', name: 'Community', icon: Users, action: () => handleFeedNavigation('community') },
    { id: 'report', name: 'Report Issue', icon: AlertCircle, action: () => handleFeedNavigation('report') },
    { id: 'municipal', name: 'Municipal Updates', icon: Megaphone, action: () => handleFeedNavigation('municipal') },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg py-1' : 'bg-white dark:bg-gray-900 py-1.5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}><Logo size="small" /></Link>
          <div className="flex items-center gap-1.5">
            <button onClick={() => { setIsOpen(false); navigate('/booking') }} className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-prieska-terracotta to-prieska-river text-white text-xs font-medium rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"><span>Book Now</span><ArrowRight className="w-3.5 h-3.5" /></button>
            <button onClick={toggleTheme} className="p-1.5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition" aria-label="Toggle theme">{isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</button>
            <div className="hidden sm:flex items-center gap-0.5 border-l border-gray-200 dark:border-gray-700 pl-1.5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-blue-600 transition"><Facebook className="w-3.5 h-3.5" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-pink-600 transition"><Instagram className="w-3.5 h-3.5" /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-blue-400 transition"><Twitter className="w-3.5 h-3.5" /></a>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition" aria-label="Toggle menu">{isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
{isOpen && (
  <>
    <div className="fixed inset-0 top-[49px] z-40 bg-black/50" onClick={() => setIsOpen(false)} />
    <div className="fixed top-[49px] right-0 bottom-0 w-72 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto">
      <div className="p-3 space-y-3 pb-24">
        <div>
          <h3 className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5 px-2">Pages</h3>
          {pageLinks.map(link => (
            <button key={link.path} onClick={() => handleNavigation(link.path)} className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${link.highlight ? 'bg-gradient-to-r from-prieska-terracotta to-prieska-river text-white' : location.pathname === link.path ? 'bg-prieska-terracotta/10 text-prieska-terracotta' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <link.icon className="w-3.5 h-3.5" />{link.name}
            </button>
          ))}
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700" />
        <div>
          <h3 className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5 px-2">Quick Links</h3>
          {quickLinks.map(link => (
            <button key={link.id} onClick={link.action} className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${activeFeed === link.id ? 'bg-prieska-terracotta/10 text-prieska-terracotta border-l-2 border-prieska-terracotta' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-prieska-terracotta'}`}>
              <link.icon className="w-3.5 h-3.5" />{link.name}
            </button>
          ))}
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          <div className="flex items-center justify-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-600"><Facebook className="w-4 h-4" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-pink-600"><Instagram className="w-4 h-4" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-400"><Twitter className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </div>
  </>
)}
    </nav>
  )
}

export default Navbar