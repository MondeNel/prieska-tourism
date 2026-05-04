import { useState, useEffect } from 'react';
import BookingModal from './BookingModal';
import AdminAuthModal from './AdminAuthModal';
import AdminDashboard from './AdminDashboard';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Admin state
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

  // Check for existing admin session
  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin_logged_in');
    if (storedAdmin) {
      setAdminUser(JSON.parse(storedAdmin));
    }
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
    { name: 'Accommodation', href: '#accommodation', icon: 'fa-bed' },
    { name: 'Gallery', href: '#gallery', icon: 'fa-image' },
    { name: 'Stories', href: '#testimonials', icon: 'fa-comment' },
    { name: 'FAQ', href: '#faq', icon: 'fa-question-circle' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#FDF8F2]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer group z-20">
              <i
                className={`fas fa-tree text-xl md:text-2xl transition-all duration-300 group-hover:scale-110 ${
                  isScrolled ? 'text-[#B87333]' : 'text-white'
                }`}
              ></i>
              <span
                className={`font-serif text-sm md:text-xl font-bold transition-all duration-300 ${
                  isScrolled ? 'text-[#2C3E2F]' : 'text-white'
                }`}
              >
                Prieska Karoo Horizons
              </span>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`transition font-medium duration-300 ${
                    isScrolled
                      ? 'text-[#3D2B1A] hover:text-[#B87333]'
                      : 'text-white hover:text-[#E6B17E]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              {/* Desktop Book Now button */}
              <button
                onClick={() => setIsBookingOpen(true)}
                className={`font-semibold px-5 lg:px-6 py-1.5 lg:py-2 rounded-full transition-all duration-300 shadow-lg text-sm lg:text-base ${
                  isScrolled
                    ? 'bg-[#B87333] hover:bg-[#B87333]/80 text-white'
                    : 'bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 text-white'
                }`}
              >
                Book Now
              </button>
              
              {/* Admin button (desktop) */}
              {adminUser ? (
                <button
                  onClick={() => setIsAdminDashboardOpen(true)}
                  className="font-semibold px-4 py-1.5 rounded-full transition-all duration-300 shadow-lg text-sm bg-gray-700 text-white hover:bg-gray-600"
                >
                  <i className="fas fa-user-shield mr-1"></i> Dashboard
                </button>
              ) : (
                <button
                  onClick={() => setIsAdminAuthOpen(true)}
                  className="font-semibold px-4 py-1.5 rounded-full transition-all duration-300 shadow-lg text-sm bg-gray-700 text-white hover:bg-gray-600"
                >
                  <i className="fas fa-user-shield mr-1"></i> Admin
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
                <span
                  className={`w-6 h-0.5 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? 'rotate-45 translate-y-2 bg-[#B87333]'
                      : isScrolled
                      ? 'bg-[#2C3E2F]'
                      : 'bg-white'
                  }`}
                ></span>
                <span
                  className={`w-6 h-0.5 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? 'opacity-0'
                      : isScrolled
                      ? 'bg-[#2C3E2F]'
                      : 'bg-white'
                  }`}
                ></span>
                <span
                  className={`w-6 h-0.5 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? '-rotate-45 -translate-y-2 bg-[#B87333]'
                      : isScrolled
                      ? 'bg-[#2C3E2F]'
                      : 'bg-white'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Backdrop overlay (darkens the page behind the menu) */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          onClick={closeMenu}
        ></div>

        {/* Mobile sliding panel – no duplicate X button inside */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#FDF8F2] z-50 md:hidden shadow-2xl transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ height: '100vh', overflowY: 'auto' }}
        >
          <div className="flex flex-col min-h-full">
            {/* Logo area */}
            <div className="flex flex-col items-center pt-8 px-6">
              <div className="flex items-center space-x-2 mb-2">
                <i className="fas fa-tree text-2xl text-[#B87333]"></i>
                <span className="font-serif text-xl font-bold text-[#2C3E2F]">Prieska Karoo Horizons</span>
              </div>
              <p className="text-xs text-gray-400 text-center">Where the Karoo Breathes</p>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col space-y-3 px-6 mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className="group flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#B87333] hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                      <i className={`fas ${link.icon} text-[#B87333] text-sm`}></i>
                    </div>
                    <span className="text-[#2C3E2F] font-medium group-hover:text-[#B87333] transition">
                      {link.name}
                    </span>
                  </div>
                  <i className="fas fa-chevron-right text-gray-300 group-hover:text-[#B87333] group-hover:translate-x-1 transition"></i>
                </a>
              ))}

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-[#FDF8F2] text-gray-400">or</span>
                </div>
              </div>

              {/* Book Now button inside menu */}
              <button
                onClick={() => {
                  setIsBookingOpen(true);
                  closeMenu();
                }}
                className="flex items-center justify-center gap-3 px-4 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 shadow-lg transform hover:scale-[1.02]"
              >
                <i className="fas fa-calendar-check"></i>
                <span>Book Your Adventure Now</span>
                <i className="fas fa-arrow-right"></i>
              </button>
              
              {/* Admin button in mobile menu */}
              <div className="mt-2">
                {adminUser ? (
                  <button
                    onClick={() => {
                      setIsAdminDashboardOpen(true);
                      closeMenu();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-all duration-300"
                  >
                    <i className="fas fa-user-shield"></i>
                    <span>Dashboard</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsAdminAuthOpen(true);
                      closeMenu();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-all duration-300"
                  >
                    <i className="fas fa-user-shield"></i>
                    <span>Admin Login</span>
                  </button>
                )}
              </div>
            </div>

            {/* Footer area */}
            <div className="text-center pt-8 pb-6 px-6 mt-auto">
              <p className="text-[10px] text-gray-400">© 2025 Prieska Karoo Horizons</p>
              <div className="flex justify-center gap-6 mt-4">
                <a href="#" className="text-gray-400 hover:text-blue-600 transition">
                  <i className="fab fa-facebook-f text-lg"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-600 transition">
                  <i className="fab fa-instagram text-lg"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                  <i className="fab fa-twitter text-lg"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition">
                  <i className="fab fa-youtube text-lg"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <AdminAuthModal isOpen={isAdminAuthOpen} onClose={() => setIsAdminAuthOpen(false)} onLoginSuccess={handleAdminLoginSuccess} />
      <AdminDashboard user={adminUser} onLogout={handleAdminLogout} isOpen={isAdminDashboardOpen} onClose={() => setIsAdminDashboardOpen(false)} />
    </>
  );
};

export default Navbar;