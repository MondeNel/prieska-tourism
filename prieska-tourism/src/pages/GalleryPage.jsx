// src/pages/GalleryPage.jsx
import { useState } from 'react'
import SectionTitle from '../components/ui/SectionTitle'
import { X } from 'lucide-react'

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800', alt: 'Orange River sunset', caption: 'Orange River at golden hour' },
  { id: 2, src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800', alt: 'Karoo landscape', caption: 'Endless Karoo plains' },
  { id: 3, src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800', alt: 'Aloe garden', caption: 'Ria Huysamen Aloe Garden' },
  { id: 4, src: 'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=800', alt: 'Historic fort', caption: 'Prieska Koppie Fort' },
  { id: 5, src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', alt: 'Die Bos', caption: 'Die Bos Nature Reserve' },
  { id: 6, src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800', alt: 'Starry sky', caption: 'Karoo starry night' },
  { id: 7, src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', alt: 'River bend', caption: 'Wonderdraai optical illusion' },
  { id: 8, src: 'https://images.unsplash.com/photo-1533575770077-052fa2c609fc?w=800', alt: 'Rock art', caption: 'Ancient San rock paintings' },
]

const GalleryPage = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)

  return (
    <div className="py-8 md:py-16 px-4 max-w-7xl mx-auto min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <SectionTitle subtitle="VISUAL JOURNEY" title="Prieska Gallery" />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {galleryImages.map((img) => (
          <div
            key={img.id}
            onClick={() => { setCurrentImage(img); setLightboxOpen(true) }}
            className="aspect-square overflow-hidden rounded-lg cursor-pointer group relative"
          >
            <img 
              src={img.src} 
              alt={img.alt} 
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-2 md:p-3">
              <p className="text-white text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 bg-black/95 dark:bg-black/95 z-50 flex items-center justify-center p-4">
          <button 
            onClick={() => setLightboxOpen(false)} 
            className="absolute top-2 right-2 md:top-4 md:right-4 text-white hover:text-gray-300 p-2 z-10"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <img 
            src={currentImage.src} 
            alt={currentImage.alt} 
            className="max-h-[85vh] max-w-full object-contain"
          />
          <p className="absolute bottom-4 md:bottom-8 text-white text-sm md:text-lg text-center px-4">
            {currentImage.caption}
          </p>
        </div>
      )}
    </div>
  )
}

export default GalleryPage