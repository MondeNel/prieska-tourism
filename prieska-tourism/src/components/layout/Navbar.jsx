// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Facebook, Instagram, Twitter, ArrowRight, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import Logo from '../ui/Logo'

const Navbar = () => {
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

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg py-2' 
          : 'bg-white dark:bg-gray-900 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="small" />
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Book Now Button */}
            <button
              onClick={() => navigate('/booking')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-prieska-terracotta to-prieska-river text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Social Icons - Desktop Only */}
            <div className="hidden sm:flex items-center gap-1 border-l border-gray-200 dark:border-gray-700 pl-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Shows nav links and socials */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Home</Link>
            <Link to="/services" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Services</Link>
            <Link to="/gallery" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Gallery</Link>
            <Link to="/faq" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">FAQ</Link>
            <button
              onClick={() => { setIsOpen(false); navigate('/booking') }}
              className="w-full mt-2 px-4 py-2.5 bg-gradient-to-r from-prieska-terracotta to-prieska-river text-white font-medium rounded-lg flex items-center justify-center gap-2"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-4 pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
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
      )}
    </nav>
  )
}

export default Navbar