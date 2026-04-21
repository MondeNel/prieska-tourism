// src/components/sections/Hero.jsx
import { useEffect, useRef } from 'react'
import { MapPin, ArrowDown } from 'lucide-react'

const Hero = () => {
  const gradientRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (gradientRef.current) {
        const scrolled = window.scrollY
        gradientRef.current.style.transform = `translateY(${scrolled * 0.1}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToContent = () => {
    const quickAccess = document.querySelector('#quick-access')
    if (quickAccess) {
      quickAccess.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-[70vh] md:h-[80vh] min-h-[500px] md:min-h-[600px] max-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div 
        ref={gradientRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-prieska-river via-prieska-terracotta to-prieska-sand opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-gradient-shift" />
      </div>

      {/* Floating Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-prieska-terracotta/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-prieska-river/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-prieska-sand/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 mb-6 md:mb-8 animate-fade-in-up">
          <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-prieska-sand" />
          <span className="text-prieska-sand uppercase tracking-widest text-[10px] md:text-xs font-semibold">
            Northern Cape, South Africa
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="mb-4 md:mb-6">
          <span 
            className="block text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-prieska-sand to-white animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Prieska Connect
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-2xl lg:text-3xl mb-3 md:mb-4 font-light max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Your Digital Town Square
        </p>

        {/* Description */}
        <p className="text-sm md:text-lg text-white/90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          Connecting our community — from local news and events to businesses and municipal updates.
        </p>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center gap-1 md:gap-2 animate-bounce z-10 group"
        aria-label="Scroll to content"
      >
        <span className="text-xs uppercase tracking-wider opacity-70 group-hover:opacity-100 transition">Discover</span>
        <ArrowDown className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            opacity: 0;
            animation: fadeInUp 0.8s ease-out forwards;
          }
          @keyframes gradientShift {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.05); }
          }
          .animate-gradient-shift {
            animation: gradientShift 8s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  )
}

export default Hero