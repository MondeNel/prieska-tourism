const partners = [
  {
    name: 'Siyathemba Municipality',
    logo: 'https://www.siyathemba.gov.za/images/images/LOGO.png',
    url: 'https://www.siyathemba.gov.za/',
  },
  {
    name: 'South Africa Tourism',
    logo: 'https://sat-backend-api-manager.azure-api.net//media/33586/logo_travel_en.png',
    url: 'https://www.southafrica.net/za/en/',
  },
  {
    name: 'Mulilo',
    logo: 'https://www.mulilo.com/media/xxqprx04/logo_boxed.svg?rmode=max&width=100&v=1da58400d84a900',
    url: 'https://www.mulilo.com/',
  },
  {
    name: 'Copperton Wind Farm',
    logo: 'https://coppertonwindfarm.co.za/images/copperton-images/logo-revised.png',
    url: 'https://coppertonwindfarm.co.za/',
  },
];

const PartnerSlider = () => {
  return (
    <div className="bg-[#FBF6EE] border-y border-gray-100 py-10 md:py-14 select-none overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4">
        
        <div className="text-center mb-10">
          <span className="text-[#C8780A] text-xs font-bold uppercase tracking-widest block mb-1">
            Collaborators
          </span>
          <h2 className="font-serif text-xl md:text-2xl font-bold text-[#1A1F2E]">
            Our Local Partners
          </h2>
        </div>

        {/* Masked overflow layer for clean fade edges */}
        <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-20 before:bg-gradient-to-r before:from-[#FBF6EE] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-20 after:bg-gradient-to-l after:from-[#FBF6EE] after:to-transparent after:z-10">
          
          <div className="flex gap-12 items-center w-max animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
            
            {/* Array Map 1: Original Set */}
            {partners.map((partner, idx) => (
              <a
                key={`orig-${idx}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center shrink-0 group transition-all duration-300 transform hover:scale-105 px-6 text-center"
                style={{ width: '180px' }}
              >
                <div className="h-12 w-full flex items-center justify-center mb-2.5">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-[10px] md:text-[11px] font-sans font-bold text-gray-500 group-hover:text-[#C8780A] uppercase tracking-wider transition-colors whitespace-normal line-clamp-1">
                  {partner.name}
                </span>
              </a>
            ))}

            {/* Array Map 2: Duplicate Set for Seamless Wrapping Loop */}
            {partners.map((partner, idx) => (
              <a
                key={`clone-${idx}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center shrink-0 group transition-all duration-300 transform hover:scale-105 px-6 text-center"
                style={{ width: '180px' }}
              >
                <div className="h-12 w-full flex items-center justify-center mb-2.5">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-[10px] md:text-[11px] font-sans font-bold text-gray-500 group-hover:text-[#C8780A] uppercase tracking-wider transition-colors whitespace-normal line-clamp-1">
                  {partner.name}
                </span>
              </a>
            ))}

          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PartnerSlider;