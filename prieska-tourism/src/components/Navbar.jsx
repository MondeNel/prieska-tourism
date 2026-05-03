import { useState, useEffect } from 'react';
import BookingModal from './BookingModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
    if (window.scrollY > 50) {
      setIsMobileMenuOpen(false);
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Prevent body scroll when mobile menu is open
useEffect(() => {
  if (isMobileMenuOpen) {
    document.body.classList.add('menu-open');
  } else {
    document.body.classList.remove('menu-open');
  }
  return () => document.body.classList.remove('menu-open');
}, [isMobileMenuOpen]);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Experiences', href: '#experiences', icon: 'fa-compass' },
    { name: 'Accommodation', href: '#accommodation', icon: 'fa-bed' },
    { name: 'Gallery', href: '#gallery', icon: 'fa-image' },
    { name: 'Stories', href: '#testimonials', icon: 'fa-comment' },
    { name: 'FAQ', href: '#faq', icon: 'fa-question-circle' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#FDF8F2]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer group z-20">
              <i className={`fas fa-tree text-xl md:text-2xl transition-all duration-300 group-hover:scale-110 ${
                isScrolled ? 'text-[#B87333]' : 'text-white'
              }`}></i>
              <span className={`font-serif text-base md:text-xl font-bold transition-all duration-300 ${
                isScrolled ? 'text-[#2C3E2F]' : 'text-white'
              }`}>
                Prieska Karoo
              </span>
            </div>
            
            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`transition font-medium duration-300 ${
                    isScrolled ? 'text-[#3D2B1A] hover:text-[#B87333]' : 'text-white hover:text-[#E6B17E]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* Desktop Book Now Button */}
            <button 
              onClick={() => setIsBookingOpen(true)}
              className={`hidden md:block font-semibold px-5 lg:px-6 py-1.5 lg:py-2 rounded-full transition-all duration-300 shadow-lg text-sm lg:text-base ${
                isScrolled 
                  ? 'bg-[#B87333] hover:bg-[#B87333]/80 text-white' 
                  : 'bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 text-white'
              }`}
            >
              Book Now
            </button>
            
            {/* Mobile Menu Button (Hamburger) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden z-20 p-2 rounded-lg transition-all duration-300 ${
                isMobileMenuOpen ? 'fixed right-4 top-3' : 'relative'
              }`}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-6 h-0.5 transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-[#B87333]' : isScrolled ? 'bg-[#2C3E2F]' : 'bg-white'
                }`}></span>
                <span className={`w-6 h-0.5 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : isScrolled ? 'bg-[#2C3E2F]' : 'bg-white'
                }`}></span>
                <span className={`w-6 h-0.5 transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2 bg-[#B87333]' : isScrolled ? 'bg-[#2C3E2F]' : 'bg-white'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden fixed inset-0 bg-[#FDF8F2] z-10 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}>
          <div className="flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-8">
            {/* Logo in menu */}
            <div className="flex items-center space-x-2 mb-8">
              <i className="fas fa-tree text-2xl text-[#B87333]"></i>
              <span className="font-serif text-xl font-bold text-[#2C3E2F]">Prieska Karoo Horizons</span>
            </div>
            
            {/* Navigation Links */}
            <div className="flex flex-col space-y-6 w-full max-w-xs">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="flex items-center gap-4 px-6 py-4 text-[#3D2B1A] hover:text-[#B87333] hover:bg-amber-50 rounded-xl transition-all duration-300 group animate-slide-down"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <i className={`fas ${link.icon} w-5 h-5 text-[#B87333] group-hover:scale-110 transition`}></i>
                  <span className="text-lg font-medium">{link.name}</span>
                  <i className="fas fa-arrow-right ml-auto opacity-0 group-hover:opacity-100 transition text-[#B87333]"></i>
                </a>
              ))}
              
              {/* Divider */}
              <div className="border-t border-gray-200 my-2"></div>
              
              {/* Book Now Button in Menu */}
              <button
                onClick={() => {
                  setIsBookingOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 shadow-lg"
              >
                <i className="fas fa-calendar-check"></i>
                <span>Book Now</span>
              </button>
            </div>
            
            {/* Footer in Menu */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-xs text-gray-400">© 2025 Prieska Karoo Horizons</p>
              <div className="flex justify-center gap-4 mt-3">
                <i className="fab fa-facebook text-gray-400 hover:text-blue-600 cursor-pointer transition"></i>
                <i className="fab fa-instagram text-gray-400 hover:text-pink-600 cursor-pointer transition"></i>
                <i className="fab fa-twitter text-gray-400 hover:text-blue-400 cursor-pointer transition"></i>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

export default Navbar;