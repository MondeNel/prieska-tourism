const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1F2E] text-white/80 pt-16 pb-8 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="tracking-[0.2em]">
              <span className="font-sans text-base font-black text-white">
                SIYATHEMBA<span className="text-[#E8A020] font-light">TOURISM</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs">
              The official digital platform for tourism development within the Siyathemba Municipal region—connecting visitors with Prieska, Marydale, and Niekerkshoop.
            </p>
            
            {/* Social Channels Layer */}
            <div className="flex gap-2 pt-2">
              {[
                { icon: 'fab fa-facebook-f', link: '#' },
                { icon: 'fab fa-instagram', link: '#' },
                { icon: 'fab fa-twitter', link: '#' },
                { icon: 'fab fa-youtube', link: '#' }
              ].map((soc, idx) => (
                <a 
                  key={idx} 
                  href={soc.link} 
                  className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center hover:bg-[#E8A020] hover:text-white hover:border-transparent transition-all duration-300 text-gray-400"
                >
                  <i className={`${soc.icon} text-xs`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Directory Links Matrix */}
          <div>
            <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Explore</div>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider">
              {['Attractions', 'Accommodation', 'Adventures', 'Dining', 'Events'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-[#E8A020] transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Discover</div>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider">
              {['Prieska Hub', 'Marydale Plains', 'Niekerkshoop Frontier', 'Orange River Loop', 'Dark Sky Experience'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-[#E8A020] transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Business Operators</div>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider">
              {['List Your Business', 'Premium Listings', 'Management Portal', 'Marketing Kit', 'Contact Support'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-[#E8A020] transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Legal Baseline Panel */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500 gap-4">
          <span className="text-center md:text-left">
            © {currentYear} Siyathemba Tourism. All Rights Reserved.
          </span>
          <span className="text-[#E8A020] font-black tracking-[0.15em]">
            Siyathemba Local Municipality Initiative
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;