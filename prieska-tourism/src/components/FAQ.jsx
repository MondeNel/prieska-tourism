import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { 
      q: "What is the best season to explore Siyathemba?", 
      a: "The region offers two distinct travel climates. **Winter (April–September)** is mild and dry—ideal for historical desert tracking, heritage tours, and crisp stargazing. **Summer (October–March)** brings intense heat, perfect for catching late-afternoon Orange River boating excursions and enjoying outdoor braais in the cooler high-desert evenings." 
    },
    { 
      q: "How do I secure my accommodation booking safely?", 
      a: "You can book directly via individual platform accommodation profiles by clicking 'Book Securely'. Fill out your target check-in timelines and submit via the direct WhatsApp or secure routing links. Local operator confirmations typically complete within 24 hours." 
    },
    { 
      q: "What are the core municipal landmark highlights?", 
      a: "Do not miss the stone architecture of the Prieska Koppie British Fort, the legendary water phenomenon at Wonderdraai Horseshoe Island, or the endemic birdlife and suspended walkways inside Die Bos Nature Reserve." 
    },
    { 
      q: "Are the roads accessible for light family sedans?", 
      a: "Yes, the core travel routes like the N10 and linking regional corridors into Prieska, Marydale, and Niekerkshoop are fully tarred and well-maintained. Off-circuit botanical trails may require higher ground clearance vehicles." 
    },
    { 
      q: "Can custom municipal heritage guides be arranged?", 
      a: "Absolutely. Local hospitality operators can coordinate private historical walking guides, river rafting specialists, and specific botanical desert excursions upon request." 
    }
  ];

  return (
    <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-b border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Accordion List Segment Grid Block */}
        <div className="lg:col-span-7">
          <span className="text-[#E8A020] text-[11px] font-black uppercase tracking-[0.2em] block mb-3">
            Planning Resources
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-gray-900 leading-tight tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <div className="h-0.5 w-12 bg-[#E8A020] mb-8 rounded-full"></div>
          
          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="border-b border-gray-100 pb-4 pt-2">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left font-serif font-bold text-gray-900 py-2 flex justify-between items-center gap-4 hover:text-[#E8A020] transition-colors duration-200 group text-sm sm:text-base"
                  >
                    <span>{faq.q}</span>
                    <i className={`fas fa-chevron-down text-[#E8A020] transition-transform duration-300 text-xs ${isOpen ? 'rotate-180' : ''}`}></i>
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pt-2' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}>
                    <div className="overflow-hidden">
                      <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed tracking-wide pr-4">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Call To Action Promo Feature Card */}
        <div className="lg:col-span-5 bg-[#1A1F2E] rounded-xl p-8 text-white text-center border border-gray-900 shadow-sm w-full">
          <div className="w-12 h-12 bg-white/[0.03] border border-white/[0.08] rounded-full flex items-center justify-center mx-auto mb-5">
            <i className="fas fa-map-marked-alt text-lg text-[#E8A020]"></i>
          </div>
          <h3 className="text-lg font-serif mb-2 font-normal">Need Tailored Assistance?</h3>
          <p className="mb-6 text-gray-400 text-xs font-medium leading-relaxed max-w-sm mx-auto tracking-wide">
            Get explicit travel coordinates, regional zoning links, or contact administrative tourism offices directly.
          </p>
          
          <div className="flex flex-col gap-2.5 max-w-xs mx-auto">
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#E8A020] hover:bg-white hover:text-gray-900 text-white font-black text-[10px] tracking-widest uppercase py-3 rounded-lg transition-all duration-300 shadow-xs"
            >
              <i className="fas fa-location-dot mr-2"></i> Open Regional Map
            </a>
            <a 
              href="mailto:info@siyathemba.gov.za?subject=Tourism%20Platform%20Inquiry"
              className="bg-transparent border border-white/[0.12] hover:border-white/40 text-gray-300 font-black text-[10px] tracking-widest uppercase py-3 rounded-lg transition-colors duration-300"
            >
              <i className="fas fa-envelope mr-2"></i> Contact Tourism Desk
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;