// src/components/sections/AdBanner.jsx
import { useState, useEffect } from 'react'
import { X, ExternalLink } from 'lucide-react'

const ads = [
  { id: 1, title: 'Tieroog Mall', description: 'Shop local. Support Prieska.', bgColor: 'from-purple-600 to-pink-600', link: '#' },
  { id: 2, title: 'Prieska Copper Mine', description: 'Now hiring! Join our team.', bgColor: 'from-amber-500 to-orange-600', link: '#' },
  { id: 3, title: 'GWK Fuel Station', description: 'Best fuel prices in town.', bgColor: 'from-green-600 to-emerald-700', link: '#' },
  { id: 4, title: 'Spar Tieroog Mall', description: 'Fresh produce daily.', bgColor: 'from-blue-600 to-indigo-700', link: '#' },
]

const AdBanner = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  const currentAd = ads[currentAdIndex]

  return (
    <div className="relative">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute -top-1 -right-1 z-10 p-0.5 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow transition"
      >
        <X className="w-3 h-3 text-gray-400" />
      </button>
      
      <div className={`bg-gradient-to-r ${currentAd.bgColor} rounded-lg px-3 py-2 text-white text-center`}>
        <span className="text-[9px] uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded-full mr-1.5">Ad</span>
        <span className="text-[11px]">{currentAd.title} — {currentAd.description}</span>
      </div>
      
      {/* Dot indicators */}
      <div className="flex justify-center gap-1 mt-1">
        {ads.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentAdIndex(idx)}
            className={`h-1 rounded-full transition-all ${
              idx === currentAdIndex ? 'w-3 bg-prieska-terracotta' : 'w-1.5 bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default AdBanner