import { useState } from 'react'
import SectionTitle from '../ui/SectionTitle'
import { X } from 'lucide-react'

// Use placeholder images for demo
const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&auto=format',
    alt: 'Orange River at sunset',
    caption: 'Orange River sunset'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&auto=format',
    alt: 'Karoo landscape',
    caption: 'Karoo plains near Prieska'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format',
    alt: 'Aloe garden',
    caption: 'Ria Huysamen Aloe Garden'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=600&auto=format',
    alt: 'Historic fort',
    caption: 'Prieska Koppie Fort'
  },
]

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)

  const openLightbox = (img) => {
    setCurrentImage(img)
    setLightboxOpen(true)
  }

  return (
    <section id="gallery" className="py-16 px-4 max-w-7xl mx-auto">
      <SectionTitle subtitle="VISUAL JOURNEY" title="Prieska Gallery" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryImages.map((img) => (
          <div 
            key={img.id}
            onClick={() => openLightbox(img)}
            className="aspect-square overflow-hidden rounded-lg cursor-pointer group relative"
          >
            <img 
              src={img.src} 
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-end p-3">
              <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Lightbox */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X size={32} />
          </button>
          <img 
            src={currentImage.src} 
            alt={currentImage.alt}
            className="max-h-full max-w-full object-contain"
          />
          <p className="absolute bottom-8 text-white text-lg">{currentImage.caption}</p>
        </div>
      )}
    </section>
  )
}

export default Gallery