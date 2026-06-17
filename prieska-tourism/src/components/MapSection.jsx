const MapSection = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-6">
        <div className="text-[#C8780A] text-xs font-bold uppercase tracking-widest">Explore the Region</div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1F2E]">Interactive Map</h2>
      </div>

      <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-[#C8D8B8] to-[#A8C898] h-[260px]">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #666 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* River line */}
        <div className="absolute top-[58%] left-0 right-0 h-5 bg-[rgba(60,120,200,0.45)] rounded-sm transform -rotate-[2deg]"></div>
        
        {/* Main pins with labels */}
        <div className="absolute" style={{ left: '30%', top: '40%' }}>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full border-2 border-white bg-[#7A3215]"></div>
            <span className="text-[9px] font-bold text-[#1A1F2E] bg-white px-1.5 py-0.5 rounded mt-1 whitespace-nowrap uppercase">Prieska</span>
          </div>
        </div>
        <div className="absolute" style={{ left: '18%', top: '55%' }}>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full border-2 border-white bg-[#C8780A]"></div>
            <span className="text-[9px] font-bold text-[#1A1F2E] bg-white px-1.5 py-0.5 rounded mt-1 whitespace-nowrap uppercase">Marydale</span>
          </div>
        </div>
        <div className="absolute" style={{ left: '44%', top: '50%' }}>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full border-2 border-white bg-[#1A1F2E]"></div>
            <span className="text-[9px] font-bold text-[#1A1F2E] bg-white px-1.5 py-0.5 rounded mt-1 whitespace-nowrap uppercase">Niekerkshoop</span>
          </div>
        </div>
        {/* Smaller pins */}
        <div className="absolute" style={{ left: '27%', top: '62%' }}>
          <div className="w-2 h-2 rounded-full border-2 border-white bg-[#7A3215]"></div>
        </div>
        <div className="absolute" style={{ left: '36%', top: '30%' }}>
          <div className="w-2 h-2 rounded-full border-2 border-white bg-[#C8780A]"></div>
        </div>
        <div className="absolute" style={{ left: '52%', top: '38%' }}>
          <div className="w-2 h-2 rounded-full border-2 border-white bg-[#1A1F2E]"></div>
        </div>

        {/* Legend Overlay */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 min-w-[140px]">
          <div className="font-serif text-sm font-bold text-[#1A1F2E] mb-2">Map Layers</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#5A4A3A]">
              <div className="w-2 h-2 rounded-full bg-[#7A3215]"></div>
              Attractions
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#5A4A3A]">
              <div className="w-2 h-2 rounded-full bg-[#C8780A]"></div>
              Accommodation
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#5A4A3A]">
              <div className="w-2 h-2 rounded-full bg-[#1A1F2E]"></div>
              Adventures
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#5A4A3A]">
              <div className="w-2 h-2 rounded-full bg-[rgba(60,120,200,0.7)]"></div>
              Orange River
            </div>
          </div>
          <button className="mt-3 w-full bg-[#7A3215] text-white font-bold text-xs py-1.5 rounded hover:bg-[#7A3215]/80 transition">
            <i className="fas fa-map mr-1"></i> Open Full Map
          </button>
        </div>
      </div>

      {/* Route Tags */}
      <div className="mt-5">
        <div className="text-[#C8780A] text-xs font-bold uppercase tracking-widest mb-3">Tourism Routes</div>
        <div className="flex flex-wrap gap-2">
          {[
            { icon: 'fa-landmark', label: 'Heritage Route' },
            { icon: 'fa-sailboat', label: 'Orange River Route' },
            { icon: 'fa-fire', label: 'Adventure Route' },
            { icon: 'fa-seedling', label: 'Agricultural Route' },
            { icon: 'fa-star', label: 'Dark Sky Route' },
            { icon: 'fa-car', label: 'Self-Drive Discovery' },
          ].map((route, idx) => (
            <button
              key={idx}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1F2E] border border-[rgba(255,255,255,0.14)] rounded text-xs font-bold text-white/80 uppercase tracking-wider hover:bg-[#1A1F2E]/80 transition"
            >
              <i className={`fas ${route.icon} text-[#E8A020]`}></i>
              {route.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapSection;