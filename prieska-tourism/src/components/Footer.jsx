const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E2A22] text-white/80 pt-12 pb-6 mt-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <i className="fas fa-tree text-2xl text-[#E6B17E]"></i>
              <h4 className="font-serif text-xl font-bold text-white">Karoo Horizons</h4>
            </div>
            <p className="text-sm leading-relaxed">Authentic Northern Cape experiences since 1864. Discover the magic of the Karoo.</p>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-white">Explore</h5>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-[#E6B17E] cursor-pointer transition flex items-center gap-2"><i className="fas fa-paw text-xs"></i> Safaris</li>
              <li className="hover:text-[#E6B17E] cursor-pointer transition flex items-center gap-2"><i className="fas fa-water text-xs"></i> Rafting</li>
              <li className="hover:text-[#E6B17E] cursor-pointer transition flex items-center gap-2"><i className="fas fa-paintbrush text-xs"></i> Rock Art</li>
              <li className="hover:text-[#E6B17E] cursor-pointer transition flex items-center gap-2"><i className="fas fa-star text-xs"></i> Stargazing</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-white">Support</h5>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-[#E6B17E] cursor-pointer transition">FAQs</li>
              <li className="hover:text-[#E6B17E] cursor-pointer transition">Booking Policy</li>
              <li className="hover:text-[#E6B17E] cursor-pointer transition">Travel Guide</li>
              <li className="hover:text-[#E6B17E] cursor-pointer transition">Contact Us</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-white">Newsletter</h5>
            <div className="flex mb-4">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded-l-lg w-full text-black text-sm outline-none focus:ring-1 focus:ring-[#B87333]"
              />
              <button className="bg-[#B87333] px-4 rounded-r-lg hover:bg-[#B87333]/80 transition">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            <div className="flex gap-4 text-lg">
              <i className="fab fa-instagram hover:text-[#E6B17E] cursor-pointer transition-transform hover:scale-110"></i>
              <i className="fab fa-facebook hover:text-[#E6B17E] cursor-pointer transition-transform hover:scale-110"></i>
              <i className="fab fa-twitter hover:text-[#E6B17E] cursor-pointer transition-transform hover:scale-110"></i>
              <i className="fab fa-youtube hover:text-[#E6B17E] cursor-pointer transition-transform hover:scale-110"></i>
            </div>
          </div>
        </div>
        <div className="text-center text-xs border-t border-white/10 mt-8 pt-6">
          © {currentYear} Karoo Horizons — Where the Karoo breathes. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;