// src/components/sections/Accommodation.jsx
import { useState } from 'react'
import { MapPin, Bed, Wifi, Car, Wind, Utensils, Phone, MessageCircle, Facebook, Instagram, Camera } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import GalleryModal from '../ui/GalleryModal'
import { accommodations } from '../../data/accommodations'

const Accommodation = () => {
  const [selectedAccommodation, setSelectedAccommodation] = useState(null)
  const [galleryOpen, setGalleryOpen] = useState(false)

  const getFeatureIcon = (feature) => {
    const iconSize = "w-3.5 h-3.5 md:w-4 md:h-4"
    if (feature.includes('WiFi')) return <Wifi className={iconSize} />
    if (feature.includes('Parking')) return <Car className={iconSize} />
    if (feature.includes('A/C') || feature.includes('Air')) return <Wind className={iconSize} />
    if (feature.includes('Breakfast')) return <Utensils className={iconSize} />
    return <Bed className={iconSize} />
  }

  const openWhatsApp = (whatsappNumber) => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank')
  }

  const openGallery = (accommodation) => {
    setSelectedAccommodation(accommodation)
    setGalleryOpen(true)
  }

  return (
    <section id="accommodation" className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      <SectionTitle subtitle="STAY IN COMFORT" title="Prieska Guesthouses & Lodges" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {accommodations.map((place) => (
          <div 
            key={place.id} 
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
          >
            <div className="relative h-44 md:h-56 overflow-hidden bg-gradient-to-br from-prieska-river to-prieska-terracotta flex items-center justify-center group-hover:scale-105 transition duration-500">
              <span className="text-white text-base md:text-lg font-semibold opacity-80">Guesthouse Photo</span>
              <div className="absolute top-2 md:top-4 left-2 md:left-4">
                <span className="bg-prieska-terracotta text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                  {place.type}
                </span>
              </div>
              <button 
                onClick={() => openGallery(place)}
                className="absolute bottom-2 md:bottom-4 right-2 md:right-4 bg-black bg-opacity-60 text-white text-[10px] md:text-xs px-2 md:px-3 py-1 md:py-1.5 rounded-full flex items-center gap-1 hover:bg-opacity-80 transition"
              >
                <Camera className="w-3 h-3 md:w-3.5 md:h-3.5" />
                View Photos
              </button>
            </div>
            
            <div className="p-4 md:p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg md:text-xl font-serif font-bold text-gray-800 dark:text-white">
                  {place.name}
                </h3>
                <span className="text-prieska-terracotta dark:text-prieska-terracotta font-semibold text-xs md:text-sm bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 md:py-1 rounded">
                  {place.priceRange}
                </span>
              </div>
              
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs md:text-sm mb-3">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 text-prieska-terracotta dark:text-prieska-terracotta" />
                <span>Prieska, Northern Cape</span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3">
                {place.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4 border-t border-gray-100 dark:border-gray-700 pt-3 md:pt-4">
                {place.features.map((feat, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 text-[10px] md:text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 md:py-1 rounded-full">
                    {getFeatureIcon(feat)}
                    {feat}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2 mb-2 md:mb-3">
                <button className="flex-1 border border-prieska-terracotta text-prieska-terracotta dark:text-prieska-terracotta hover:bg-prieska-terracotta hover:text-white dark:hover:text-white font-medium py-1.5 md:py-2 rounded-lg transition duration-200 flex items-center justify-center gap-1.5 text-xs md:text-sm">
                  <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Call
                </button>
                <button 
                  onClick={() => openWhatsApp(place.whatsapp)}
                  className="flex-1 bg-green-600 text-white hover:bg-green-700 font-medium py-1.5 md:py-2 rounded-lg transition duration-200 flex items-center justify-center gap-1.5 text-xs md:text-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  WhatsApp
                </button>
              </div>

              <div className="flex items-center justify-center gap-3 md:gap-5 pt-2 border-t border-gray-100 dark:border-gray-700">
                {place.facebook && (
                  <a 
                    href={place.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition p-1"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                )}
                {place.instagram && (
                  <a 
                    href={place.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500 transition p-1"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                )}
                <span className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500">{place.contact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8 md:mt-10">
        <p className="text-gray-500 dark:text-gray-400 italic text-xs md:text-sm"></p>
      </div>

      <GalleryModal 
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        images={selectedAccommodation?.images || []}
        title={selectedAccommodation?.name || ''}
      />
    </section>
  )
}

export default Accommodation