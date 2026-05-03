// src/components/sections/Accommodation.jsx
import { useState, useEffect } from 'react'
import { MapPin, Phone, MessageCircle, Facebook, Instagram, Camera, Star, Plus, Navigation } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import GalleryModal from '../ui/GalleryModal'
import AddReviewModal from '../ui/AddReviewModal'
import { accommodations } from '../../data/accommodations'

const AccommodationSkeleton = () => (
  <div className="space-y-4">
    <div className="text-center">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto mb-2 animate-pulse" />
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto animate-pulse" />
      <div className="h-0.5 bg-gray-200 dark:bg-gray-700 w-16 mx-auto mt-2 animate-pulse" />
    </div>
    {Array(3).fill(0).map((_, i) => (
      <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse">
        <div className="h-44 bg-gray-200 dark:bg-gray-700" />
        <div className="p-4 space-y-3">
          <div className="flex justify-between"><div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2" /><div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16" /></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
          <div className="flex gap-2"><div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16" /><div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16" /><div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16" /></div>
          <div className="flex gap-2 pt-2"><div className="flex-1 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg" /><div className="flex-1 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg" /></div>
        </div>
      </div>
    ))}
  </div>
)

const Accommodation = () => {
  const [selectedAccommodation, setSelectedAccommodation] = useState(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(timer) }, [])
  if (loading) return <AccommodationSkeleton />

  const openWhatsApp = (whatsappNumber) => { window.open(`https://wa.me/${whatsappNumber}`, '_blank') }
  const openGallery = (accommodation) => { setSelectedAccommodation(accommodation); setGalleryOpen(true) }
  const openReview = (accommodation) => { setSelectedAccommodation(accommodation); setReviewOpen(true) }
  const toggleReviews = (id) => { const el = document.getElementById(`reviews-${id}`); if (el) el.classList.toggle('hidden') }
  const getDirections = (name) => { window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' Prieska')}`, '_blank') }

  const renderStars = (rating, size = '3') => {
    const sizeClass = size === '2.5' ? 'w-2.5 h-2.5' : 'w-3 h-3'
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`${sizeClass} ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
    ))
  }

  return (
    <div className="space-y-4">
      <SectionTitle subtitle="STAY IN COMFORT" title="Prieska Guesthouses & Lodges" />
      <div className="grid grid-cols-1 gap-4">
        {accommodations.map((place) => (
          <div key={place.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="relative h-44 bg-gradient-to-br from-prieska-river to-prieska-terracotta flex items-center justify-center">
              <span className="text-white text-lg font-semibold opacity-80">Guesthouse Photo</span>
              <div className="absolute top-3 left-3"><span className="bg-prieska-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{place.type}</span></div>
              <button onClick={() => openGallery(place)} className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 hover:bg-black/80 transition"><Camera className="w-3 h-3" />View Photos</button>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-serif font-bold text-gray-800 dark:text-white">{place.name}</h3>
                <span className="text-prieska-terracotta dark:text-prieska-terracotta font-semibold text-xs bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded">{place.priceRange}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">{renderStars(place.rating)}</div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{place.rating} ({place.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mb-2"><MapPin className="w-3.5 h-3.5 mr-1 text-prieska-terracotta" /><span>Prieska, Northern Cape</span></div>
              <p className="text-gray-600 dark:text-gray-300 text-xs mb-3">{place.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">{place.features.map((feat, idx) => (<span key={idx} className="inline-flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{feat}</span>))}</div>
              
              {/* Contact Buttons */}
              <div className="flex gap-2 mb-2">
                <button className="flex-1 border border-prieska-terracotta text-prieska-terracotta hover:bg-prieska-terracotta hover:text-white font-medium py-2 rounded-lg transition text-xs flex items-center justify-center gap-1.5"><Phone className="w-3.5 h-3.5" />Call</button>
                <button onClick={() => openWhatsApp(place.whatsapp)} className="flex-1 bg-green-600 text-white hover:bg-green-700 font-medium py-2 rounded-lg transition text-xs flex items-center justify-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" />WhatsApp</button>
              </div>
              
              {/* Directions Button */}
              <button onClick={() => getDirections(place.name)} className="w-full border border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400 py-2 rounded-lg text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition flex items-center justify-center gap-1.5 mb-2">
                <Navigation className="w-3.5 h-3.5" />Get Directions
              </button>
              
              {/* View Reviews Button */}
              <button onClick={() => toggleReviews(place.id)} className="w-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 py-2 rounded-lg text-xs font-medium hover:border-prieska-terracotta hover:text-prieska-terracotta transition flex items-center justify-center gap-1.5 mb-2">
                <Star className="w-3.5 h-3.5" />View Reviews ({place.reviewCount})
              </button>
              
              {/* Expandable Reviews */}
              <div id={`reviews-${place.id}`} className="hidden mb-2 space-y-2">
                {place.reviews?.length > 0 ? place.reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1"><span className="text-xs font-medium text-gray-800 dark:text-white">{review.user}</span><div className="flex">{renderStars(review.rating, '2.5')}</div></div>
                    <p className="text-[10px] text-gray-600 dark:text-gray-300">{review.text}</p>
                    <p className="text-[8px] text-gray-400 dark:text-gray-500 mt-1">{review.date}</p>
                  </div>
                )) : <p className="text-center text-[10px] text-gray-500 dark:text-gray-400 py-2">No reviews yet. Be the first!</p>}
              </div>

              {/* Write a Review Button */}
              <button onClick={() => openReview(place)} className="w-full border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 py-2 rounded-lg text-xs font-medium hover:border-prieska-terracotta hover:text-prieska-terracotta transition flex items-center justify-center gap-1.5 mb-3">
                <Plus className="w-3.5 h-3.5" />Write a Review
              </button>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                <span className="text-[10px] text-gray-400 dark:text-gray-500">{place.contact}</span>
                <div className="flex items-center gap-3">
                  {place.facebook && <a href={place.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition"><Facebook className="w-4 h-4" /></a>}
                  {place.instagram && <a href={place.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition"><Instagram className="w-4 h-4" /></a>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <GalleryModal isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} images={selectedAccommodation?.images || []} title={selectedAccommodation?.name || ''} />
      <AddReviewModal isOpen={reviewOpen} onClose={() => setReviewOpen(false)} accommodation={selectedAccommodation} />
    </div>
  )
}

export default Accommodation