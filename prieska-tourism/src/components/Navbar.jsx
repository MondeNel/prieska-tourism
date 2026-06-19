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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-gray-100' 
          : 'bg-gradient-to-b from-black/40 to-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo - Styled clean & flat like Cape Town Travel */}
          <a href="#" className="flex items-center space-x-1 cursor-pointer tracking-[0.2em]">
            <span className={`font-sans text-base md:text-lg font-black transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              SIYATHEMBA<span className="text-[#E8A020] font-light">TOURISM</span>
            </span>
          </a>

          {/* Desktop Centralized Links - Direct styling from capetown.travel */}
          <div className="hidden lg:flex items-center space-x-8">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 hover:text-[#E8A020] ${
                  isScrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>

          {/* Action Buttons Layer */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => adminUser ? setIsAdminDashboardOpen(true) : setIsAdminAuthOpen(true)}
              className={`hidden md:block text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
              }`}
            >
              List Your Business
            </button>
            
            <button
              onClick={() => setIsBookingOpen(true)}
              className="hidden md:block font-bold px-6 py-2.5 rounded-full bg-[#E8A020] hover:bg-gray-900 text-white text-xs uppercase tracking-widest shadow-sm hover:shadow transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Book Now
            </button>
            
            {/* Mobile Burger Menu Button */}
            <button 
              onClick={toggleMenu} 
              className="lg:hidden p-2 relative z-50 focus:outline-none" 
              aria-label="Toggle Menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`w-full h-0.5 transition-all duration-300 origin-left ${isMobileMenuOpen ? 'rotate-45' : ''} ${isScrolled || isMobileMenuOpen ? 'bg-gray-900' : 'bg-white'}`}></span>
                <span className={`w-full h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''} ${isScrolled || isMobileMenuOpen ? 'bg-gray-900' : 'bg-white'}`}></span>
                <span className={`w-full h-0.5 transition-all duration-300 origin-left ${isMobileMenuOpen ? '-rotate-45' : ''} ${isScrolled || isMobileMenuOpen ? 'bg-gray-900' : 'bg-white'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Drawer Backdrop */}
        <div 
          className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`} 
          onClick={closeMenu}
        ></div>
        
        {/* Mobile Side Drawer Navigation */}
        <div className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl transform transition-transform duration-500 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full bg-white overflow-y-auto">
            
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <span className="font-sans tracking-widest text-base font-black text-gray-900">
                SIYATHEMBA<span className="text-[#E8A020] font-light">TOURISM</span>
              </span>
            </div>
            
            <div className="p-6 flex flex-col gap-8">
              {/* Category Links */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 px-1">Explore</p>
                <div className="flex flex-col space-y-1">
                  {categories.map((cat) => (
                    <a 
                      key={cat.id} 
                      href={`#${cat.id}`} 
                      onClick={closeMenu} 
                      className="flex items-center justify-between py-3.5 px-2 rounded-lg text-gray-800 font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors"
                    >
                      <span>{cat.label}</span>
                      <i className="fas fa-chevron-right text-[10px] text-gray-300"></i>
                    </a>
                  ))}
                </div>
              </div>

              {/* Extras Column */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 px-1">Planning Tools</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Gallery', 'Stories', 'FAQ', 'Contact'].map((item, idx) => (
                    <a 
                      key={idx} 
                      href={`#${item.toLowerCase()}`} 
                      onClick={closeMenu} 
                      className="p-3 rounded-xl border border-gray-100 text-gray-700 font-bold text-[11px] uppercase tracking-wider hover:bg-gray-50 text-center transition-all"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Call To Actions */}
              <div className="pt-4 flex flex-col gap-3">
                <button 
                  onClick={() => { setIsBookingOpen(true); closeMenu(); }} 
                  className="w-full bg-[#E8A020] hover:bg-gray-900 text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-sm transition-colors"
                >
                  Book Now
                </button>
                <button 
                  onClick={() => { (adminUser ? setIsAdminDashboardOpen(true) : setIsAdminAuthOpen(true)); closeMenu(); }} 
                  className="w-full bg-white border border-gray-200 text-gray-800 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors"
                >
                  List Your Business
                </button>
              </div>
            </div>
            
            <div className="mt-auto p-6 bg-gray-50 text-center text-[10px] text-gray-400 font-bold tracking-widest border-t border-gray-100 uppercase">
              © 2026 Siyathemba Tourism
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