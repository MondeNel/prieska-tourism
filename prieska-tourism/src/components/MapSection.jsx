import InteractiveMap from './InteractiveMap';

const MapSection = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-6">
        <div className="text-[#C8780A] text-xs font-bold uppercase tracking-widest">Explore the Region</div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1F2E]">Interactive Map</h2>
      </div>

      <InteractiveMap />

      {/* Route Tags (unchanged) */}
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