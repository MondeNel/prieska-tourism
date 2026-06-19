import { useState, useEffect } from 'react';
import SectionTitle from './ui/SectionTitle';
import GalleryModal from './ui/GalleryModal';
import AddReviewModal from './ui/AddReviewModal';
import AccommodationBookingModal from './AccommodationBookingModal';
import { getAccommodations } from '../services/dataService';

const StarRating = ({ rating, size = '3' }) => {
  const sizeClass = size === '2.5' ? 'w-2.5 h-2.5' : 'w-3 h-3';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`${sizeClass} ${star <= rating ? 'text-[#E8A020]' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );
};

const ImageCarousel = ({ images, onOpenGallery }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!images?.length) return;
    let interval;
    if (!isHovered) interval = setInterval(() => setCurrentIndex(prev => (prev + 1) % images.length), 4000);
    return () => clearInterval(interval);
  }, [images, isHovered]);

  const next = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % images.length); };
  const prev = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + images.length) % images.length); };

  if (!images?.length) return <div className="relative h-56 bg-gray-100 flex items-center justify-center text-xs text-gray-400">No images available</div>;

  return (
    <div className="relative h-56 overflow-hidden cursor-pointer group/carousel" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={onOpenGallery}>
      <img src={images[currentIndex]} alt="Accommodation workspace" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/carousel:scale-105" />
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xs text-gray-900 rounded-full w-7 h-7 flex items-center justify-center shadow-sm opacity-0 group-hover/carousel:opacity-100 transition duration-300 font-bold">‹</button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xs text-gray-900 rounded-full w-7 h-7 flex items-center justify-center shadow-sm opacity-0 group-hover/carousel:opacity-100 transition duration-300 font-bold">›</button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => <button key={idx} onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }} className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#E8A020] w-4' : 'bg-white/60 w-1'}`} />)}
          </div>
        </>
      )}
    </div>
  );
};

const Accommodation = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () => {
      setAccommodations(getAccommodations());
      setLoading(false);
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const openWhatsApp = (num) => window.open(`https://wa.me/${num}`, '_blank');
  const openGallery = (acc) => { setSelectedAccommodation(acc); setGalleryOpen(true); };
  const openReview = (acc) => { setSelectedAccommodation(acc); setReviewOpen(true); };
  const openBooking = (acc) => { setSelectedAccommodation(acc); setBookingOpen(true); };
  const toggleReviews = (id) => setVisibleReviews(prev => ({ ...prev, [id]: !prev[id] }));
  const getDirections = (name) => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' Prieska')}`, '_blank');

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">Loading fine accommodations...</div>;

  return (
    <>
      <div id="stay" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 border-b border-gray-100">
        <SectionTitle subtitle="STAY IN COMFORT" title="Prieska Guesthouses & Lodges" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {accommodations.map(place => (
            <div key={place.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
              
              <div className="relative">
                <ImageCarousel images={place.images} onOpenGallery={() => openGallery(place)} />
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gray-900/95 backdrop-blur-sm text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                    {place.type}
                  </span>
                </div>
                <button onClick={() => openGallery(place)} className="absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-black/80 transition-colors uppercase tracking-wider">
                  <i className="fas fa-camera text-[10px]"></i> View Photos
                </button>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-serif font-bold text-gray-900 line-clamp-1">{place.name}</h3>
                    <span className="text-gray-900 font-bold text-[10px] tracking-wider bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-md shrink-0">
                      {place.priceRange}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={place.rating} />
                    <span className="text-[11px] text-gray-500 font-medium">({place.reviewCount} reviews)</span>
                  </div>

                  <div className="flex items-center text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-3">
                    <i className="fas fa-map-marker-alt text-[#E8A020] mr-1.5"></i>Prieska, Northern Cape
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed font-medium mb-4 line-clamp-2">{place.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-5">
                    {place.features?.slice(0, 4).map((feat, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-md">
                        <i className="fas fa-check text-[#E8A020] text-[8px]"></i>{feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Comm Channel Rows */}
                  <div className="flex gap-2 mb-2">
                    <button onClick={() => window.location.href=`tel:${place.contact}`} className="flex-1 border border-gray-200 text-gray-800 hover:bg-gray-50 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest flex justify-center items-center gap-1.5 transition-colors">
                      <i className="fas fa-phone-alt text-[9px]"></i> Call
                    </button>
                    <button onClick={() => openWhatsApp(place.whatsapp)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-[10px] font-black uppercase tracking-widest flex justify-center items-center gap-1.5 transition-all shadow-xs">
                      <i className="fab fa-whatsapp text-sm"></i> WhatsApp
                    </button>
                  </div>

                  {/* Primary Call to Action Controls */}
                  <button onClick={() => openBooking(place)} className="w-full bg-[#E8A020] hover:bg-gray-900 text-white py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all shadow-sm duration-300 mb-2">
                    <i className="fas fa-calendar-check mr-1.5"></i> Book Securely
                  </button>

                  {/* Utility Sub-actions Grouped together */}
                  <div className="grid grid-cols-2 gap-1.5 mb-2">
                    <button onClick={() => getDirections(place.name)} className="border border-gray-100 hover:border-gray-300 text-gray-600 py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-colors">
                      <i className="fas fa-location-arrow mr-1 text-gray-400"></i> Directions
                    </button>
                    <button onClick={() => toggleReviews(place.id)} className="border border-gray-100 hover:border-gray-300 text-gray-600 py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-colors">
                      <i className="fas fa-star mr-1 text-gray-400"></i> Reviews ({place.reviewCount})
                    </button>
                  </div>

                  {/* Review Context Display Panels */}
                  {visibleReviews[place.id] && (
                    <div className="my-3 space-y-2 max-h-40 overflow-y-auto pr-1 scrollbar-none transition-all">
                      {place.reviews?.length ? place.reviews.map(r => (
                        <div key={r.id} className="bg-gray-50 p-3 rounded-lg border-l-2 border-[#E8A020]">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-bold text-gray-900">{r.user}</span>
                            <StarRating rating={r.rating} size="2.5" />
                          </div>
                          <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{r.text}</p>
                          <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider mt-1">{r.date}</p>
                        </div>
                      )) : <p className="text-center text-[10px] text-gray-400 font-bold py-2">No reviews yet.</p>}
                    </div>
                  )}

                  <button onClick={() => openReview(place)} className="w-full border border-dashed border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-400 py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all">
                    <i className="fas fa-pen-nib mr-1"></i> Write a Guest Review
                  </button>

                  <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-100">
                    <span className="text-[10px] text-gray-400 font-bold"><i className="fas fa-phone text-[8px] mr-1"></i>{place.contact}</span>
                    <div className="flex gap-2.5">
                      {place.facebook && <a href={place.facebook} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors text-xs"><i className="fab fa-facebook-f"></i></a>}
                      {place.instagram && <a href={place.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors text-xs"><i className="fab fa-instagram"></i></a>}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        <GalleryModal isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} images={selectedAccommodation?.images || []} title={selectedAccommodation?.name || ''} />
        <AddReviewModal isOpen={reviewOpen} onClose={() => setReviewOpen(false)} accommodation={selectedAccommodation} />
        <AccommodationBookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} guesthouse={selectedAccommodation} />
      </div>
    </>
  );
};

export default Accommodation;