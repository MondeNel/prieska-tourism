import { useState } from 'react';

const Hero = () => {
  const [checkIn, setCheckIn] = useState('');
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    alert(`Searching for ${guests} guests on ${checkIn || 'any date'}`);
  };

  return (
    <div 
      className="relative h-screen min-h-[600px] bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: "url('https://images.pexels.com/photos/1670187/pexels-photo-1670187.jpeg?auto=compress&cs=tinysrgb&w=1600')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/55 to-black/25"></div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-3xl text-white">
          <p className="text-[#E6B17E] tracking-wider text-sm font-semibold mb-3 uppercase flex items-center gap-2">
            <i className="fas fa-location-dot"></i> NORTHERN CAPE, SOUTH AFRICA
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-5">
            Where the Karoo <span className="italic text-[#E6B17E]">Breathes</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mb-8 leading-relaxed">
            Ancient land of vast skies, amber Kalahari sunsets, and untouched wilderness. 
            Every horizon tells a story millions of years in the making.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#experiences" className="bg-[#B87333] hover:bg-[#B87333]/80 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg inline-flex items-center">
              <i className="fas fa-compass mr-2"></i> Explore Experiences
            </a>
            <button className="bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 inline-flex items-center">
              <i className="fas fa-play mr-2"></i> Watch Film
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4 md:px-10 z-20">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
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
  );
};

export default Hero;