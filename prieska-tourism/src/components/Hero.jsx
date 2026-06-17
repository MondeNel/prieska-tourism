import { useState, useEffect } from 'react';
import BookingModal from './BookingModal';

const Hero = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All Experiences');

  // Star generation for background
  useEffect(() => {
    const container = document.getElementById('stars-container');
    if (container) {
      container.innerHTML = '';
      for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 80}%;
          animation-delay: ${Math.random() * 4}s;
          animation-duration: ${2 + Math.random() * 3}s;
        `;
        container.appendChild(star);
      }
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for "${searchQuery}" in category "${searchCategory}"`);
    // Later this will trigger a search results page or filter experiences
  };

  return (
    <>
      <div className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Sky background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A] via-[#1A2540] to-[#3D4F7A]"></div>
        
        {/* River */}
        <div className="absolute bottom-[38%] left-0 right-0 h-[14%] bg-gradient-to-b from-[#3C64A0]/70 via-[#28508C]/85 to-[#1E3C6E]/60"></div>
        
        {/* Land */}
        <div className="absolute bottom-0 left-0 right-0 h-[48%] bg-gradient-to-b from-[#8B4A20] via-[#6B3010] to-[#4A1E08]"></div>
        
        {/* Stars container */}
        <div id="stars-container" className="absolute top-0 left-0 right-0 h-[55%]"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <div className="max-w-3xl">
            <p className="text-[#E8A020] tracking-wider text-sm font-semibold mb-3 uppercase flex items-center justify-center gap-2">
              <i className="fas fa-location-dot"></i> 
              <span>NORTHERN CAPE, SOUTH AFRICA</span>
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-white mb-4">
              Where the <span className="text-[#E8A020]">Karoo</span><br className="hidden sm:block" /> Meets the Sky
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
              Discover Siyathemba — ancient landscapes, endless stars, and the mighty Orange River
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col sm:flex-row max-w-2xl mx-auto">
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full sm:w-auto px-4 py-3 bg-[#FBF6EE] border-r border-gray-200 text-sm font-semibold text-[#7A3215] outline-none cursor-pointer"
              >
                <option>All Experiences</option>
                <option>Accommodation</option>
                <option>Adventures</option>
                <option>Restaurants</option>
                <option>Heritage</option>
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search attractions, lodges, activities…"
                className="flex-1 px-4 py-3 text-sm outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#7A3215] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#7A3215]/80 transition"
              >
                <i className="fas fa-search mr-2"></i> Search
              </button>
            </form>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {['⭐ Stargazing', '🌊 Orange River', '🏕 Camping', '🦌 Hunting', '🏛 Heritage', '🚗 Self-Drive'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold text-white/70 bg-white/10 border border-white/20 rounded-full px-3 py-1 cursor-pointer hover:bg-white/20 hover:text-white transition"
                  onClick={() => setSearchQuery(tag.replace(/[^\w\s]/g, '').trim())}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Explore</span>
          <div className="w-[2px] h-6 bg-white/20 rounded relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#E8A020] animate-scroll-dot"></div>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

export default Hero;