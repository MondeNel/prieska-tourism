import { useState, useEffect } from 'react';
import BookingModal from './BookingModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
              <span className={`font-serif text-sm md:text-xl font-bold transition-all duration-300 ${
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
            
            {/* Desktop Book Now Button - Hidden on mobile */}
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
            
            {/* Mobile Menu Button (Hamburger) - Only visible on mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden z-50 p-2 rounded-lg focus:outline-none"
              aria-label="Toggle menu"
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
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-[#FDF8F2] z-40 md:hidden overflow-y-auto">
            <div className="flex flex-col items-center justify-between min-h-screen px-6 pt-24 pb-8">
              {/* Logo in menu */}
              <div className="flex flex-col items-center mb-8">
                <div className="flex items-center space-x-2 mb-2">
                  <i className="fas fa-tree text-3xl text-[#B87333]"></i>
                  <span className="font-serif text-2xl font-bold text-[#2C3E2F]">Prieska Karoo</span>
                </div>
                <p className="text-xs text-gray-400 text-center">Where the Karoo Breathes</p>
              </div>
              
              {/* Navigation Links */}
              <div className="flex flex-col space-y-4 w-full max-w-sm">
                {navLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="group flex items-center justify-between px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#B87333] hover:shadow-md transition-all duration-300"
                    style={{ animation: `slideUp 0.3s ease-out ${index * 0.05}s both` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                        <i className={`fas ${link.icon} text-[#B87333]`}></i>
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
                
                {/* Book Now Button in Menu */}
                <button
                  onClick={() => {
                    setIsBookingOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 shadow-lg transform hover:scale-[1.02]"
                >
                  <i className="fas fa-calendar-check"></i>
                  <span>Book Your Adventure Now</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
              
              {/* Footer in Menu */}
              <div className="text-center pt-8">
                <p className="text-[10px] text-gray-400">© 2025 Prieska Karoo Horizons</p>
                <div className="flex justify-center gap-6 mt-4">
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                    <i className="fab fa-facebook-f text-lg"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-pink-600 transition-all duration-300 hover:scale-110">
                    <i className="fab fa-instagram text-lg"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                    <i className="fab fa-twitter text-lg"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110">
                    <i className="fab fa-youtube text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

export default Navbar;