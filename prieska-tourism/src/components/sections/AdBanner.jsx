import { useState, useEffect } from 'react'
import { X, ExternalLink } from 'lucide-react'

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
    <div className="relative max-w-7xl mx-auto px-4 mb-6 md:mb-8">
      <div className={`bg-gradient-to-r ${currentAd.bgColor} rounded-xl shadow-lg overflow-hidden`}>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-1.5 right-1.5 md:top-2 md:right-2 z-10 p-1 bg-black/20 hover:bg-black/40 rounded-full text-white transition"
        >
          <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>
        
        <a href={currentAd.link} target="_blank" rel="noopener noreferrer" className="block p-4 md:p-6 lg:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
            <div className="text-white">
              <span className="text-[10px] md:text-xs uppercase tracking-wider bg-white/20 px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                Sponsored
              </span>
              <h3 className="text-lg md:text-2xl lg:text-3xl font-serif font-bold mt-2 md:mt-3">
                {currentAd.title}
              </h3>
              <p className="text-white/90 text-sm md:text-base mt-0.5 md:mt-1">
                {currentAd.description}
              </p>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 md:px-5 md:py-3 rounded-full text-white text-sm md:text-base font-medium hover:bg-white/30 transition self-start md:self-auto">
              <span>Learn More</span>
              <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </div>
          </div>
        </a>
      </div>
      
      <div className="flex justify-center gap-1.5 md:gap-2 mt-2 md:mt-3">
        {ads.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentAdIndex(idx)}
            className={`h-1 md:h-1.5 rounded-full transition-all ${
              idx === currentAdIndex 
                ? 'w-6 md:w-8 bg-prieska-terracotta' 
                : 'w-3 md:w-4 bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default AdBanner