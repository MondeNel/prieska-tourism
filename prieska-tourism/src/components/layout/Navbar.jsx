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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Businesses', path: '/#businesses' },
    { name: 'FAQ', path: '/faq' },
  ]

  const handleNavigation = (path) => {
    setIsOpen(false)
    
    if (path.includes('#')) {
      const [route, hash] = path.split('#')
      if (location.pathname === route || (route === '/' && location.pathname === '/')) {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
        return
      } else {
        navigate(path)
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
        return
      }
    }
    
    navigate(path)
  }

  return (
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg py-2' 
        : 'bg-transparent py-3 md:py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Updated Logo */}
          <Link to="/" className="flex items-center">
            <Logo scrolled={scrolled} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.path)}
                className={`relative px-3 lg:px-4 py-2 font-medium transition-all duration-200 group ${
                  scrolled 
                    ? 'text-gray-700 dark:text-gray-300 hover:text-prieska-terracotta dark:hover:text-prieska-terracotta' 
                    : 'text-white/90 hover:text-white dark:text-white/90 dark:hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-prieska-terracotta scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                  !scrolled && 'bg-white dark:bg-white'
                }`} />
              </button>
            ))}
            
            {/* Book Now CTA Button */}
            <button
              onClick={() => navigate('/booking')}
              className="ml-2 lg:ml-4 px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-prieska-terracotta to-prieska-river text-white font-semibold rounded-full shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-1.5 lg:gap-2 text-sm lg:text-base"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                scrolled 
                  ? 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800' 
                  : 'text-white/80 dark:text-white/80 hover:text-white dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-1 lg:gap-2 ml-1 lg:ml-2 pl-1 lg:pl-2 border-l border-gray-300/50 dark:border-gray-700">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  scrolled 
                    ? 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20' 
                    : 'text-white/80 dark:text-white/80 hover:text-white dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10'
                }`}>
                <Facebook className="w-5 h-5 lg:w-[22px] lg:h-[22px]" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  scrolled 
                    ? 'text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20' 
                    : 'text-white/80 dark:text-white/80 hover:text-white dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10'
                }`}>
                <Instagram className="w-5 h-5 lg:w-[22px] lg:h-[22px]" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  scrolled 
                    ? 'text-gray-500 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20' 
                    : 'text-white/80 dark:text-white/80 hover:text-white dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10'
                }`}>
                <Twitter className="w-5 h-5 lg:w-[22px] lg:h-[22px]" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled 
                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' 
                : 'text-white dark:text-white hover:bg-white/10 dark:hover:bg-black/20'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className={`mx-4 mt-2 mb-4 rounded-2xl shadow-xl overflow-hidden ${
          scrolled ? 'bg-white dark:bg-gray-900' : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md'
        }`}>
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.path)}
                className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-prieska-terracotta dark:hover:text-prieska-terracotta hover:bg-prieska-sand/20 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
              >
                {link.name}
              </button>
            ))}
            
            <button
              onClick={() => {
                setIsOpen(false)
                navigate('/booking')
              }}
              className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-prieska-terracotta to-prieska-river text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-prieska-terracotta dark:hover:text-prieska-terracotta"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar