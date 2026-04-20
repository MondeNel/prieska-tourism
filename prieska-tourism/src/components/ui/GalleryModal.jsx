// src/components/ui/GalleryModal.jsx
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const GalleryModal = ({ isOpen, onClose, images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!isOpen) return null

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 md:p-4">
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 md:top-4 md:right-4 text-white hover:text-gray-300 z-10 p-1"
      >
        <X className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      
      <div className="max-w-4xl w-full">
        <h3 className="text-white text-base md:text-xl font-serif mb-3 md:mb-4 text-center px-8">
          {title}
        </h3>
        
        <div className="relative">
          <img 
            src={images[currentIndex]} 
            alt={`${title} - image ${currentIndex + 1}`}
            className="w-full h-auto max-h-[60vh] md:max-h-[70vh] object-contain rounded-lg"
          />
          
          {images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 md:p-2 rounded-full hover:bg-black/70 transition"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 md:p-2 rounded-full hover:bg-black/70 transition"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}
        </div>
        
        <div className="flex justify-center gap-1.5 md:gap-2 mt-3 md:mt-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 md:h-2 rounded-full transition-all ${
                idx === currentIndex 
                  ? 'bg-white w-6 md:w-8' 
                  : 'bg-gray-500 w-1.5 md:w-2'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
        
        <p className="text-gray-400 text-xs md:text-sm text-center mt-3 md:mt-4">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  )
}

export default GalleryModal