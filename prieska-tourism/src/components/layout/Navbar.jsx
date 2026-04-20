// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Facebook, Instagram, Twitter, MapPin, ArrowRight } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

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
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-prieska-terracotta to-prieska-river flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg ${!scrolled && 'bg-white/20 backdrop-blur-sm'}`}>
              <MapPin size={20} className="text-white" />
            </div>
            <span className={`text-2xl font-serif font-bold transition-colors duration-300 ${
              scrolled ? 'text-prieska-terracotta' : 'text-white'
            }`}>
              Visit Prieska
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.path)}
                className={`relative px-4 py-2 font-medium transition-all duration-200 group ${
                  scrolled ? 'text-gray-700 hover:text-prieska-terracotta' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-prieska-terracotta scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                  !scrolled && 'bg-white'
                }`} />
              </button>
            ))}
            
            {/* Book Now CTA Button */}
            <button
              onClick={() => navigate('/booking')}
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-prieska-terracotta to-prieska-river text-white font-semibold rounded-full shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <span>Book Now</span>
              <ArrowRight size={18} />
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-300/50">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  scrolled 
                    ? 'text-gray-500 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Facebook"
              >
                <Facebook size={22} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  scrolled 
                    ? 'text-gray-500 hover:text-pink-600 hover:bg-pink-50' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  scrolled 
                    ? 'text-gray-500 hover:text-blue-400 hover:bg-blue-50' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Twitter"
              >
                <Twitter size={22} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`mx-4 mt-2 mb-4 rounded-2xl shadow-xl overflow-hidden ${
          scrolled ? 'bg-white' : 'bg-white/95 backdrop-blur-md'
        }`}>
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.path)}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-prieska-terracotta hover:bg-prieska-sand/20 rounded-lg font-medium transition-colors"
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
              <ArrowRight size={18} />
            </button>

            <div className="flex items-center justify-center gap-4 pt-3 mt-3 border-t border-gray-200">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-pink-600 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-blue-400 transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar