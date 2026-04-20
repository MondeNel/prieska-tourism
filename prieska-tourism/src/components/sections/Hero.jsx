// src/components/sections/Hero.jsx
import { useEffect, useRef } from 'react'
import { ChevronDown, MapPin, Sparkles } from 'lucide-react'

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

  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[700px] flex items-center justify-center overflow-hidden">
      
      {/* Animated Gradient Background */}
      <div 
        ref={gradientRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-prieska-river via-prieska-terracotta to-prieska-sand opacity-90" />
        
        {/* Animated mesh gradient overlay */}
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
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6 animate-fade-in-up">
          <MapPin size={14} className="text-prieska-sand" />
          <span className="text-prieska-sand uppercase tracking-widest text-xs font-semibold">
            Northern Cape, South Africa
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-4">
          <span className="block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover
          </span>
          <span 
            className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-prieska-sand to-white animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Prieska
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-2xl mb-3 font-light max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          Where ancient stories meet untamed beauty
        </p>

        {/* Description */}
        <p className="text-base md:text-lg mb-8 text-white/90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          Experience the soul of the Northern Cape — from the mystical Orange River to the warmth of Karoo hospitality.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <button className="bg-white text-prieska-terracotta px-6 py-3 rounded-full text-base font-semibold hover:bg-opacity-95 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2">
            Start Your Journey
            <ChevronDown size={18} className="rotate-[-90deg]" />
          </button>
          <button className="border-2 border-white text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-white hover:text-prieska-terracotta transition-all transform hover:scale-105 backdrop-blur-sm flex items-center justify-center gap-2">
            <Sparkles size={16} />
            Explore Prieska
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a 
        href="#why-prieska" 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center gap-1 animate-bounce z-10"
      >
        <span className="text-xs uppercase tracking-wider">Scroll</span>
        <ChevronDown size={18} />
      </a>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
      `}</style>
    </section>
  )
}

export default Hero