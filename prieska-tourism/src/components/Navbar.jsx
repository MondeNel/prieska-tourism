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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin_logged_in');
    if (storedAdmin) {
      setAdminUser(JSON.parse(storedAdmin));
    }
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleAdminLoginSuccess = (user) => {
    setAdminUser(user);
    setIsAdminDashboardOpen(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('admin_logged_in');
    setAdminUser(null);
    setIsAdminDashboardOpen(false);
  };

  const navLinks = [
    { name: 'Experiences', href: '#experiences', icon: 'fa-compass' },
    { name: 'Stay', href: '#accommodation', icon: 'fa-bed' },
    { name: 'Gallery', href: '#gallery', icon: 'fa-image' },
    { name: 'Stories', href: '#testimonials', icon: 'fa-comment' },
    { name: 'FAQ', href: '#faq', icon: 'fa-question-circle' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1F2E] shadow-lg">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer group z-20">
              <i className="fas fa-tree text-xl md:text-2xl text-[#E8A020] group-hover:scale-110 transition"></i>
              <span className="font-serif text-sm md:text-xl font-bold text-white">
                PRIESKA <span className="text-[#E8A020]">TOURISM</span>
              </span>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-[#E8A020] transition font-medium duration-300 text-sm lg:text-base uppercase tracking-wider"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              {/* Desktop Book Now button */}
              <button
                onClick={() => setIsBookingOpen(true)}
                className="font-semibold px-5 lg:px-6 py-1.5 lg:py-2 rounded-full transition-all duration-300 shadow-lg text-sm lg:text-base bg-[#7A3215] hover:bg-[#7A3215]/80 text-white"
              >
                Book Now
              </button>

              {/* List Your Business button */}
              <button
                onClick={() => {
                  if (adminUser) {
                    setIsAdminDashboardOpen(true);
                  } else {
                    setIsAdminAuthOpen(true);
                  }
                }}
                className="font-semibold px-4 py-1.5 rounded-full transition-all duration-300 shadow-lg text-sm border border-[#E8A020] text-[#E8A020] hover:bg-[#E8A020] hover:text-[#1A1F2E]"
              >
                <i className="fas fa-plus mr-1"></i> List Your Business
              </button>

              {/* Admin button (desktop) – keep for super admin */}
              {adminUser && (
                <button
                  onClick={() => setIsAdminDashboardOpen(true)}
                  className="font-semibold px-4 py-1.5 rounded-full transition-all duration-300 shadow-lg text-sm bg-gray-700 text-white hover:bg-gray-600"
                >
                  <i className="fas fa-user-shield mr-1"></i> Dashboard
                </button>
              )}
            </div>

            {/* Mobile hamburger button */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative z-[60] p-2 rounded-lg focus:outline-none"
              aria-label="Menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-6 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-[#E8A020]' : 'bg-white'}`}></span>
                <span className={`w-6 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'bg-white'}`}></span>
                <span className={`w-6 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2 bg-[#E8A020]' : 'bg-white'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile backdrop overlay */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          onClick={closeMenu}
        ></div>

        {/* Mobile sliding panel */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#1A1F2E] z-50 md:hidden shadow-2xl transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ height: '100vh', overflowY: 'auto' }}
        >
          <div className="flex flex-col min-h-full p-6">
            {/* Close button (hamburger transformed) – already outside, but we also add a close icon at the top of the panel for clarity */}
            <div className="flex justify-end mb-4">
              <button onClick={closeMenu} className="text-white hover:text-[#E8A020] text-xl">
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Logo in menu */}
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center space-x-2">
                <i className="fas fa-tree text-2xl text-[#E8A020]"></i>
                <span className="font-serif text-xl font-bold text-white">PRIESKA <span className="text-[#E8A020]">TOURISM</span></span>
              </div>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className="group flex items-center gap-3 px-4 py-3 bg-[#252C3F] rounded-xl hover:bg-[#E8A020]/20 transition-all duration-300 text-white"
                >
                  <i className={`fas ${link.icon} text-[#E8A020] text-sm`}></i>
                  <span className="font-medium">{link.name}</span>
                  <i className="fas fa-chevron-right ml-auto text-gray-500 group-hover:text-[#E8A020] transition"></i>
                </a>
              ))}

              <div className="border-t border-gray-700 my-4"></div>

              {/* Book Now button inside menu */}
              <button
                onClick={() => {
                  setIsBookingOpen(true);
                  closeMenu();
                }}
                className="w-full bg-[#7A3215] text-white py-3 rounded-xl font-semibold hover:bg-[#7A3215]/80 transition"
              >
                Book Now
              </button>

              {/* List Your Business */}
              <button
                onClick={() => {
                  if (adminUser) {
                    setIsAdminDashboardOpen(true);
                  } else {
                    setIsAdminAuthOpen(true);
                  }
                  closeMenu();
                }}
                className="w-full border border-[#E8A020] text-[#E8A020] py-3 rounded-xl font-semibold hover:bg-[#E8A020] hover:text-[#1A1F2E] transition"
              >
                List Your Business
              </button>

              {adminUser && (
                <button
                  onClick={() => {
                    setIsAdminDashboardOpen(true);
                    closeMenu();
                  }}
                  className="w-full bg-gray-700 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
                >
                  <i className="fas fa-user-shield mr-2"></i> Dashboard
                </button>
              )}
            </div>

            {/* Footer in menu */}
            <div className="text-center pt-8 mt-auto">
              <p className="text-xs text-gray-400">© 2025 Prieska Tourism</p>
              <div className="flex justify-center gap-6 mt-4">
                <a href="#" className="text-gray-400 hover:text-[#E8A020] transition"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-gray-400 hover:text-[#E8A020] transition"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-gray-400 hover:text-[#E8A020] transition"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <AdminAuthModal isOpen={isAdminAuthOpen} onClose={() => setIsAdminAuthOpen(false)} onLoginSuccess={handleAdminLoginSuccess} />
      <AdminDashboard user={adminUser} onLogout={handleAdminLogout} isOpen={isAdminDashboardOpen} onClose={() => setIsAdminDashboardOpen(false)} />
    </>
  );
};

export default Navbar;