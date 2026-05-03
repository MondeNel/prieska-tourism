import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "What are the best times to visit Prieska?", a: "Best months: April–September for mild weather and excellent stargazing; Aug-Sep for Namaqualand flowers." },
    { q: "How do I book an experience?", a: "Click 'Book Now' on any experience card. Our team will reach out within 24 hours to confirm your booking." },
    { q: "Where can I find the best views of Prieska?", a: "Die Bos viewpoint, Prieska Kop, and along the Orange River banks at sunset." },
    { q: "What amenities are available?", a: "Lodges, guesthouses, Wi-Fi at main accommodations, restaurants, and visitor info center." },
    { q: "Is there Wi-Fi in Prieska?", a: "Yes, most lodges and cafes offer free Wi-Fi; mobile coverage is reliable." },
    { q: "Are there cultural experiences available?", a: "Absolutely — San rock art tours, diamond heritage tours, and local township experiences." }
  ];

  return (
    <div id="faq" className="container mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C3E2F] mb-4">
            Frequently Asked <span className="text-[#B87333]">Questions</span>
          </h2>
          <p className="text-gray-500 mb-6">Everything you need to plan your Karoo journey.</p>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-3">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full text-left font-semibold text-[#3D2B1A] py-2 flex justify-between items-center hover:text-[#B87333] transition"
                >
                  <span>{faq.q}</span>
                  <i className={`fas fa-chevron-down text-[#B87333] transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}></i>
                </button>
                {openIndex === idx && (
                  <p className="text-gray-600 pt-2 pl-2 text-sm animate-fade-in">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#2C3E2F] to-[#2C3E2F]/90 rounded-2xl p-8 text-white text-center transform hover:scale-105 transition-transform duration-300">
          <i className="fas fa-map-marked-alt text-5xl text-[#E6B17E] mb-4 block"></i>
          <h3 className="text-2xl font-serif mb-3">Plan Your Visit</h3>
          <p className="mb-5 text-gray-300">Get personalized recommendations and exclusive packages.</p>
          <div className="flex flex-col gap-3">
            <button className="bg-[#B87333] px-5 py-3 rounded-full text-white font-medium hover:bg-[#B87333]/80 transition-all">
              <i className="fas fa-location-dot mr-2"></i> VISIT OUR LOCATION
            </button>
            <button className="bg-transparent border border-white/40 px-5 py-3 rounded-full hover:bg-white/10 transition-all">
              <i className="fas fa-envelope mr-2"></i> CONTACT TRAVEL EXPERT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;