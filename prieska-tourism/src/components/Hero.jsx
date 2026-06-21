import { useState, useEffect, useRef } from 'react';
import BookingModal from './BookingModal';
import { getExperiences, getAccommodations } from '../services/dataService';

const Hero = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Hardcoded route & tag labels for search suggestions
  const routes = [
    'Heritage Route',
    'Orange River Route',
    'Adventure Route',
    'Agricultural Route',
    'Dark Sky Route',
    'Self-Drive Discovery',
  ];

  // Combined data for search
  const getAllSearchableItems = () => {
    const experiences = getExperiences();
    const accommodations = getAccommodations();
    const items = [];

    // Add experiences with type label
    experiences.forEach(exp => {
      items.push({
        label: exp.title,
        type: 'experience',
        category: exp.category,
        id: exp.id,
      });
    });

    // Add accommodations
    accommodations.forEach(acc => {
      items.push({
        label: acc.name,
        type: 'accommodation',
        id: acc.id,
      });
    });

    // Add routes
    routes.forEach(route => {
      items.push({
        label: route,
        type: 'route',
      });
    });

    return items;
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const allItems = getAllSearchableItems();
    const filtered = allItems.filter(item =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 6)); // Limit to 6 suggestions
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (item) => {
    setSearchQuery(item.label);
    setShowSuggestions(false);
    // Scroll to experiences section
    const target = document.getElementById('experiences');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreClick = () => {
    // If there's a search query, find the first matching item and scroll to its section
    if (searchQuery.trim()) {
      const allItems = getAllSearchableItems();
      const match = allItems.find(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (match) {
        // Scroll to the relevant section based on type
        const targetId = match.type === 'accommodation' ? 'accommodation' : 'experiences';
        const target = document.getElementById(targetId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    // Default: scroll to experiences
    const target = document.getElementById('experiences');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative h-screen min-h-[780px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/orange_river.jpg')" }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pt-24">
          <div className="max-w-4xl text-white">
            
            <p className="text-[#E8A020] tracking-[0.25em] text-[11px] font-black mb-4 uppercase flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#E8A020]"></span> Northern Cape, South Africa
            </p>
            
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.1] mb-6 tracking-tight">
              Where the <span className="italic font-light text-amber-100">Karoo</span> <br className="hidden sm:inline" />Meets the Sky
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-white/80 font-medium max-w-2xl mb-12 leading-relaxed tracking-wide">
              Discover Siyathemba — ancient desert landscapes, endless star-filled night skies, and the winding lifeblood path of the mighty Orange River.
            </p>

            {/* Search Panel */}
            <div className="bg-white rounded-xl md:rounded-full p-2 max-w-3xl w-full shadow-2xl flex flex-col md:flex-row items-stretch gap-2 border border-gray-100 relative" ref={searchRef}>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-1 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                
                <div className="flex flex-col justify-center px-4 py-2 sm:py-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">What are you seeking?</label>
                  <select className="border-none bg-transparent font-bold text-gray-900 text-xs uppercase tracking-wider outline-none cursor-pointer w-full p-0 focus:ring-0">
                    <option>All Experiences</option>
                    <option>Accommodation</option>
                    <option>Adventures & Activities</option>
                    <option>Restaurants & Food</option>
                    <option>Heritage & Culture</option>
                  </select>
                </div>

                <div className="flex flex-col justify-center px-4 py-2 sm:py-1 relative">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Location / Attraction</label>
                  <input
                    type="text"
                    placeholder="Search lodges, routes, activities..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onFocus={() => searchQuery.trim().length > 0 && setShowSuggestions(true)}
                    className="border-none bg-transparent text-xs outline-none text-gray-900 placeholder-gray-400 font-bold uppercase tracking-wider w-full p-0 focus:ring-0"
                  />
                </div>
              </div>
              
              <button 
                onClick={handleExploreClick}
                className="bg-gray-900 hover:bg-[#E8A020] text-white font-bold px-8 py-4 md:py-3 rounded-lg md:rounded-full transition-all duration-300 text-xs uppercase tracking-widest whitespace-nowrap flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Explore Now</span>
                <i className="fas fa-arrow-right text-[10px]"></i>
              </button>

              {/* Autocomplete Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  {suggestions.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSuggestionClick(item)}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between border-b border-gray-50 last:border-0"
                    >
                      <div>
                        <div className="text-sm font-bold text-gray-900">{item.label}</div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                          {item.type === 'experience' ? `Experience · ${item.category || ''}` :
                           item.type === 'accommodation' ? 'Accommodation' : 'Tourism Route'}
                        </div>
                      </div>
                      <i className="fas fa-arrow-right text-gray-300 text-xs"></i>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Popular Tags */}
            <div className="hidden sm:flex flex-wrap gap-2 mt-8 items-center">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-black mr-2">Popular:</span>
              {[ 
                { icon: 'fa-star', label: 'Stargazing' }, 
                { icon: 'fa-water', label: 'Orange River' }, 
                { icon: 'fa-campground', label: 'Camping' }, 
                { icon: 'fa-landmark', label: 'Heritage Routes' }
              ].map(tag => (
                <span
                  key={tag.label}
                  className="text-[11px] font-bold uppercase tracking-wider text-white bg-white/10 border border-white/10 rounded-full px-4 py-1.5 cursor-pointer hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
                  onClick={() => {
                    setSearchQuery(tag.label);
                    handleExploreClick();
                  }}
                >
                  <i className={`fas ${tag.icon} text-[#E8A020] text-[9px]`}></i> {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
          <span className="text-[9px] text-white/50 uppercase tracking-[0.2em] font-black">Scroll to Explore</span>
          <div className="w-5 h-8 border border-white/20 rounded-full relative flex justify-center p-1">
            <div className="w-1 h-1.5 bg-[#E8A020] rounded-full animate-scrolldot"></div>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

export default Hero;