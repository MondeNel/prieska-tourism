// src/components/sections/Hero.jsx
import { useEffect, useRef } from 'react'
import { MapPin } from 'lucide-react'

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
        <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          Experience the soul of the Northern Cape — from the mystical Orange River to the warmth of Karoo hospitality.
        </p>
      </div>

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