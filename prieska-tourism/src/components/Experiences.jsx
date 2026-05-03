import { useState } from 'react';

const experiencesData = [
  { id: 1, title: "Karoo Safari & Game Drives", category: "wildlife", icon: "fa-paw", desc: "Track the Big Five across ancient plains at golden hour. Expert guided game drives with sunset snacks.", duration: "3-4 hours", price: "ZAR 1,250", image: "wildlife" },
  { id: 2, title: "Orange River Rafting", category: "adventure", icon: "fa-water", desc: "Navigate mighty Orange River through dramatic gorges and rapids. Multi-day expeditions available.", duration: "Full day", price: "ZAR 950", image: "adventure" },
  { id: 3, title: "San Rock Art Tours", category: "culture", icon: "fa-paintbrush", desc: "10,000-year-old Bushman paintings in situ. Cultural storytelling by local San descendants.", duration: "2-3 hours", price: "ZAR 600", image: "culture" },
  { id: 4, title: "Dark Sky Observatory", category: "stargazing", icon: "fa-star", desc: "One of Africa's clearest skies — view galaxies, planets with powerful telescopes.", duration: "Evening (2hrs)", price: "ZAR 450", image: "stargazing" },
  { id: 5, title: "Diamond Fields Heritage", category: "heritage", icon: "fa-gem", desc: "Uncover the diamond rush stories. Visit historic mines and museums.", duration: "2 hours", price: "ZAR 380", image: "heritage" },
  { id: 6, title: "Namaqualand Wildflowers", category: "nature", icon: "fa-seedling", desc: "World's greatest floral spectacle each spring (Aug-Sep). Vibrant carpets of daisies.", duration: "Seasonal", price: "ZAR 520", image: "nature" }
];

const filters = ["all", "wildlife", "adventure", "culture", "stargazing", "heritage", "nature"];

const Experiences = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [bookingMessage, setBookingMessage] = useState(null);

  const filtered = activeFilter === "all"
    ? experiencesData
    : experiencesData.filter(exp => exp.category === activeFilter);

  const handleBook = (title) => {
    setBookingMessage(`✨ "${title}" requested! Our team will contact you within 24 hours.`);
    setTimeout(() => setBookingMessage(null), 3000);
  };

  return (
    <div id="experiences" className="container mx-auto px-6 py-20">
      <div className="flex flex-wrap justify-between items-center mb-12">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C3E2F] mb-4">
            Unforgettable <span className="text-[#B87333]">Experiences</span>
          </h2>
          <div className="h-1 w-20 bg-[#E6B17E] rounded-full"></div>
        </div>
        <div className="flex gap-2 flex-wrap mt-4 md:mt-0">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                activeFilter === filter
                  ? 'bg-[#B87333] text-white shadow-md'
                  : 'bg-white border border-gray-200 text-[#3D2B1A] hover:bg-[#E6B17E]/20'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {bookingMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#2C3E2F] text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 animate-bounce">
          <i className="fas fa-check-circle text-[#E6B17E]"></i>
          <span className="font-medium">{bookingMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(exp => (
          <div key={exp.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="relative h-52 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url(https://source.unsplash.com/featured/600x400?${exp.image},southafrica&sig=${exp.id})` }}>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-[#B87333]">
                <i className={`fas ${exp.icon} mr-1`}></i> {exp.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#2C3E2F] mb-2 group-hover:text-[#B87333] transition">{exp.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{exp.desc}</p>
              <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                <div>
                  <span className="text-xs text-gray-400"><i className="far fa-clock"></i> {exp.duration}</span>
                  <p className="font-bold text-[#B87333] text-lg mt-1">{exp.price}</p>
                </div>
                <button
                  onClick={() => handleBook(exp.title)}
                  className="bg-[#2C3E2F] hover:bg-[#B87333] text-white px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all"
                >
                  <i className="fas fa-calendar-check"></i> Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiences;