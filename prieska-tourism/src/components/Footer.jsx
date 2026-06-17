const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1F2E] text-white/80 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="font-serif text-xl font-bold text-white mb-2">
              PRIESKA <span className="text-[#E8A020]">TOURISM</span>
            </div>
            <p className="text-sm text-white/45 leading-relaxed">
              The official digital home for tourism in the Siyathemba Municipal area — Prieska, Marydale & Niekerkshoop.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 rounded bg-white/10 border border-white/15 flex items-center justify-center hover:bg-[#E8A020]/20 transition">
                <i className="fab fa-facebook-f text-white/60"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded bg-white/10 border border-white/15 flex items-center justify-center hover:bg-[#E8A020]/20 transition">
                <i className="fab fa-instagram text-white/60"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded bg-white/10 border border-white/15 flex items-center justify-center hover:bg-[#E8A020]/20 transition">
                <i className="fab fa-twitter text-white/60"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded bg-white/10 border border-white/15 flex items-center justify-center hover:bg-[#E8A020]/20 transition">
                <i className="fab fa-youtube text-white/60"></i>
              </a>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Explore</div>
            <ul className="space-y-2 text-sm">
              {['Attractions', 'Accommodation', 'Adventures', 'Dining', 'Events', 'Tourism Routes'].map((item) => (
                <li key={item}><a href="#" className="text-white/50 hover:text-[#E8A020] transition">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Discover</div>
            <ul className="space-y-2 text-sm">
              {['Prieska', 'Marydale', 'Niekerkshoop', 'Dark Sky Experience', 'Orange River', 'Plan Your Visit'].map((item) => (
                <li key={item}><a href="#" className="text-white/50 hover:text-[#E8A020] transition">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Business</div>
            <ul className="space-y-2 text-sm">
              {['List Your Business', 'Premium Listings', 'Business Login', 'Advertise', 'Contact Us'].map((item) => (
                <li key={item}><a href="#" className="text-white/50 hover:text-[#E8A020] transition">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
          <span>© {currentYear} Prieska Tourism. A Siyathemba Local Municipality initiative.</span>
          <span className="mt-1 md:mt-0 text-[#E8A020]/70 font-bold tracking-wider">Siyathemba Local Municipality</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;