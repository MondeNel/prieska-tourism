import { useState, useEffect } from 'react';
import SectionTitle from './ui/SectionTitle';
import GalleryModal from './ui/GalleryModal';
import AddReviewModal from './ui/AddReviewModal';
import AccommodationBookingModal from './AccommodationBookingModal';
import { accommodations } from '../data/accommodations';

// Star Rating Component using pure SVG
const StarRating = ({ rating, size = '3' }) => {
  const sizeClass = size === '2.5' ? 'w-2.5 h-2.5' : 'w-3 h-3';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`${sizeClass} ${star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );
};

// Image Carousel Component
const ImageCarousel = ({ images, onOpenGallery }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!images || images.length === 0) return;
    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [images, isHovered]);

  const goToSlide = (index) => setCurrentIndex(index);
  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="relative h-52 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400 text-xs">No images</span>
      </div>
    );
  }

  return (
    <div
      className="relative h-52 overflow-hidden cursor-pointer group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpenGallery}
    >
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover/carousel:scale-105"
      />
      {/* Overlay with type badge and view photos button */}
      <div className="absolute inset-0 bg-black/20 group-hover/carousel:bg-black/10 transition"></div>
      {/* Navigation arrows (visible on hover) */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover/carousel:opacity-100 transition hover:bg-black/70"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover/carousel:opacity-100 transition hover:bg-black/70"
          >
            ›
          </button>
          {/* Dot indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-amber-400 w-3' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const AccommodationSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
        <div className="h-52 bg-gray-200" />
        <div className="p-6 space-y-3">
          <div className="flex justify-between"><div className="h-5 bg-gray-200 rounded w-1/2" /><div className="h-5 bg-gray-200 rounded w-16" /></div>
          <div className="h-3 bg-gray-200 rounded w-1/3" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
          <div className="flex gap-2"><div className="h-5 bg-gray-200 rounded w-16" /><div className="h-5 bg-gray-200 rounded w-16" /><div className="h-5 bg-gray-200 rounded w-16" /></div>
          <div className="flex gap-2 pt-2"><div className="flex-1 h-8 bg-gray-200 rounded-lg" /><div className="flex-1 h-8 bg-gray-200 rounded-lg" /></div>
        </div>
      </div>
    ))}
  </div>
);

const Accommodation = () => {
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleReviews, setVisibleReviews] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <AccommodationSkeleton />;

  const openWhatsApp = (whatsappNumber) => window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  const openGallery = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setGalleryOpen(true);
  };
  const openReview = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setReviewOpen(true);
  };
  const openBooking = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setBookingOpen(true);
  };
  const toggleReviews = (id) => setVisibleReviews(prev => ({ ...prev, [id]: !prev[id] }));
  const getDirections = (name) => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' Prieska South Africa')}`, '_blank');

  return (
    <>
      <div id="accommodation" className="container mx-auto px-6 py-20">
        <SectionTitle subtitle="STAY IN COMFORT" title="Prieska Guesthouses & Lodges" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accommodations.map((place) => (
            <div key={place.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              {/* Image Carousel */}
              <div className="relative">
                <ImageCarousel
                  images={place.images}
                  onOpenGallery={() => openGallery(place)}
                />
                {/* Type badge (now inside the relative container to sit on top) */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                    {place.type}
                  </span>
                </div>
                {/* View Photos button inside the carousel area */}
                <button
                  onClick={() => openGallery(place)}
                  className="absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-black/80 transition-all duration-300 hover:scale-105"
                >
                  <i className="fas fa-camera"></i>
                  <span>View Photos</span>
                </button>
              </div>

              {/* Content Section (unchanged) */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-serif font-bold text-[#2C3E2F] group-hover:text-[#B87333] transition-colors duration-300">{place.name}</h3>
                  <span className="text-amber-600 font-semibold text-xs bg-amber-50 px-2 py-1 rounded-full">{place.priceRange}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={place.rating} />
                  <span className="text-xs text-gray-500">{place.rating} ({place.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center text-gray-500 text-xs mb-3">
                  <i className="fas fa-map-marker-alt text-amber-500 mr-1.5 text-xs"></i>
                  <span>Prieska, Northern Cape</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{place.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {place.features.slice(0, 4).map((feat, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      <i className="fas fa-check-circle text-amber-500 text-[8px]"></i>{feat}
                    </span>
                  ))}
                  {place.features.length > 4 && <span className="inline-flex text-[10px] text-gray-400">+{place.features.length - 4} more</span>}
                </div>
                <div className="flex gap-2 mb-3">
                  <button onClick={() => window.location.href = `tel:${place.contact}`} className="flex-1 border border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white font-medium py-2 rounded-xl text-xs flex items-center justify-center gap-1.5"><i className="fas fa-phone-alt"></i>Call</button>
                  <button onClick={() => openWhatsApp(place.whatsapp)} className="flex-1 bg-green-600 text-white hover:bg-green-700 font-medium py-2 rounded-xl text-xs flex items-center justify-center gap-1.5"><i className="fab fa-whatsapp"></i>WhatsApp</button>
                </div>
                <button onClick={() => getDirections(place.name)} className="w-full border border-blue-500 text-blue-600 py-2 rounded-xl text-xs font-medium hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-1.5 mb-2"><i className="fas fa-directions"></i>Get Directions</button>
                <button onClick={() => openBooking(place)} className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg mb-2"><i className="fas fa-calendar-check"></i>Book Now</button>
                <button onClick={() => toggleReviews(place.id)} className="w-full border border-gray-300 text-gray-600 py-2 rounded-xl text-xs font-medium hover:border-amber-400 hover:text-amber-600 transition-all duration-300 flex items-center justify-center gap-1.5 mb-2"><i className="fas fa-star"></i>View Reviews ({place.reviewCount})</button>
                {visibleReviews[place.id] && (
                  <div className="mb-3 space-y-2 animate-slide-down">
                    {place.reviews?.length > 0 ? place.reviews.map((review) => (
                      <div key={review.id} className="bg-gray-50 rounded-lg p-3 border-l-2 border-amber-400">
                        <div className="flex items-center justify-between mb-1"><span className="text-xs font-medium text-gray-800">{review.user}</span><StarRating rating={review.rating} size="2.5" /></div>
                        <p className="text-[10px] text-gray-600">{review.text}</p>
                        <p className="text-[8px] text-gray-400 mt-1">{review.date}</p>
                      </div>
                    )) : <p className="text-center text-[10px] text-gray-500 py-2">No reviews yet. Be the first!</p>}
                  </div>
                )}
                <button onClick={() => openReview(place)} className="w-full border border-dashed border-gray-300 text-gray-500 py-2 rounded-xl text-xs font-medium hover:border-amber-400 hover:text-amber-600 transition-all duration-300 flex items-center justify-center gap-1.5"><i className="fas fa-pen"></i>Write a Review</button>
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                  <span className="text-[10px] text-gray-400"><i className="fas fa-phone-alt mr-1"></i>{place.contact}</span>
                  <div className="flex items-center gap-2">
                    {place.facebook && <a href={place.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110"><i className="fab fa-facebook-f"></i></a>}
                    {place.instagram && <a href={place.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-all duration-300 hover:scale-110"><i className="fab fa-instagram"></i></a>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modals */}
        <GalleryModal isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} images={selectedAccommodation?.images || []} title={selectedAccommodation?.name || ''} />
        <AddReviewModal isOpen={reviewOpen} onClose={() => setReviewOpen(false)} accommodation={selectedAccommodation} />
        <AccommodationBookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} guesthouse={selectedAccommodation} />
      </div>

      <style>{`
        @keyframes slide-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </>
  );
};

export default Accommodation;