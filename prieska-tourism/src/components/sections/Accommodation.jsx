// src/components/sections/Accommodation.jsx
import { useState } from 'react'
import { MapPin, Phone, MessageCircle, Facebook, Instagram, Camera } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import GalleryModal from '../ui/GalleryModal'
import { accommodations } from '../../data/accommodations'

const Accommodation = () => {
  const [selectedAccommodation, setSelectedAccommodation] = useState(null)
  const [galleryOpen, setGalleryOpen] = useState(false)

  const openWhatsApp = (whatsappNumber) => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank')
  }

  const openGallery = (accommodation) => {
    setSelectedAccommodation(accommodation)
    setGalleryOpen(true)
  }

  return (
    <div className="space-y-4">
      <SectionTitle subtitle="STAY IN COMFORT" title="Prieska Guesthouses & Lodges" />
      
      <div className="grid grid-cols-1 gap-4">
        {accommodations.map((place) => (
          <div 
            key={place.id} 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            {/* Photo Area */}
            <div className="relative h-44 bg-gradient-to-br from-prieska-river to-prieska-terracotta flex items-center justify-center">
              <span className="text-white text-lg font-semibold opacity-80">Guesthouse Photo</span>
              <div className="absolute top-3 left-3">
                <span className="bg-prieska-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {place.type}
                </span>
              </div>
              <button 
                onClick={() => openGallery(place)}
                className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 hover:bg-black/80 transition"
              >
                <Camera className="w-3 h-3" />
                View Photos
              </button>
            </div>
            
            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-serif font-bold text-gray-800 dark:text-white">
                  {place.name}
                </h3>
                <span className="text-prieska-terracotta dark:text-prieska-terracotta font-semibold text-xs bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded">
                  {place.priceRange}
                </span>
              </div>
              
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mb-2">
                <MapPin className="w-3.5 h-3.5 mr-1 text-prieska-terracotta" />
                <span>Prieska, Northern Cape</span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-xs mb-3">
                {place.description}
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {place.features.map((feat, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                    {feat}
                  </span>
                ))}
              </div>
              
              {/* Contact Buttons */}
              <div className="flex gap-2 mb-3">
                <button className="flex-1 border border-prieska-terracotta text-prieska-terracotta hover:bg-prieska-terracotta hover:text-white font-medium py-2 rounded-lg transition text-xs flex items-center justify-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </button>
                <button 
                  onClick={() => openWhatsApp(place.whatsapp)}
                  className="flex-1 bg-green-600 text-white hover:bg-green-700 font-medium py-2 rounded-lg transition text-xs flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </button>
              </div>

              {/* Contact Info */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                <span className="text-[10px] text-gray-400 dark:text-gray-500">{place.contact}</span>
                <div className="flex items-center gap-3">
                  {place.facebook && (
                    <a href={place.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition">
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {place.instagram && (
                    <a href={place.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition">
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Modal */}
      <GalleryModal 
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        images={selectedAccommodation?.images || []}
        title={selectedAccommodation?.name || ''}
      />
    </div>
  )
}

export default Accommodation