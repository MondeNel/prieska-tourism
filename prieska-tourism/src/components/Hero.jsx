import { useState, useEffect } from 'react';
import BookingModal from './BookingModal';

const Hero = () => {
  const [checkIn, setCheckIn] = useState('');
  const [guests, setGuests] = useState(2);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Typing animation state
  const fullText = "Discover Siyathemba — ancient landscapes, endless stars, and the mighty Orange River";
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsTypingComplete(true);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    alert(`Searching for ${guests} guests on ${checkIn || 'any date'}`);
  };

  return (
    <>
      <div 
        className="relative h-screen min-h-[600px] bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: "url('/orange_river.jpg')",
        }}
      >
        {/* Dark gradient overlay to simulate the prototype's sky/land blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl text-white">
            <p className="text-[#E8A020] tracking-wider text-[10px] md:text-sm font-semibold mb-2 md:mb-3 uppercase flex items-center gap-1 md:gap-2">
              <i className="fas fa-location-dot text-xs md:text-sm"></i> 
              <span>NORTHERN CAPE, SOUTH AFRICA</span>
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-3 md:mb-5">
              Where the <span className="italic text-[#E8A020]">Karoo</span><br className="hidden sm:block" /> Meets the Sky
            </h1>
            <p className="text-sm md:text-lg text-white/90 max-w-xl mb-6 md:mb-8 leading-relaxed min-h-[60px]">
              {displayedText}
              {!isTypingComplete && (
                <span className="inline-block w-0.5 h-4 md:h-5 bg-white/70 ml-1 animate-pulse"></span>
              )}
            </p>

            {/* Search Bar – matching the prototype */}
            <div className="bg-white rounded-lg flex items-center gap-0 max-w-xl w-full shadow-lg overflow-hidden">
              <select className="border-none bg-[#F2E8D5] font-bold text-[#7A3215] text-sm px-4 py-3 outline-none cursor-pointer min-w-[140px]">
                <option>All Experiences</option>
                <option>Accommodation</option>
                <option>Adventures</option>
                <option>Restaurants</option>
                <option>Heritage</option>
              </select>
              <input
                type="text"
                placeholder="Search attractions, lodges, activities…"
                className="flex-1 border-none px-4 py-3 text-sm outline-none text-[#1A1F2E]"
              />
              <button
                onClick={handleSearch}
                className="bg-[#7A3215] text-white font-bold px-5 py-3 hover:bg-[#7A3215]/80 transition text-sm uppercase tracking-wider whitespace-nowrap"
              >
                Search
              </button>
            </div>

            {/* Tags – matching the prototype */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['⭐ Stargazing', '🌊 Orange River', '🏕 Camping', '🦌 Hunting', '🏛 Heritage', '🚗 Self-Drive'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-bold text-white/80 bg-white/10 border border-white/20 rounded-full px-3 py-1 cursor-pointer hover:bg-white/20 hover:text-white transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-1">
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Explore</span>
          <div className="w-0.5 h-6 bg-white/20 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#E8A020] animate-[scrolldot_2s_infinite]"></div>
          </div>
        </div>

        {/* Mobile Quick CTA – visible only on mobile */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 z-20 md:hidden">
          <a
            href="#accommodation"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('accommodation')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 text-sm"
          >
            <i className="fas fa-calendar-check"></i>
            Book Your Stay Now
          </a>
        </div>
      </div>

      {/* Add keyframes for scroll dot animation */}
      <style jsx>{`
        @keyframes scrolldot {
          0% { top: -50%; }
          100% { top: 120%; }
        }
      `}</style>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

export default Hero;