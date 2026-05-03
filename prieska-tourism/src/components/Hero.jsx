import { useState, useEffect } from 'react';
import BookingModal from './BookingModal';

const Hero = () => {
  const [checkIn, setCheckIn] = useState('');
  const [guests, setGuests] = useState(2);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Typing animation state
  const fullText = "Ancient land of vast skies, amber Kalahari sunsets, and untouched wilderness. Every horizon tells a story millions of years in the making.";
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
    }, 40); // Adjust speed here (ms per character)

    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    alert(`Searching for ${guests} guests on ${checkIn || 'any date'}`);
  };

  return (
    <>
      <div 
        className="relative h-screen min-h-[600px] bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/orange_river.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/55 to-black/25"></div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl text-white">
            <p className="text-[#E6B17E] tracking-wider text-[10px] md:text-sm font-semibold mb-2 md:mb-3 uppercase flex items-center gap-1 md:gap-2">
              <i className="fas fa-location-dot text-xs md:text-sm"></i> 
              <span>NORTHERN CAPE, SOUTH AFRICA</span>
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-3 md:mb-5">
              Where the Karoo <span className="italic text-[#E6B17E]">Breathes</span>
            </h1>
            <p className="text-sm md:text-lg text-white/90 max-w-xl mb-6 md:mb-8 leading-relaxed min-h-[100px]">
              {displayedText}
              {!isTypingComplete && (
                <span className="inline-block w-0.5 h-4 md:h-5 bg-white/70 ml-1 animate-pulse"></span>
              )}
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <a href="#experiences" className="bg-[#B87333] hover:bg-[#B87333]/80 text-white font-semibold px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 shadow-lg inline-flex items-center text-sm md:text-base">
                <i className="fas fa-compass mr-2 text-xs md:text-sm"></i> 
                Explore
              </a>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 text-white font-medium px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 inline-flex items-center text-sm md:text-base"
              >
                <i className="fas fa-calendar-check mr-2 text-xs md:text-sm"></i> 
                Book Now
              </button>
            </div>
          </div>
        </div>
        
        {/* Booking Widget - Hidden on mobile, visible on tablet/desktop */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4 md:px-10 z-20 hidden md:block">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#3D2B1A] mb-1">
                  <i className="far fa-calendar-alt mr-1"></i> CHECK IN
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#B87333] outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3D2B1A] mb-1">
                  <i className="far fa-user mr-1"></i> GUESTS
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#B87333] outline-none transition"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num}>{num} Adult{num !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3D2B1A] mb-1">
                  <i className="far fa-tag mr-1"></i> EXPERIENCE
                </label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#B87333] outline-none transition">
                  <option>All Experiences</option>
                  <option>Safari & Wildlife</option>
                  <option>Adventure & River</option>
                  <option>Culture & Heritage</option>
                </select>
              </div>
              <button
                onClick={handleSearch}
                className="bg-[#2C3E2F] hover:bg-[#2C3E2F]/80 text-white font-bold py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <i className="fas fa-search"></i> Search
              </button>
            </div>
          </div>
        </div>
        
       {/* Mobile Quick CTA - Visible only on mobile */}
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
      
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

export default Hero;