import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Comprehensive image-rich data architecture mirroring premium tourism indices
  const megaMenuData = {
    places: {
      title: "Top Regional Hubs",
      items: [
        { name: "Prieska Hub", desc: "Historical town British Fort, built with Tiger's Eye stones", img: "https://images.unsplash.com/photo-1590055531615-f16d36faa8ec?auto=format&fit=crop&w=400&q=80" },
        { name: "Wonderdraai Wonder", desc: "The unique Orange River Horseshoe Bend at Wonderdraai", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
        { name: "Marydale Plains", desc: "Historic Karoo farmhouse, gateway to the wider desert trails", img: "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=400&q=80" },
        { name: "Niekerkshoop Frontier", desc: "Traditional gemstone mining country and rural agricultural heritage", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    stay: {
      title: "Premium Lodging",
      items: [
        { name: "River Lodges", desc: "Stunning boutique escapes built right along the Orange River banks", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80" },
        { name: "Karoo Farm Stays", desc: "Authentic, rustic country living under clear open skies", img: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&w=400&q=80" },
        { name: "Boutique Guesthouses", desc: "Impeccable town comfort featuring renowned Northern Cape hospitality", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80" },
        { name: "Self-Catering Chalets", desc: "Independent, fully equipped family-friendly base camps", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    todo: {
      title: "Recommended Experiences",
      items: [
        { name: "Orange River Rafting", desc: "Navigate deep wilderness water pathways and rapid systems", img: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=400&q=80" },
        { name: "Dark Sky Stargazing", desc: "Unmatched cosmic clarity deep inside the pristine Karoo landscape", img: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=400&q=80" },
        { name: "San Rock Art Heritage", desc: "Guided educational hikes exploring ancient indigenous structural art", img: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=400&q=80" },
        { name: "Desert Game Trails", desc: "Track resilient local wildlife through protected plains reserves", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    plan: {
      title: "Visitor Resources",
      items: [
        { name: "Interactive Mapping", desc: "Plot routing links across Prieska and secondary corridors", img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80" },
        { name: "Curated Itineraries", desc: "All-inclusive route packages built to cover optimal ground", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80" },
        { name: "Digital Brochure Guide", desc: "Download offline-ready information books regarding landmarks", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80" },
        { name: "Municipal Support", desc: "Get direct phone guidance from regional info specialists", img: "https://images.unsplash.com/photo-1521791136366-3e347677deaf?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    travelwise: {
      title: "Essential Information",
      items: [
        { name: "Best Time to Visit", desc: "Track hot summer river seasons vs crisp desert winter stargazing", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80" },
        { name: "Road Safety Conditions", desc: "Crucial local guidelines for tar roads vs remote gravel paths", img: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=400&q=80" },
        { name: "Emergency Infrastructure", desc: "Quick access map routing for clinics, banking hubs, and fuel depots", img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80" }
      ]
    }
  };

  const navLinks = [
    { label: 'Places to Go', key: 'places' },
    { label: 'Where to Stay', key: 'stay' },
    { label: 'Things to Do', key: 'todo' },
    { label: 'Plan Your Trip', key: 'plan' },
    { label: 'Travelwise', key: 'travelwise' },
  ];

  return (
    <>
      {/* Global Navigation Wrapper Frame */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 lg:bg-white/90 backdrop-blur-md py-5'
        }`}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-center relative">
          
          {/* Logo element */}
          <a href="#" className="tracking-[0.2em] select-none shrink-0 mr-8">
            <span className="font-sans text-sm sm:text-base font-black text-gray-900">
              SIYATHEMBA<span className="text-[#E8A020] font-light">TOURISM</span>
            </span>
          </a>

          {/* Desktop Links with extra spaced gaps */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-9 justify-center flex-1">
            {navLinks.map((link) => (
              <div 
                key={link.key}
                className="py-2"
                onMouseEnter={() => setActiveDropdown(link.key)}
              >
                <button className="flex items-center gap-1.5 text-[10.5px] font-black uppercase tracking-[0.18em] text-gray-800 hover:text-[#E8A020] transition-colors focus:outline-hidden whitespace-nowrap cursor-pointer">
                  <span>{link.label}</span>
                  <i className={`fas fa-chevron-down text-[8px] text-gray-400 group-hover:text-[#E8A020] transition-transform duration-200 ${activeDropdown === link.key ? 'rotate-180 text-[#E8A020]' : ''}`}></i>
                </button>
              </div>
            ))}
            
            <a 
              href="#business" 
              className="text-[10.5px] font-black uppercase tracking-[0.18em] text-gray-500 hover:text-[#E8A020] transition-colors whitespace-nowrap"
            >
              List Your Business
            </a>
          </div>

          {/* Fixed soft-edged layout CTA Button */}
          <div className="hidden lg:block shrink-0 ml-6">
            <button className="bg-[#E8A020] hover:bg-gray-900 text-white font-black text-[10px] tracking-widest uppercase px-7 py-3.5 rounded-lg transition-all duration-300 shadow-xs cursor-pointer">
              Book Now
            </button>
          </div>

          {/* Mobile Navigation Toggler */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-hidden"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          {/* CAPE TOWN STYLE IMAGED FULL-WIDTH MEGA DROPDOWN PANEL BLOCK */}
          <div className={`absolute left-6 right-6 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-6 transition-all duration-300 origin-top transform z-50 hidden lg:block ${
            activeDropdown ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
          }`}>
            {activeDropdown && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-50 pb-2">
                  {megaMenuData[activeDropdown].title}
                </h3>
                <div className="grid grid-cols-4 gap-5">
                  {megaMenuData[activeDropdown].items.map((item) => (
                    <a 
                      key={item.name} 
                      href={`#${activeDropdown}`}
                      className="group/card block rounded-lg overflow-hidden border border-transparent hover:border-gray-50 transition-all hover:shadow-xs"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100 mb-2.5 relative">
                        <img 
                          src={item.img} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div className="text-xs font-bold text-gray-900 group-hover/card:text-[#E8A020] transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5 leading-relaxed font-medium">
                        {item.desc}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* Slide-out Mobile Right Side Drawer Panel Frame */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-[#1A1F2E]/40 backdrop-blur-xs transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />

        <div className={`absolute top-0 right-0 bottom-0 w-full sm:w-[380px] bg-white shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`} style={{ height: '100dvh' }}>
          
          <div className="overflow-y-auto flex-grow pt-16 space-y-6 custom-scrollbar">
            <div className="tracking-[0.15em] pb-2 border-b border-gray-50">
              <span className="font-sans text-xs font-black text-gray-900">
                SIYATHEMBA<span className="text-[#E8A020] font-light">TOURISM</span>
              </span>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => {
                const isCurrentActive = activeDropdown === link.key;
                return (
                  <div key={link.key} className="border-b border-gray-50 pb-1">
                    <button 
                      onClick={() => setActiveDropdown(isCurrentActive ? null : link.key)}
                      className="w-full flex justify-between items-center py-3.5 text-xs font-black uppercase tracking-wider text-gray-800 hover:text-[#E8A020] transition-colors text-left"
                    >
                      <span>{link.label}</span>
                      <i className={`fas fa-chevron-down text-[10px] text-gray-400 transition-transform duration-200 ${isCurrentActive ? 'rotate-180 text-[#E8A020]' : ''}`}></i>
                    </button>
                    
                    <div className={`grid transition-all duration-300 ease-in-out bg-gray-50/50 rounded-lg overflow-hidden ${
                      isCurrentActive ? 'grid-rows-[1fr] opacity-100 my-1 p-2' : 'grid-rows-[0fr] opacity-0'
                    }`}>
                      <div className="overflow-hidden space-y-4">
                        {megaMenuData[link.key]?.items.map((subItem) => (
                          <a 
                            key={subItem.name} 
                            href={`#${link.key}`}
                            onClick={() => { setIsOpen(false); setActiveDropdown(null); }}
                            className="flex gap-3 items-start"
                          >
                            <img src={subItem.img} alt="" className="w-12 h-12 rounded-md object-cover shrink-0 bg-gray-100" />
                            <div>
                              <div className="text-xs font-bold text-gray-800">{subItem.name}</div>
                              <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">{subItem.desc}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-2.5 bg-white shrink-0">
            <button onClick={() => setIsOpen(false)} className="w-full bg-[#E8A020] text-white font-black text-[10px] tracking-widest uppercase py-4 rounded-lg shadow-xs">
              Book Now
            </button>
            <button onClick={() => setIsOpen(false)} className="w-full bg-white border border-gray-200 text-gray-700 font-black text-[10px] tracking-widest uppercase py-4 rounded-lg">
              List Your Business
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;