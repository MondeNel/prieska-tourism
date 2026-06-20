import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { label: 'Places to Go', href: '#places' },
    { label: 'Where to Stay', href: '#stay' },
    { label: 'Things to Do', href: '#todo' },
    { label: 'Plan Your Trip', href: '#plan' },
    { label: 'Travelwise', href: '#travelwise' },
  ];

  const tools = [
    { label: 'Gallery', href: '#gallery' },
    { label: 'Stories', href: '#stories' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Main Global Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 lg:bg-white/90 backdrop-blur-md py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Brand Logo */}
          <a href="#" className="tracking-[0.2em] select-none shrink-0 z-50">
            <span className="font-sans text-sm sm:text-base font-black text-gray-900">
              SIYATHEMBA<span className="text-[#E8A020] font-light">TOURISM</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="text-[11px] font-black uppercase tracking-widest text-gray-700 hover:text-[#E8A020] transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#business" 
              className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-[#E8A020] transition-colors duration-200 whitespace-nowrap"
            >
              List Your Business
            </a>
          </div>

          {/* Desktop Call to Action */}
          <div className="hidden lg:block">
            <button className="bg-[#E8A020] hover:bg-gray-900 text-white font-black text-[10px] tracking-widest uppercase px-6 py-3.5 rounded-full transition-all duration-300 shadow-xs">
              Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            <span className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

        </div>
      </nav>

      {/* FULL RESPONSIVE MOBILE RIGHT-SIDE DRAWER OVERLAY */}
      <div className={`fixed inset-0 z-30 lg:hidden transition-all duration-300 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        
        {/* Dimmed Background Backdrop Dismissal Layer */}
        <div 
          className={`absolute inset-0 bg-[#1A1F2E]/40 backdrop-blur-xs transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />

        {/* Right Drawer Panel Sheet */}
        <div className={`absolute top-0 right-0 bottom-0 w-full sm:w-[380px] bg-white shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`} style={{ height: '100dvh' }}>
          
          {/* Scrollable Content Engine Wrapper */}
          <div className="overflow-y-auto flex-grow pt-16 pr-1 space-y-8 custom-scrollbar">
            
            {/* Header Identity Baseline inside menu */}
            <div className="tracking-[0.15em] select-none pb-2 border-b border-gray-50">
              <span className="font-sans text-xs font-black text-gray-900">
                SIYATHEMBA<span className="text-[#E8A020] font-light">TOURISM</span>
              </span>
            </div>

            {/* Section: Main Direct Links */}
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-4">
                Explore
              </span>
              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <a 
                    key={link.label} 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center py-3.5 text-xs font-black uppercase tracking-wider text-gray-800 hover:text-[#E8A020] border-b border-gray-50 group transition-colors"
                  >
                    <span>{link.label}</span>
                    <i className="fas fa-chevron-right text-[10px] text-gray-300 group-hover:text-[#E8A020] transition-colors"></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Section: Grid Tools */}
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-4">
                Planning Tools
              </span>
              <div className="grid grid-cols-2 gap-2">
                {tools.map((tool) => (
                  <a
                    key={tool.label}
                    href={tool.href}
                    onClick={() => setIsOpen(false)}
                    className="py-3 text-center rounded-xl border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {tool.label}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Persistent Action Baselines Drawer Layer */}
          <div className="pt-4 border-t border-gray-100 space-y-2.5 bg-white shrink-0">
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-full bg-[#E8A020] hover:bg-[#1A1F2E] text-white font-black text-[10px] tracking-widest uppercase py-4 rounded-xl transition-colors duration-300 shadow-xs"
            >
              Book Now
            </button>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-black text-[10px] tracking-widest uppercase py-4 rounded-xl transition-colors"
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