import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { 
      q: "What is the best time to visit Prieska?", 
      a: "Prieska offers two distinct seasons. **Winter (April–September)** is dry and mild – ideal for hunting expeditions (kudu, springbok) and wildlife viewing. **Summer (October–March)** is hot, perfect for enjoying the Orange River, guesthouse pools, and traditional braais (barbecues) in the cool evenings. Both seasons have their unique charm." 
    },
    { 
      q: "How do I book an experience or accommodation?", 
      a: "You can book directly through our website by clicking 'Book Now' on any experience or guesthouse card. Fill in your details, select dates, and complete the secure checkout. Our team will confirm your booking within 24 hours." 
    },
    { 
      q: "What are the must-see attractions in Prieska?", 
      a: "Don't miss the Orange River views from Prieska Koppie, the ancient San rock art sites, the historic diamond fields, and the peaceful Karoo landscapes. The nearby Die Bos viewpoint is perfect for sunset." 
    },
    { 
      q: "What amenities are available at the guesthouses?", 
      a: "All our listed guesthouses offer free Wi-Fi, parking, breakfast options, and comfortable rooms. Riverview Lodge has a pool and restaurant, while BoKáro Boutique Guesthouse includes a spa and garden." 
    },
    { 
      q: "Is Prieska accessible by car?", 
      a: "Yes, Prieska is easily reached via the R357 from Kimberley or the R389 from Douglas. The roads are well-maintained, and all guesthouses offer secure parking." 
    },
    { 
      q: "Are there guided tours available?", 
      a: "Absolutely! We offer guided game drives, river rafting excursions, San rock art tours, and heritage walks. Private guides can be arranged upon request." 
    }
  ];

  return (
    <div id="faq" className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-[#2C3E2F] mb-3">
            Frequently Asked <span className="text-[#B87333]">Questions</span>
          </h2>
          <div className="h-1 w-16 bg-[#E6B17E] rounded-full mb-6"></div>
          <p className="text-gray-500 text-sm md:text-base mb-6">Everything you need to plan your Prieska journey.</p>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-3">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full text-left font-semibold text-[#3D2B1A] py-2 flex justify-between items-center hover:text-[#B87333] transition text-sm md:text-base"
                >
                  <span>{faq.q}</span>
                  <i className={`fas fa-chevron-down text-[#B87333] transition-transform duration-300 text-xs md:text-sm ${openIndex === idx ? 'rotate-180' : ''}`}></i>
                </button>
                {openIndex === idx && (
                  <p className="text-gray-600 pt-2 pl-2 text-xs md:text-sm animate-fade-in leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#2C3E2F] to-[#2C3E2F]/90 rounded-2xl p-6 md:p-8 text-white text-center transform hover:scale-105 transition-transform duration-300">
          <i className="fas fa-map-marked-alt text-4xl md:text-5xl text-[#E6B17E] mb-4 block"></i>
          <h3 className="text-xl md:text-2xl font-serif mb-2">Plan Your Visit</h3>
          <p className="mb-5 text-gray-300 text-sm md:text-base">Get personalized recommendations and exclusive packages.</p>
          <div className="flex flex-col gap-3">
            <a 
              href="https://maps.google.com/?q=Prieska+Northern+Cape" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#B87333] px-5 py-2.5 md:py-3 rounded-full text-white font-medium hover:bg-[#B87333]/80 transition-all text-sm md:text-base"
            >
              <i className="fas fa-location-dot mr-2"></i> VIEW ON MAP
            </a>
            <a 
              href="mailto:info@karoorizons.co.za?subject=Travel%20Inquiry%20-%20Prieska"
              className="bg-transparent border border-white/40 px-5 py-2.5 md:py-3 rounded-full hover:bg-white/10 transition-all text-sm md:text-base"
            >
              <i className="fas fa-envelope mr-2"></i> CONTACT TRAVEL EXPERT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;