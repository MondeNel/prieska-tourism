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
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 border-b border-gray-100" id="places">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Content Header matching Cape Town Strategy Layout */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#E8A020] text-[11px] font-black uppercase tracking-[0.2em] block mb-3">Inspirational Highlights</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-gray-900 leading-[1.15] tracking-tight">
              Siyathemba's Iconic <br className="hidden sm:inline" />Pocket Attractions
            </h2>
          </div>
          <p className="text-gray-500 font-medium text-xs sm:text-sm max-w-md leading-relaxed tracking-wide">
            From architecture crafted entirely of semiprecious stones to ancient legendary river loops, uncover landmarks unique to this stretch of the Northern Cape wilderness.
          </p>
        </div>

        {/* Region Segment Tabs Controller */}
        <div className="flex items-center gap-1.5 border-b border-gray-150 pb-4 mb-10 overflow-x-auto scrollbar-none whitespace-nowrap">
          {regions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveRegion(tab.id)}
              className={`px-5 py-2.5 rounded-full font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 focus:outline-none ${
                activeRegion === tab.id
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Visual Responsive Grid Display Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAttractions.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
            >
              {/* Card Thumbnail Frame - Aspect-video scales optimally */}
              <div className="relative aspect-[4/3] overflow-hidden w-full bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                  {item.tag}
                </span>
              </div>

              {/* Card Meta Content Pane - Flex Grow ensures even distribution */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div className="mb-6">
                  <span className="text-[9px] font-black text-[#E8A020] uppercase tracking-widest block mb-1.5">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-gray-900 leading-snug group-hover:text-[#E8A020] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2.5 font-medium leading-relaxed tracking-wide line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <a 
                  href={`#explore-${item.id}`}
                  className="flex items-center gap-2 text-[11px] font-black text-gray-900 uppercase tracking-widest group-hover:gap-3 transition-all mt-auto"
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