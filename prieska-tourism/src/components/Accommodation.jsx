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
        <svg key={star} className={`${sizeClass} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
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
  const goToSlide = (idx) => setCurrentIndex(idx);
  const next = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % images.length); };
  const prev = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + images.length) % images.length); };
  if (!images?.length) return <div className="relative h-52 bg-gray-200 flex items-center justify-center">No images</div>;
  return (
    <div className="relative h-52 overflow-hidden cursor-pointer group/carousel" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={onOpenGallery}>
      <img src={images[currentIndex]} alt="Slide" className="w-full h-full object-cover transition-transform duration-500 group-hover/carousel:scale-105" />
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover/carousel:opacity-100 transition">‹</button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover/carousel:opacity-100 transition">›</button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => <button key={idx} onClick={(e) => { e.stopPropagation(); goToSlide(idx); }} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-amber-400 w-3' : 'bg-white/60'}`} />)}
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

  if (loading) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">Loading...</div>;

  return (
    <>
      <div id="accommodation" className="container mx-auto px-6 py-20">
        <SectionTitle subtitle="STAY IN COMFORT" title="Prieska Guesthouses & Lodges" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accommodations.map(place => (
            <div key={place.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="relative">
                <ImageCarousel images={place.images} onOpenGallery={() => openGallery(place)} />
                <div className="absolute top-4 left-4 z-10"><span className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">{place.type}</span></div>
                <button onClick={() => openGallery(place)} className="absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-black/80 transition">
                  <i className="fas fa-camera"></i> View Photos
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between mb-3"><h3 className="text-xl font-serif font-bold text-[#2C3E2F] group-hover:text-[#B87333] transition">{place.name}</h3><span className="text-amber-600 font-semibold text-xs bg-amber-50 px-2 py-1 rounded-full">{place.priceRange}</span></div>
                <div className="flex items-center gap-2 mb-3"><StarRating rating={place.rating} /><span className="text-xs text-gray-500">{place.rating} ({place.reviewCount} reviews)</span></div>
                <div className="flex items-center text-gray-500 text-xs mb-3"><i className="fas fa-map-marker-alt text-amber-500 mr-1.5"></i>Prieska, Northern Cape</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{place.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {place.features?.slice(0,4).map((feat,i) => <span key={i} className="inline-flex items-center gap-1 text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-full"><i className="fas fa-check-circle text-amber-500 text-[8px]"></i>{feat}</span>)}
                  {place.features?.length > 4 && <span className="text-[10px] text-gray-400">+{place.features.length-4} more</span>}
                </div>
                <div className="flex gap-2 mb-3">
                  <button onClick={() => window.location.href=`tel:${place.contact}`} className="flex-1 border border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white py-2 rounded-xl text-xs font-medium flex justify-center items-center gap-1"><i className="fas fa-phone-alt"></i>Call</button>
                  <button onClick={() => openWhatsApp(place.whatsapp)} className="flex-1 bg-green-600 text-white hover:bg-green-700 py-2 rounded-xl text-xs font-medium flex justify-center items-center gap-1"><i className="fab fa-whatsapp"></i>WhatsApp</button>
                </div>
                <button onClick={() => getDirections(place.name)} className="w-full border border-blue-500 text-blue-600 py-2 rounded-xl text-xs font-medium hover:bg-blue-50 transition mb-2">
                  <i className="fas fa-location-dot"></i> Get Directions
                </button>
                <button onClick={() => openBooking(place)} className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition mb-2">
                  <i className="fas fa-calendar-check"></i> Book Now
                </button>
                <button onClick={() => toggleReviews(place.id)} className="w-full border border-gray-300 text-gray-600 py-2 rounded-xl text-xs font-medium hover:border-amber-400 hover:text-amber-600 transition mb-2">
                  <i className="fas fa-star"></i> View Reviews ({place.reviewCount})
                </button>
                {visibleReviews[place.id] && (
                  <div className="mb-3 space-y-2">
                    {place.reviews?.length ? place.reviews.map(r => <div key={r.id} className="bg-gray-50 p-3 rounded-lg border-l-2 border-amber-400"><div className="flex justify-between"><span className="text-xs font-semibold">{r.user}</span><StarRating rating={r.rating} size="2.5" /></div><p className="text-[10px] mt-1 text-gray-600">{r.text}</p><p className="text-[8px] text-gray-400 mt-1">{r.date}</p></div>) : <p className="text-center text-[10px] text-gray-500">No reviews yet.</p>}
                  </div>
                )}
                <button onClick={() => openReview(place)} className="w-full border border-dashed border-gray-300 text-gray-500 py-2 rounded-xl text-xs font-medium hover:border-amber-400 hover:text-amber-600 transition mb-2">
                  <i className="fas fa-pen"></i> Write a Review
                </button>
                <div className="flex justify-between items-center pt-3 border-t"><span className="text-[10px] text-gray-400"><i className="fas fa-phone-alt mr-1"></i>{place.contact}</span><div className="flex gap-2">{place.facebook && <a href={place.facebook} className="text-gray-400 hover:text-blue-600"><i className="fab fa-facebook-f"></i></a>}{place.instagram && <a href={place.instagram} className="text-gray-400 hover:text-pink-600"><i className="fab fa-instagram"></i></a>}</div></div>
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