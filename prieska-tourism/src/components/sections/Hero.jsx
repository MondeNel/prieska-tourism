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
    <section className="relative h-[60vh] md:h-[70vh] min-h-[450px] md:min-h-[500px] max-h-[600px] md:max-h-[700px] flex items-center justify-center overflow-hidden">
      <div 
        ref={gradientRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-prieska-river via-prieska-terracotta to-prieska-sand opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-gradient-shift" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-prieska-terracotta/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-prieska-river/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-prieska-sand/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto pt-12 md:pt-0">
        <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 mb-4 md:mb-6 animate-fade-in-up">
          <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-prieska-sand" />
          <span className="text-prieska-sand uppercase tracking-widest text-[10px] md:text-xs font-semibold">
            Northern Cape, South Africa
          </span>
        </div>

        <h1 className="text-4xl md:text-7xl font-serif font-bold leading-tight mb-3 md:mb-4">
          <span 
            className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-prieska-sand to-white animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Prieska Connect
          </span>
        </h1>

        <p className="text-base md:text-2xl mb-2 md:mb-3 font-light max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Where ancient stories meet untamed beauty
        </p>

        <p className="text-sm md:text-lg text-white/90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          Experience the soul of the Northern Cape — from the mystical Orange River to the warmth of Karoo hospitality.
        </p>
      </div>

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