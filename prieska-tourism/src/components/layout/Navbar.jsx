// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Facebook, Instagram, Twitter, ArrowRight, Sun, Moon,
  Newspaper, Landmark, Bell, CalendarDays, Store, Bed, Briefcase, MapPin, Shield,
  GraduationCap, Users, Megaphone, AlertCircle, Fuel, Home, Clock, Image, HelpCircle
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import Logo from '../ui/Logo'

const Navbar = ({ switchFeed, openModal }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (path) => {
    setIsOpen(false)
    navigate(path)
  }

  const pageLinks = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Services', icon: Clock, path: '/services' },
    { name: 'Gallery', icon: Image, path: '/gallery' },
    { name: 'FAQ', icon: HelpCircle, path: '/faq' },
    { name: 'Book Now', icon: CalendarDays, path: '/booking', highlight: true },
  ]

  const quickLinks = [
    { name: 'News Feed', icon: Newspaper, action: () => { setIsOpen(false); navigate('/'); switchFeed?.('feed') } },
    { name: 'History', icon: Landmark, action: () => { setIsOpen(false); navigate('/'); switchFeed?.('history') } },
    { name: 'Local News', icon: Newspaper, action: () => { setIsOpen(false); navigate('/'); switchFeed?.('news') } },
    { name: 'Notice Board', icon: Bell, action: () => { setIsOpen(false); navigate('/'); switchFeed?.('noticeboard') } },
    { name: 'Events', icon: CalendarDays, action: () => { setIsOpen(false); navigate('/'); switchFeed?.('events') } },
    { name: 'Businesses', icon: Store, action: () => { setIsOpen(false); navigate('/'); switchFeed?.('businesses') } },
    { name: 'Vacancies', icon: Briefcase, action: () => { setIsOpen(false); navigate('/'); switchFeed?.('vacancies') } },
    { name: 'Guesthouses', icon: Bed, action: () => { setIsOpen(false); navigate('/'); switchFeed?.('guesthouses') } },
    { name: 'Fuel Prices', icon: Fuel, action: () => { setIsOpen(false); navigate('/'); switchFeed?.('fuel') } },
    { name: 'Map', icon: MapPin, action: () => { setIsOpen(false); navigate('/'); switchFeed?.('map') } },
    { name: 'Emergency', icon: Shield, action: () => { setIsOpen(false); navigate('/'); switchFeed?.('emergency') } },
    { name: 'Schools', icon: GraduationCap, action: () => { setIsOpen(false); navigate('/'); switchFeed?.('schools') } },
    { name: 'Community', icon: Users, action: () => { setIsOpen(false); navigate('/'); switchFeed?.('community') } },
    { name: 'Report Issue', icon: AlertCircle, action: () => { setIsOpen(false); navigate('/'); switchFeed?.('report') } },
    { name: 'Municipal Updates', icon: Megaphone, action: () => { setIsOpen(false); navigate('/'); switchFeed?.('municipal') } },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg py-1' 
          : 'bg-white dark:bg-gray-900 py-1.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <Logo size="small" />
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">
            {/* Book Now Button */}
            <button
              onClick={() => { setIsOpen(false); navigate('/booking') }}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-prieska-terracotta to-prieska-river text-white text-xs font-medium rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Social Icons */}
            <div className="hidden sm:flex items-center gap-0.5 border-l border-gray-200 dark:border-gray-700 pl-1.5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-blue-600 transition">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-pink-600 transition">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-blue-400 transition">
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[49px] z-40 bg-black/50" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu Panel */}
      <div className={`fixed top-[49px] right-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-2">Pages</h3>
            {pageLinks.map(link => (
              <button
                key={link.path}
                onClick={() => handleNavigation(link.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  link.highlight
                    ? 'bg-gradient-to-r from-prieska-terracotta to-prieska-river text-white'
                    : location.pathname === link.path
                      ? 'bg-prieska-terracotta/10 text-prieska-terracotta'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </button>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700" />

          <div>
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-2">Quick Links</h3>
            {quickLinks.map(link => (
              <button
                key={link.name}
                onClick={link.action}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-prieska-terracotta transition-colors"
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </button>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 dark:text-gray-400 hover:text-pink-600">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-400">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar