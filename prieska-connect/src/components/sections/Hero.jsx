// src/components/sections/Hero.jsx
import { useEffect, useRef, useState } from 'react'
import { MapPin, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
    
    const handleScroll = () => {
      if (containerRef.current) {
        const scrolled = window.scrollY
        containerRef.current.style.transform = `translateY(${scrolled * 0.3}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-prieska-river via-prieska-terracotta to-prieska-sand">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full border-8 border-white/20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full border-8 border-white/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-64 h-64 bg-prieska-river/20 rounded-full blur-3xl" />
      </div>

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-px bg-white absolute left-1/4" />
        <div className="h-full w-px bg-white absolute left-1/2" />
        <div className="h-full w-px bg-white absolute left-3/4" />
        <div className="w-full h-px bg-white absolute top-1/4" />
        <div className="w-full h-px bg-white absolute top-1/2" />
        <div className="w-full h-px bg-white absolute top-3/4" />
      </div>

      {/* Main Content */}
      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        style={{ willChange: 'transform' }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8">
              <MapPin className="w-4 h-4 text-prieska-sand" />
              <span className="text-prieska-sand uppercase tracking-wider text-xs font-semibold">
                Northern Cape, South Africa
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              <span className="block">Your Digital</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-prieska-sand to-white">
                Town Square
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-lg leading-relaxed">
              Connect with local news, discover businesses, find events, and engage with your community — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('quick-access')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-white text-prieska-river px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Explore Prieska
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/services')}
                className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-medium text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                Discover Services
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-white/60">Local Businesses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-white/60">Community Access</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-white/60">Free to Use</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className={`hidden lg:block transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="relative">
              {/* Decorative Card Stack */}
              <div className="absolute -top-8 -right-8 w-64 h-80 bg-white/10 backdrop-blur-md rounded-2xl rotate-6 border border-white/20 shadow-xl" />
              <div className="absolute -bottom-8 -left-8 w-64 h-80 bg-white/10 backdrop-blur-md rounded-2xl -rotate-3 border border-white/20 shadow-xl" />
              
              {/* Main Card */}
              <div className="relative bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-prieska-terracotta to-prieska-river flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                      <circle cx="7" cy="7" r="3" fill="white" />
                      <circle cx="17" cy="7" r="3" fill="white" />
                      <circle cx="12" cy="17" r="3" fill="white" />
                      <line x1="10" y1="7" x2="14" y2="7" stroke="white" strokeWidth="2" />
                      <line x1="9" y1="10" x2="11" y2="14" stroke="white" strokeWidth="2" />
                      <line x1="15" y1="10" x2="13" y2="14" stroke="white" strokeWidth="2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">Prieska Connect</h3>
                    <p className="text-white/70 text-sm">Your Digital Town Square</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white/90">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm">2 new community notices</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-sm">Farmers Market this Saturday</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    <span className="text-sm">Municipal update available</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-prieska-terracotta border-2 border-white" />
                    <div className="w-8 h-8 rounded-full bg-prieska-river border-2 border-white" />
                    <div className="w-8 h-8 rounded-full bg-prieska-sand border-2 border-white" />
                    <div className="w-8 h-8 rounded-full bg-white/30 border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-white font-medium">+12</span>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mt-3">Join hundreds of Prieska residents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={() => document.getElementById('quick-access')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
          <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-bounce" />
        </div>
      </button>
    </section>
  )
}

export default Hero