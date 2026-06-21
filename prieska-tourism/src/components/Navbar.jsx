import { useState, useEffect } from 'react';

const Navbar = ({ onBookNow, onListBusiness }) => {
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

  const megaMenuData = {
    places: {
      title: "Top Regional Hubs",
      items: [
        { 
          name: "Prieska Hub", 
          desc: "Famous for its rich deposits of semi-precious Tiger's Eye stones, the historical Anglo-Boer War British Fort on top of Prieska Koppie, and the beautiful Ria Huysamen Aloe Garden.", 
          img: "/prieska-koppie.jpg" 
        },
        { 
          name: "Wonderdraai Wonder", 
          desc: "A breathtaking geological phenomenon where the Orange River loops into a massive horseshoe-shaped bend, causing a unique illusion that makes the water look like it is flowing uphill.", 
          img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" 
        },
        { 
          name: "Marydale Town", 
          desc: "Established in 1903 by the Dutch Reformed Church and supported by underground water boreholes, this classic Karoo farming village is renowned for its vast sheep farms and country hospitality.", 
          img: "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=400&q=80" 
        },
        { 
          name: "Niekerkshoop Town", 
          desc: "Tucked away at the foot of the scenic Asbestos Mountains, this peaceful settlement is famous for traditional gemstone mining, rich agricultural heritage, and local hospitality.", 
          img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80" 
        }
      ]
    },
    stay: {
      title: "Where to Stay",
      items: [
        { 
          name: "Riverview Lodge", 
          desc: "Beautiful riverside lodge along the Orange River with stunning sunset views. Perfect for families. From R850.", 
          img: "/riverviewlodge1.jpg",
          bookable: true 
        },
        { 
          name: "Gariep Country Lodge", 
          desc: "Charming country lodge on Main Road featuring traditional Karoo hospitality and warm garden spaces. From R650.", 
          img: "/gariep-guesthouse2.jpg",
          bookable: true
        },
        { 
          name: "BoKáro Boutique Guesthouse", 
          desc: "Luxury boutique guesthouse on Arbeck St offering personalized service, elegant rooms, and a spa area. From R750.", 
          img: "/guesthouse_room.jpg",
          bookable: true
        },
        { 
          name: "Explore All Lodging", 
          desc: "Browse our complete directory of local farm stays, remote self-catering chalets, and local retreats.", 
          img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80" 
        }
      ]
    },
    todo: {
      title: "Recommended Experiences",
      items: [
        { 
          name: "Karoo Safari", 
          desc: "Track the Big Five across ancient plains at golden hour. Expert guided game drives with sunset snacks. ZAR 1,250.", 
          img: "/karoo_image1.jpg",
          bookable: true
        },
        { 
          name: "Orange River Rafting", 
          desc: "Navigate mighty Orange River through dramatic gorges and rapids. Multi‑day expeditions available. ZAR 950.", 
          img: "/karoo_river-rafting.jpg",
          bookable: true
        },
        { 
          name: "San Rock Art Tours", 
          desc: "10,000‑year‑old Bushman paintings in situ. Cultural storytelling by local San descendants. ZAR 600.", 
          img: "/karoo_image2.jpg",
          bookable: true
        },
        { 
          name: "More Things to Do", 
          desc: "Discover premium hunting tracks, Prieska heritage historic mines, and charming local town markets.", 
          img: "/prieska-town.jpg" 
        }
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

  const handleItemClick = (e, item) => {
    if (item.bookable && onBookNow) {
      e.preventDefault();
      setActiveDropdown(null);
      setIsOpen(false);
      onBookNow(item.name);
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2.5' : 'bg-white/95 lg:bg-white/90 backdrop-blur-md py-3.5'
        }`}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center relative">
          
          <a href="#" className="tracking-[0.2em] select-none shrink-0 mr-6">
            <span className="font-sans text-xs sm:text-sm font-black text-gray-900">
              SIYATHEMBA<span className="text-[#E8A020] font-light">TOURISM</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-4 xl:gap-6 justify-center flex-1">
            {navLinks.map((link) => (
              <div 
                key={link.key}
                className="py-1.5"
                onMouseEnter={() => setActiveDropdown(link.key)}
              >
                <button className="flex items-center gap-1 text-[8.5px] font-black uppercase tracking-[0.15em] text-gray-800 hover:text-[#E8A020] transition-colors focus:outline-hidden whitespace-nowrap cursor-pointer">
                  <span>{link.label}</span>
                  <i className={`fas fa-chevron-down text-[7px] text-gray-400 transition-transform duration-200 ${activeDropdown === link.key ? 'rotate-180 text-[#E8A020]' : ''}`}></i>
                </button>
              </div>
            ))}
            
            <button 
              onClick={() => onListBusiness && onListBusiness()}
              className="text-[8.5px] font-black uppercase tracking-[0.15em] text-gray-500 hover:text-[#E8A020] transition-colors whitespace-nowrap cursor-pointer focus:outline-hidden"
            >
              List Your Business
            </button>
          </div>

          <div className="hidden lg:block shrink-0 ml-4">
            <button 
              onClick={() => onBookNow && onBookNow()}
              className="bg-[#E8A020] hover:bg-gray-900 text-white font-black text-[8.5px] tracking-widest uppercase px-5 py-2.5 rounded-lg transition-all duration-300 shadow-xs cursor-pointer"
            >
              Book Now
            </button>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden z-50 w-9 h-9 flex flex-col justify-center items-center gap-1.5 focus:outline-hidden"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          {/* Desktop Mega Dropdown Panel */}
          <div className={`absolute left-6 right-6 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-5 transition-all duration-300 origin-top transform z-50 hidden lg:block ${
            activeDropdown ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
          }`}>
            {activeDropdown && (
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-50 pb-1.5">
                  {megaMenuData[activeDropdown].title}
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {megaMenuData[activeDropdown].items.map((item) => (
                    <a 
                      key={item.name} 
                      href={`#${activeDropdown}`}
                      className="group/card block rounded-lg overflow-hidden border border-transparent hover:border-gray-50 transition-all hover:shadow-xs"
                      onClick={(e) => item.bookable ? handleItemClick(e, item) : setActiveDropdown(null)}
                    >
                      <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100 mb-2 relative">
                        <img 
                          src={item.img} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" 
                        />
                        {item.bookable && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-[#E8A020] text-white font-black text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-sm">Instant Book</span>
                          </div>
                        )}
                      </div>
                      <div className="text-[11px] font-bold text-gray-900 group-hover/card:text-[#E8A020] transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[9px] text-gray-400 mt-0.5 leading-relaxed font-medium line-clamp-2">
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

      {/* Mobile Drawer Panel — removed duplicate logo */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-[#1A1F2E]/40 backdrop-blur-xs transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />

        <div className={`absolute top-0 right-0 bottom-0 w-full sm:w-[380px] bg-white shadow-2xl flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`} style={{ height: '100dvh' }}>
          
          <div className="overflow-y-auto flex-grow pt-14 space-y-5 custom-scrollbar">
            {/* Duplicate logo removed — now the links start directly */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isCurrentActive = activeDropdown === link.key;
                return (
                  <div key={link.key} className="border-b border-gray-50 pb-1">
                    <button 
                      onClick={() => setActiveDropdown(isCurrentActive ? null : link.key)}
                      className="w-full flex justify-between items-center py-3 text-[11px] font-black uppercase tracking-wider text-gray-800 hover:text-[#E8A020] transition-colors text-left"
                    >
                      <span>{link.label}</span>
                      <i className={`fas fa-chevron-down text-[9px] text-gray-400 transition-transform duration-200 ${isCurrentActive ? 'rotate-180 text-[#E8A020]' : ''}`}></i>
                    </button>
                    
                    <div className={`grid transition-all duration-300 ease-in-out bg-gray-50/50 rounded-lg overflow-hidden ${
                      isCurrentActive ? 'grid-rows-[1fr] opacity-100 my-1 p-2' : 'grid-rows-[0fr] opacity-0'
                    }`}>
                      <div className="overflow-hidden space-y-3">
                        {megaMenuData[link.key]?.items.map((subItem) => (
                          <a 
                            key={subItem.name} 
                            href={`#${link.key}`}
                            onClick={(e) => subItem.bookable ? handleItemClick(e, subItem) : setIsOpen(false)}
                            className="flex gap-3 items-start group"
                          >
                            <img src={subItem.img} alt="" className="w-10 h-10 rounded-md object-cover shrink-0 bg-gray-100" />
                            <div>
                              <div className="text-[11px] font-bold text-gray-800 group-hover:text-[#E8A020] transition-colors">{subItem.name}</div>
                              <div className="text-[9px] text-gray-400 mt-0.5 leading-tight line-clamp-2">{subItem.desc}</div>
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

          <div className="pt-3 border-t border-gray-100 space-y-2 bg-white shrink-0">
            <button 
              onClick={() => { setIsOpen(false); onBookNow && onBookNow(); }} 
              className="w-full bg-[#E8A020] text-white font-black text-[10px] tracking-widest uppercase py-3.5 rounded-lg shadow-xs cursor-pointer"
            >
              Book Now
            </button>
            <button 
              onClick={() => { setIsOpen(false); onListBusiness && onListBusiness(); }} 
              className="w-full bg-white border border-gray-200 text-gray-700 font-black text-[10px] tracking-widest uppercase py-3.5 rounded-lg cursor-pointer"
            >
              List Your Business
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;