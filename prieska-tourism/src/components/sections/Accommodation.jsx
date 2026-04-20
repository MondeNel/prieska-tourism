import { useState } from 'react'
import { MapPin, Bed, Wifi, Car, Wind, Utensils, Phone, MessageCircle, Facebook, Instagram, Camera } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import GalleryModal from '../ui/GalleryModal'
import { accommodations } from '../../data/accommodations'

const Accommodation = () => {
  const [selectedAccommodation, setSelectedAccommodation] = useState(null)
  const [galleryOpen, setGalleryOpen] = useState(false)

  const getFeatureIcon = (feature) => {
    if (feature.includes('WiFi')) return <Wifi size={14} />
    if (feature.includes('Parking')) return <Car size={14} />
    if (feature.includes('A/C') || feature.includes('Air')) return <Wind size={14} />
    if (feature.includes('Breakfast')) return <Utensils size={14} />
    return <Bed size={14} />
  }

  const openWhatsApp = (whatsappNumber) => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank')
  }

  const openGallery = (accommodation) => {
    setSelectedAccommodation(accommodation)
    setGalleryOpen(true)
  }

  return (
    <section id="accommodation" className="py-16 px-4 max-w-7xl mx-auto">
      <SectionTitle subtitle="STAY IN COMFORT" title="Prieska Guesthouses & Lodges" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {accommodations.map((place) => (
          <div 
            key={place.id} 
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
          >
            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-prieska-river to-prieska-terracotta flex items-center justify-center group-hover:scale-105 transition duration-500">
              <span className="text-white text-lg font-semibold opacity-80">Guesthouse Photo</span>
              <div className="absolute top-4 left-4">
                <span className="bg-prieska-terracotta text-white text-xs font-bold px-3 py-1 rounded-full">
                  {place.type}
                </span>
              </div>
              {/* View Photos Button Overlay */}
              <button 
                onClick={() => openGallery(place)}
                className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-opacity-80 transition"
              >
                <Camera size={14} />
                View Photos
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-serif font-bold text-gray-800">
                  {place.name}
                </h3>
                <span className="text-prieska-terracotta font-semibold text-sm bg-orange-50 px-2 py-1 rounded">
                  {place.priceRange}
                </span>
              </div>
              
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <MapPin size={16} className="mr-1 text-prieska-terracotta" />
                <span>Prieska, Northern Cape</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {place.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4 border-t border-gray-100 pt-4">
                {place.features.map((feat, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {getFeatureIcon(feat)}
                    {feat}
                  </span>
                ))}
              </div>
              
              {/* Contact Buttons */}
              <div className="flex gap-2 mb-3">
                <button className="flex-1 border border-prieska-terracotta text-prieska-terracotta hover:bg-prieska-terracotta hover:text-white font-medium py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2">
                  <Phone size={16} />
                  Call
                </button>
                <button 
                  onClick={() => openWhatsApp(place.whatsapp)}
                  className="flex-1 bg-green-600 text-white hover:bg-green-700 font-medium py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </button>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center justify-center gap-5 pt-2 border-t border-gray-100">
                {place.facebook && (
                  <a 
                    href={place.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600 transition p-1"
                    title="Facebook"
                  >
                    <Facebook size={22} />
                  </a>
                )}
                {place.instagram && (
                  <a 
                    href={place.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-pink-600 transition p-1"
                    title="Instagram"
                  >
                    <Instagram size={22} />
                  </a>
                )}
                <span className="text-xs text-gray-400">{place.contact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <p className="text-gray-500 italic"></p>
      </div>

      {/* Gallery Modal */}
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