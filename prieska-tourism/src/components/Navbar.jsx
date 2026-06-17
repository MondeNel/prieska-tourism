import { useState, useEffect } from 'react';
import BookingModal from './BookingModal';
import AdminAuthModal from './AdminAuthModal';
import AdminDashboard from './AdminDashboard';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Categories aligned exactly with your main ExploreCategories data schema
  const categories = [
    { id: 'places', icon: 'fa-map-marked-alt', label: 'Places to Go' },
    { id: 'stay', icon: 'fa-bed', label: 'Where to Stay' },
    { id: 'things', icon: 'fa-compass', label: 'Things to Do' },
    { id: 'plan', icon: 'fa-calendar-check', label: 'Plan Your Trip' },
    { id: 'wise', icon: 'fa-lightbulb', label: 'TravelWise' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const stored = localStorage.getItem('admin_logged_in');
    if (stored) setAdminUser(JSON.parse(stored));
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);
  const handleAdminLogin = (user) => { setAdminUser(user); setIsAdminDashboardOpen(true); };
  const handleAdminLogout = () => { localStorage.removeItem('admin_logged_in'); setAdminUser(null); setIsAdminDashboardOpen(false); };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-2 cursor-pointer group">
            <span className={`font-sans tracking-widest text-base md:text-xl font-black transition-colors ${
              isScrolled ? 'text-[#1A1F2E]' : 'text-white'
            }`}>
              SIYATHEMBA<span className="text-[#E8A020] font-light">TOURISM</span>
            </span>
          </div>


          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="hidden md:block font-bold px-6 py-2 rounded-full bg-[#E8A020] hover:bg-[#1A1F2E] text-white text-xs uppercase tracking-wider transition-colors duration-300"
            >
              Book Now
            </button>
            <button
              onClick={() => adminUser ? setIsAdminDashboardOpen(true) : setIsAdminAuthOpen(true)}
              className={`hidden md:block font-bold px-5 py-2 rounded-full border text-xs uppercase tracking-wider transition-all duration-300 ${
                isScrolled 
                  ? 'border-gray-300 text-gray-700 hover:border-[#1A1F2E] hover:text-[#1A1F2E]' 
                  : 'border-white/30 text-white hover:bg-white hover:text-[#1A1F2E]'
              }`}
            >
              List Your Business
            </button>
            
            {/* Mobile Burger Menu Icon */}
            <button onClick={toggleMenu} className="md:hidden p-2 focus:outline-none" aria-label="Toggle Menu">
              <div className="w-6 h-4 flex flex-col justify-between">
                <span className={`w-full h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''} ${isScrolled || isMobileMenuOpen ? 'bg-[#1A1F2E]' : 'bg-white'}`}></span>
                <span className={`w-full h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''} ${isScrolled || isMobileMenuOpen ? 'bg-[#1A1F2E]' : 'bg-white'}`}></span>
                <span className={`w-full h-0.5 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''} ${isScrolled || isMobileMenuOpen ? 'bg-[#1A1F2E]' : 'bg-white'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Backdrop for mobile drawer */}
        <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={closeMenu}></div>
        
        {/* Mobile Navigation Drawer */}
        <div className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 md:hidden shadow-2xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full bg-white overflow-y-auto">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <span className="font-sans tracking-widest text-lg font-black text-[#1A1F2E]">PRIESKA<span className="text-[#E8A020] font-light">TOURISM</span></span>
              <button onClick={closeMenu} className="text-gray-500 hover:text-[#E8A020] text-xl p-2"><i className="fas fa-times"></i></button>
            </div>
            
            {/* Main Menu Content */}
            <div className="p-6 flex flex-col gap-6">
              
              {/* SECTION: Explore Categories (Cape Town Style Layout Inside Drawer) */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">Explore Categories</p>
                <div className="flex flex-col space-y-2">
                  {categories.map((cat) => (
                    <a 
                      key={cat.id} 
                      href={`#${cat.id}`} 
                      onClick={closeMenu} 
                      className="flex items-center gap-4 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl hover:border-gray-200 text-[#1A1F2E] font-semibold transition-all shadow-sm group"
                    >
                      <div className="w-9 h-9 rounded-full bg-white text-[#1A1F2E] border border-gray-100 flex items-center justify-center transition-colors group-hover:bg-[#E8A020] group-hover:text-white group-hover:border-transparent shadow-sm">
                        <i className={`fas ${cat.icon} text-xs`}></i>
                      </div>
                      <span className="text-xs uppercase tracking-wider">{cat.label}</span>
                      <i className="fas fa-chevron-right ml-auto text-gray-300 text-[10px] transition-transform group-hover:translate-x-0.5 group-hover:text-[#E8A020]"></i>
                    </a>
                  ))}
                </div>
              </div>

              {/* SECTION: Utility Page Links */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">More Information</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Gallery', 'Stories', 'FAQ', 'Contact Us'].map((item, idx) => (
                    <a 
                      key={idx} 
                      href={`#${item.toLowerCase().replace(' ', '-')}`} 
                      onClick={closeMenu} 
                      className="px-4 py-3 rounded-xl border border-gray-100 text-gray-600 font-medium text-xs hover:bg-gray-50 text-center transition-all"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* SECTION: Primary Actions */}
              <div className="pt-2 flex flex-col gap-2">
                <button onClick={() => { setIsBookingOpen(true); closeMenu(); }} className="w-full bg-[#E8A020] hover:bg-[#1A1F2E] text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-colors">
                  Book Your Stay Now
                </button>
                <button onClick={() => { (adminUser ? setIsAdminDashboardOpen(true) : setIsAdminAuthOpen(true)); closeMenu(); }} className="w-full bg-white border border-gray-200 text-gray-700 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-gray-50 transition-colors">
                  List Your Business
                </button>
              </div>
            </div>
            
            {/* Drawer Footer */}
            <div className="mt-auto p-6 bg-gray-50 text-center text-[10px] text-gray-400 font-medium tracking-wide border-t border-gray-100">
              © 2026 Prieska Tourism
            </div>
          </div>
        </div>
      </nav>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <AdminAuthModal isOpen={isAdminAuthOpen} onClose={() => setIsAdminAuthOpen(false)} onLoginSuccess={handleAdminLogin} />
      <AdminDashboard user={adminUser} onLogout={handleAdminLogout} isOpen={isAdminDashboardOpen} onClose={() => setIsAdminDashboardOpen(false)} />
    </>
  );
};

export default Navbar;