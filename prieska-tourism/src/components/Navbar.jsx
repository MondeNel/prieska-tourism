import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#FDF8F2]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer group">
            <i className={`fas fa-tree text-2xl transition-all duration-300 group-hover:scale-110 ${isScrolled ? 'text-[#B87333]' : 'text-white'}`}></i>
            <span className={`font-serif text-xl font-bold transition-all duration-300 ${isScrolled ? 'text-[#2C3E2F]' : 'text-white'}`}>
              Prieska Karoo Horizons
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#experiences" className={`transition font-medium duration-300 ${isScrolled ? 'text-[#3D2B1A] hover:text-[#B87333]' : 'text-white hover:text-[#E6B17E]'}`}>
              Experiences
            </a>
            <a href="#gallery" className={`transition font-medium duration-300 ${isScrolled ? 'text-[#3D2B1A] hover:text-[#B87333]' : 'text-white hover:text-[#E6B17E]'}`}>
              Gallery
            </a>
            <a href="#testimonials" className={`transition font-medium duration-300 ${isScrolled ? 'text-[#3D2B1A] hover:text-[#B87333]' : 'text-white hover:text-[#E6B17E]'}`}>
              Stories
            </a>
            <a href="#faq" className={`transition font-medium duration-300 ${isScrolled ? 'text-[#3D2B1A] hover:text-[#B87333]' : 'text-white hover:text-[#E6B17E]'}`}>
              FAQ
            </a>
          </div>
          <button className={`hidden md:block font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-lg ${
            isScrolled 
              ? 'bg-[#B87333] hover:bg-[#B87333]/80 text-white' 
              : 'bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 text-white'
          }`}>
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;