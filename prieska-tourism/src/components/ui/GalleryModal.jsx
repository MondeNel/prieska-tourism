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
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
      >
        <X size={32} />
      </button>
      
      <div className="max-w-4xl w-full">
        <h3 className="text-white text-xl font-serif mb-4 text-center">{title}</h3>
        
        <div className="relative">
          <img 
            src={images[currentIndex]} 
            alt={`${title} - image ${currentIndex + 1}`}
            className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
          />
          
          {images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
        
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition ${
                idx === currentIndex ? 'bg-white w-4' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
        
        <p className="text-gray-400 text-sm text-center mt-4">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  )
}

export default GalleryModal