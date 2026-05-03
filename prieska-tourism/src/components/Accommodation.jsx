import { useState, useEffect } from 'react';
import SectionTitle from './ui/SectionTitle';
import GalleryModal from './ui/GalleryModal';
import AddReviewModal from './ui/AddReviewModal';
import { accommodations } from '../data/accommodations';

// Star Rating Component using pure SVG
const StarRating = ({ rating, size = '3' }) => {
  const sizeClass = size === '2.5' ? 'w-2.5 h-2.5' : 'w-3 h-3';
  
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClass} ${star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );
};

// Icon Components using Font Awesome
const MapPinIcon = () => <i className="fas fa-map-marker-alt w-3.5 h-3.5"></i>;
const PhoneIcon = () => <i className="fas fa-phone"></i>;
const MessageCircleIcon = () => <i className="fab fa-whatsapp"></i>;
const CameraIcon = () => <i className="fas fa-camera"></i>;
const PlusIcon = () => <i className="fas fa-plus"></i>;
const NavigationIcon = () => <i className="fas fa-directions"></i>;

const AccommodationSkeleton = () => (
  <div className="space-y-6">
    <div className="text-center">
      <div className="h-3 bg-gray-200 rounded w-32 mx-auto mb-2 animate-pulse" />
      <div className="h-6 bg-gray-200 rounded w-64 mx-auto animate-pulse" />
      <div className="h-0.5 bg-gray-200 w-16 mx-auto mt-2 animate-pulse" />
    </div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
        <div className="h-44 bg-gray-200" />
        <div className="p-4 space-y-3">
          <div className="flex justify-between">
            <div className="h-5 bg-gray-200 rounded w-1/2" />
            <div className="h-5 bg-gray-200 rounded w-16" />
          </div>
          <div className="h-3 bg-gray-200 rounded w-1/3" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
          <div className="flex gap-2">
            <div className="h-5 bg-gray-200 rounded w-16" />
            <div className="h-5 bg-gray-200 rounded w-16" />
            <div className="h-5 bg-gray-200 rounded w-16" />
          </div>
          <div className="flex gap-2 pt-2">
            <div className="flex-1 h-8 bg-gray-200 rounded-lg" />
            <div className="flex-1 h-8 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const Accommodation = () => {
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleReviews, setVisibleReviews] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <AccommodationSkeleton />;

  const openWhatsApp = (whatsappNumber) => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  const openGallery = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setGalleryOpen(true);
  };

  const openReview = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setReviewOpen(true);
  };

  const toggleReviews = (id) => {
    setVisibleReviews(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getDirections = (name) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' Prieska South Africa')}`, '_blank');
  };

  return (
    <div id="accommodation" className="container mx-auto px-6 py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="STAY IN COMFORT" title="Prieska Guesthouses & Lodges" />
        
        <div className="grid grid-cols-1 gap-6">
          {accommodations.map((place) => (
            <div
              key={place.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-44 bg-gradient-to-r from-orange-600 to-orange-800 flex items-center justify-center">
                <i className="fas fa-building text-5xl text-white/60"></i>
                <div className="absolute top-3 left-3">
                  <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {place.type}
                  </span>
                </div>
                <button
                  onClick={() => openGallery(place)}
                  className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 hover:bg-black/80 transition"
                >
                  <CameraIcon />
                  <span>View Photos</span>
                </button>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-serif font-bold text-gray-800 dark:text-white">{place.name}</h3>
                  <span className="text-orange-600 font-semibold text-xs bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded">
                    {place.priceRange}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={place.rating} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {place.rating} ({place.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mb-2">
                  <MapPinIcon />
                  <span className="ml-1">Prieska, Northern Cape</span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-xs mb-3">{place.description}</p>
                
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {place.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2 mb-2">
                  <button className="flex-1 border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-medium py-2 rounded-lg transition text-xs flex items-center justify-center gap-1.5">
                    <PhoneIcon />
                    Call
                  </button>
                  <button
                    onClick={() => openWhatsApp(place.whatsapp)}
                    className="flex-1 bg-green-600 text-white hover:bg-green-700 font-medium py-2 rounded-lg transition text-xs flex items-center justify-center gap-1.5"
                  >
                    <MessageCircleIcon />
                    WhatsApp
                  </button>
                </div>
                
                <button
                  onClick={() => getDirections(place.name)}
                  className="w-full border border-blue-500 text-blue-600 dark:text-blue-400 py-2 rounded-lg text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition flex items-center justify-center gap-1.5 mb-2"
                >
                  <NavigationIcon />
                  Get Directions
                </button>
                
                <button
                  onClick={() => toggleReviews(place.id)}
                  className="w-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 py-2 rounded-lg text-xs font-medium hover:border-orange-600 hover:text-orange-600 transition flex items-center justify-center gap-1.5 mb-2"
                >
                  <i className="fas fa-star text-xs"></i>
                  View Reviews ({place.reviewCount})
                </button>
                
                {visibleReviews[place.id] && (
                  <div className="mb-2 space-y-2">
                    {place.reviews?.length > 0 ? (
                      place.reviews.map((review) => (
                        <div key={review.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-gray-800 dark:text-white">{review.user}</span>
                            <StarRating rating={review.rating} size="2.5" />
                          </div>
                          <p className="text-[10px] text-gray-600 dark:text-gray-300">{review.text}</p>
                          <p className="text-[8px] text-gray-400 dark:text-gray-500 mt-1">{review.date}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-[10px] text-gray-500 dark:text-gray-400 py-2">No reviews yet. Be the first!</p>
                    )}
                  </div>
                )}
                
                <button
                  onClick={() => openReview(place)}
                  className="w-full border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 py-2 rounded-lg text-xs font-medium hover:border-orange-600 hover:text-orange-600 transition flex items-center justify-center gap-1.5 mb-3"
                >
                  <PlusIcon />
                  Write a Review
                </button>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">{place.contact}</span>
                  <div className="flex items-center gap-3">
                    {place.facebook && (
                      <a
                        href={place.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition text-sm"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    )}
                    {place.instagram && (
                      <a
                        href={place.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-pink-600 transition text-sm"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <GalleryModal
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          images={selectedAccommodation?.images || []}
          title={selectedAccommodation?.name || ''}
        />
        
        <AddReviewModal
          isOpen={reviewOpen}
          onClose={() => setReviewOpen(false)}
          accommodation={selectedAccommodation}
        />
      </div>
    </div>
  );
};

export default Accommodation;