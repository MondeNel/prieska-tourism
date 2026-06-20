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

  // Structural sub-navigation items for the dropdown matrices
  const menuData = {
    places: [
      { name: 'Prieska Hub', desc: 'Historical town center & primary amenities' },
      { name: 'Marydale Plains', desc: 'Gateway to the wider Karoo landscape' },
      { name: 'Niekerkshoop Frontier', desc: 'Traditional gemstone & farming region' },
      { name: 'Wonderdraai', desc: 'The unique horseshoe river phenomenon' }
    ],
    stay: [
      { name: 'Boutique Guesthouses', desc: 'Premium local hospitality' },
      { name: 'River Lodges', desc: 'Stunning accommodation on the banks' },
      { name: 'Farm Stays', desc: 'Authentic Karoo country living' },
      { name: 'Self-Catering Chalets', desc: 'Flexible family holiday setups' }
    ],
    todo: [
      { name: 'Orange River Rafting', desc: 'Adrenaline & river trails' },
      { name: 'Dark Sky Stargazing', desc: 'Crystal clear astronomical observation' },
      { name: 'San Rock Art Tours', desc: 'Ancient cultural heritage sites' },
      { name: 'Game Drives', desc: 'Northern Cape wildlife expeditions' }
    ],
    plan: [
      { name: 'Interactive Map', desc: 'Plot your routes across the municipality' },
      { name: 'Travel Packages', desc: 'Curated all-inclusive regional itineraries' },
      { name: 'Digital Brochure', desc: 'Downloadable visitor guides' },
      { name: 'Contact Desk', desc: 'Direct administrative support line' }
    ],
    travelwise: [
      { name: 'Best Time to Visit', desc: 'Seasonal weather & calendar highlights' },
      { name: 'Road & Safety Advice', desc: 'Vehicle guidelines for regional tracks' },
      { name: 'Local Services', desc: 'Medical, banking, & emergency contacts' }
    ]
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 lg:bg-white/90 backdrop-blur-md py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Brand Identity */}
          <a href="#" className="tracking-[0.2em] select-none shrink-0 z-50">
            <span className="font-sans text-sm sm:text-base font-black text-gray-900">
              SIYATHEMBA<span className="text-[#E8A020] font-light">TOURISM</span>
            </span>
          </a>

          {/* Desktop Navigation Links with Dropdown Handles */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <div 
                key={link.key}
                className="relative group py-2"
                onMouseEnter={() => setActiveDropdown(link.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-gray-700 group-hover:text-[#E8A020] transition-colors focus:outline-hidden">
                  <span>{link.label}</span>
                  <i className={`fas fa-chevron-down text-[9px] text-gray-400 group-hover:text-[#E8A020] transition-transform duration-200 ${activeDropdown === link.key ? 'rotate-180' : ''}`}></i>
                </button>

                {/* Dropdown Mega-Card Panel Layout */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 transition-all duration-200 origin-top ${
                  activeDropdown === link.key ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                }`}>
                  <div className="space-y-1">
                    {menuData[link.key]?.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={`#${link.key}`}
                        className="block p-2 rounded-lg hover:bg-gray-50/80 transition-colors group/item"
                      >
                        <div className="text-xs font-bold text-gray-900 group-hover/item:text-[#E8A020] transition-colors">
                          {subItem.name}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5 font-medium leading-normal">
                          {subItem.desc}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            <a 
              href="#business" 
              className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-[#E8A020] transition-colors whitespace-nowrap"
            >
              List Your Business
            </a>
          </div>

          {/* Action Call to Action */}
          <div className="hidden lg:block">
            <button className="bg-[#E8A020] hover:bg-gray-900 text-white font-black text-[10px] tracking-widest uppercase px-6 py-3.5 rounded-full transition-all duration-300 shadow-xs">
              Book Now
            </button>
          </div>

          {/* Mobile Navigation Trigger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-hidden"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

        </div>
      </nav>

      {/* Slide-out Mobile Right Side Drawer Panel Sheet */}
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
                    
                    {/* Collapsible Mobile Dropdown Items Drawer Sub-Grid */}
                    <div className={`grid transition-all duration-300 ease-in-out bg-gray-50/50 rounded-lg overflow-hidden ${
                      isCurrentActive ? 'grid-rows-[1fr] opacity-100 my-1 p-2' : 'grid-rows-[0fr] opacity-0'
                    }`}>
                      <div className="overflow-hidden space-y-3">
                        {menuData[link.key]?.map((subItem) => (
                          <a 
                            key={subItem.name} 
                            href={`#${link.key}`}
                            onClick={() => setIsOpen(false)}
                            className="block py-1 px-2"
                          >
                            <div className="text-xs font-bold text-gray-800">{subItem.name}</div>
                            <div className="text-[10px] text-gray-400 mt-0.5">{subItem.desc}</div>
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
            <button onClick={() => setIsOpen(false)} className="w-full bg-[#E8A020] text-white font-black text-[10px] tracking-widest uppercase py-4 rounded-xl shadow-xs">
              Book Now
            </button>
            <button onClick={() => setIsOpen(false)} className="w-full bg-white border border-gray-200 text-gray-700 font-black text-[10px] tracking-widest uppercase py-4 rounded-xl">
              List Your Business
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;