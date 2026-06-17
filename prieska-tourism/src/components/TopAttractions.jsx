import { useState } from 'react';

const TopAttractions = () => {
  const [activeRegion, setActiveRegion] = useState('all');

  const regions = [
    { id: 'all', label: 'All Siyathemba' },
    { id: 'prieska', label: 'Prieska Hub' },
    { id: 'river', label: 'Orange River Bank' },
    { id: 'karoo', label: 'Upper Karoo Hinterland' }
  ];

const attractions = [
  {
    id: 1,
    title: "Prieska Koppie British Fort",
    region: "prieska",
    category: "Heritage & History",
    // Added your direct image link here:
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpDfeOiFWV3FjXFMlZD2Um268zvdSC9XsI6w&s",
    description: "A completely unique stone fort built entirely out of glittering semi-precious Tiger's Eye stone by British soldiers during the Anglo-Boer War.",
    tag: "Historic Landmark"
  },
 {
    id: 2,
    title: "The Wonderdraai Horseshoe Island",
    region: "river",
    category: "Natural Wonder",
    image: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTfZGsP49n_Nbs0sP1LycXhSv-AogXiW2OD98uaEyMitgESU0R7BGCLinj6EoBHb3dupMvBeVjyb1x3nhM",
    description: "An incredible geological phenomenon where the mighty Orange River forms a massive U-turn around an island, making the waters look like they run uphill.",
    tag: "Must-See Vista"
  },
  {
    id: 3,
    title: "Die Bos Nature Reserve",
    region: "river",
    category: "Eco & Adventure",
    image: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRSzusAhGaGUNyjk2Jmh4J-JemuEiU4gCiW0v42yP4sFf8pngx84LFu9ZRv7oqxIRWZu4W86piem1YstG4",
    description: "Lush green oasis with suspended footbridges arching over the water, packed with abundant endemic birdlife and pristine angling riverbanks.",
    tag: "Nature Walk"
  },
  {
    id: 4,
    title: "The Succulent Rock Garden Route",
    region: "karoo",
    category: "Floral Kingdom",
    image: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRz3jP_geoOw5HIzTvNRcpoR-Q08VWOj2pAq8fnP7ZO_mPUASmlUkGxKAZ5nuiK9_XwPfFzSidgIewEOEI",
    description: "Explore the arid plains between Prieska and the frontier to spot incredibly rare, protected floral marvels including 'Halfmens' and Lithops stone plants.",
    tag: "Botanical Tour"
  }
];

  const filteredAttractions = activeRegion === 'all' 
    ? attractions 
    : attractions.filter(item => item.region === activeRegion);

  return (
    <section className="bg-white py-16 sm:py-24 px-6 border-b border-gray-100" id="places">
      <div className="container mx-auto max-w-7xl">
        
        {/* Editorial Content Header matching Cape Town Strategy Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <span className="text-[#E8A020] text-xs font-bold uppercase tracking-widest block mb-2">Inspirational Highlights</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#1A1F2E] leading-tight tracking-tight">
              Siyathemba's Iconic <br />Pocket Attractions
            </h2>
          </div>
          <p className="text-gray-500 font-light text-sm sm:text-base max-w-md leading-relaxed">
            From architecture crafted entirely of semiprecious stones to ancient water loops, uncover places unique to this specific stretch of the Northern Cape.
          </p>
        </div>

        {/* Region Segment Tabs Controller */}
        <div className="flex flex-wrap gap-1.5 border-b border-gray-100 pb-4 mb-8">
          {regions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveRegion(tab.id)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                activeRegion === tab.id
                  ? 'bg-[#1A1F2E] text-white shadow-md'
                  : 'text-gray-500 hover:text-[#1A1F2E] hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Visual Responsive Grid Display Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAttractions.map((item) => (
            <div 
              key={item.id} 
              className="group relative bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-[420px] border border-gray-100"
            >
              {/* Card Thumbnail Frame */}
              <div className="relative h-48 overflow-hidden w-full bg-gray-200">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-[#1A1F2E] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {item.tag}
                </span>
              </div>

              {/* Card Meta Content Pane */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <span className="text-[10px] font-bold text-[#E8A020] uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#1A1F2E] leading-snug group-hover:text-[#E8A020] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 font-light leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <a 
                  href={`#explore-${item.id}`}
                  className="mt-4 flex items-center gap-2 text-xs font-bold text-[#1A1F2E] uppercase tracking-widest group-hover:gap-3 transition-all"
                >
                  <span>Discover More</span>
                  <i className="fas fa-arrow-right text-[10px] text-[#E8A020]"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopAttractions;