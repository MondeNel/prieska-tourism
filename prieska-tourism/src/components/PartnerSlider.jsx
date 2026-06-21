import { useEffect, useRef } from 'react';

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
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId;
    let startTime = null;
    const duration = 20000; // 20 seconds for full loop

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      const translateX = -progress * (container.scrollWidth / 2);
      container.style.transform = `translateX(${translateX}px)`;
      animationId = requestAnimationFrame(animate);
    };

    // Duplicate the children for seamless loop
    const children = Array.from(container.children);
    const clone = children.map(child => child.cloneNode(true));
    clone.forEach(child => container.appendChild(child));

    // Adjust width to fit double content
    container.style.width = `${container.scrollWidth / 2}px`;

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="bg-white border-y border-gray-100 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <span className="text-[#C8780A] text-xs font-bold uppercase tracking-widest">Partners</span>
          <h2 className="font-serif text-xl md:text-2xl font-bold text-[#1A1F2E] mt-1">Our Trusted Partners</h2>
        </div>
        <div className="overflow-hidden relative">
          <div
            ref={containerRef}
            className="flex items-center gap-8 md:gap-12 will-change-transform"
            style={{ width: 'fit-content' }}
          >
            {partners.map((partner, idx) => (
              <a
                key={idx}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                style={{ width: '140px' }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-12 object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSlider;