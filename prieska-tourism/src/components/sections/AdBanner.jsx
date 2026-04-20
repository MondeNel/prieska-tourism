import { useState, useEffect } from 'react'
import { X, ExternalLink } from 'lucide-react'

// Placeholder ads - replace with real ad data later
const ads = [
  {
    id: 1,
    title: 'Prieska Copper Mine',
    description: 'Now hiring! Join our team.',
    bgColor: 'from-amber-500 to-orange-600',
    link: '#',
    image: null
  },
  {
    id: 2,
    title: 'Die Bos Nature Reserve',
    description: 'Book your picnic spot today!',
    bgColor: 'from-green-600 to-emerald-700',
    link: '#',
    image: null
  },
  {
    id: 3,
    title: 'Tieroog Mall',
    description: 'Shop local. Support Prieska.',
    bgColor: 'from-purple-600 to-pink-600',
    link: '#',
    image: null
  }
]

const AdBanner = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  const currentAd = ads[currentAdIndex]

  return (
    <div className="relative max-w-7xl mx-auto px-4 mb-8">
      <div className={`bg-gradient-to-r ${currentAd.bgColor} rounded-xl shadow-lg overflow-hidden`}>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 z-10 p-1 bg-black/20 hover:bg-black/40 rounded-full text-white transition"
        >
          <X size={16} />
        </button>
        
        <a href={currentAd.link} target="_blank" rel="noopener noreferrer" className="block p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <span className="text-xs uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">Sponsored</span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mt-3">{currentAd.title}</h3>
              <p className="text-white/90 mt-1">{currentAd.description}</p>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full text-white font-medium hover:bg-white/30 transition">
              <span>Learn More</span>
              <ExternalLink size={16} />
            </div>
          </div>
        </a>
      </div>
      
      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {ads.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentAdIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentAdIndex 
                ? 'w-8 bg-prieska-terracotta' 
                : 'w-4 bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default AdBanner