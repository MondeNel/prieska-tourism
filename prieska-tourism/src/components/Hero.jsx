import BookingModal from './BookingModal';

const Hero = () => {
  return (
    <>
      <div className="relative h-screen min-h-[750px] bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/orange_river.jpg')" }}>
        {/* Subtle, soft natural background darkening gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40"></div>
        
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pt-16">
          <div className="max-w-4xl text-white">
            
            {/* Context Breadcrumb Tag */}
            <p className="text-[#E8A020] tracking-widest text-xs font-bold mb-4 uppercase flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#E8A020]"></span> Northern Cape, South Africa
            </p>
            
            {/* Clean Serif Editorial Heading Layout */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl font-bold leading-tight mb-4 tracking-tight">
              Where the <span className="italic font-normal text-amber-100">Karoo</span> <br />Meets the Sky
            </h1>
            
            <p className="text-base md:text-xl text-white/90 font-light max-w-2xl mb-10 leading-relaxed">
              Discover Siyathemba — ancient landscapes, endless star-filled nights, and the winding path of the mighty Orange River.
            </p>

            {/* Redesigned Search Hub Panel */}
            <div className="bg-white rounded-2xl p-2 md:p-3 max-w-3xl w-full shadow-2xl flex flex-col md:flex-row items-stretch gap-2">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                
                {/* Category Selection Filter Block */}
                <div className="flex flex-col justify-center px-4 py-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">What are you seeking?</label>
                  <select className="border-none bg-transparent font-semibold text-gray-800 text-sm outline-none cursor-pointer w-full p-0 py-0.5">
                    <option>All Experiences</option>
                    <option>Accommodation</option>
                    <option>Adventures & Activities</option>
                    <option>Restaurants & Food</option>
                    <option>Heritage & Culture</option>
                  </select>
                </div>

                {/* Text search container input block */}
                <div className="flex flex-col justify-center px-4 py-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Location / Attraction</label>
                  <input
                    type="text"
                    placeholder="Search lodges, routes, activities..."
                    className="border-none bg-transparent text-sm outline-none text-[#1A1F2E] placeholder-gray-400 font-medium w-full py-0.5"
                  />
                </div>
              </div>
              
              {/* Submit CTA button trigger component */}
              <button className="bg-[#1A1F2E] hover:bg-[#E8A020] text-white font-bold px-8 py-4 rounded-xl transition duration-300 text-xs uppercase tracking-widest whitespace-nowrap flex items-center justify-center gap-2">
                <span>Explore Now</span>
                <i className="fas fa-arrow-right text-[10px]"></i>
              </button>
            </div>

            {/* Inline Micro Tag Buttons */}
            <div className="flex flex-wrap gap-2 mt-6 items-center">
              <span className="text-xs text-white/50 uppercase tracking-wider font-bold mr-2">Popular:</span>
              {[ 
                { icon: 'fa-star', label: 'Stargazing' }, 
                { icon: 'fa-water', label: 'Orange River' }, 
                { icon: 'fa-campground', label: 'Camping' }, 
                { icon: 'fa-landmark', label: 'Heritage Routes' },
                { icon: 'fa-crosshairs', label: 'Hunting Wild' } 
              ].map(tag => (
                <span key={tag.label} className="text-xs font-medium text-white bg-white/10 border border-white/15 rounded-full px-4 py-1.5 cursor-pointer hover:bg-white hover:text-[#1A1F2E] transition-all duration-300 flex items-center gap-2">
                  <i className={`fas ${tag.icon} text-amber-400 text-[10px]`}></i> {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll down mouse/dot line animation element indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[9px] text-white/60 uppercase tracking-widest font-bold">Scroll to Explore</span>
          <div className="w-5 h-8 border border-white/30 rounded-full relative flex justify-center p-1">
            <div className="w-1 h-2 bg-[#E8A020] rounded-full animate-[scrolldot_1.8s_infinite]"></div>
          </div>
        </div>

        {/* Mobile floating responsive layout view navigation anchor bar trigger */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 md:hidden">
          <a href="#accommodation" onClick={(e) => { e.preventDefault(); document.getElementById('accommodation')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full bg-[#E8A020] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-center shadow-xl block">
            <i className="fas fa-calendar-check mr-2"></i> Plan & Book Your Stay
          </a>
        </div>
      </div>

      <style>{`
        @keyframes scrolldot { 
          0% { transform: translateY(0); opacity: 1; } 
          50% { transform: translateY(6px); opacity: 0.4; }
          100% { transform: translateY(0); opacity: 1; } 
        }
      `}</style>
      <BookingModal isOpen={false} onClose={() => {}} />
    </>
  );
};

export default Hero;