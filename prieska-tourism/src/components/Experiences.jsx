import { useState } from 'react';
import BookingModal from './BookingModal';

const experiencesData = [
  {
    id: 1,
    title: "Karoo Safari",
    category: "wildlife",
    icon: "fa-paw",
    desc: "Track the Big Five across ancient plains at golden hour. Expert guided game drives with sunset snacks.",
    duration: "3-4 hrs",
    price: "ZAR 1,250",
    image: "/karoo_image1.jpg",
    fallback: "/karoo_image1.jpg"
  },
  {
    id: 2,
    title: "Orange River Rafting",
    category: "adventure",
    icon: "fa-water",
    desc: "Navigate mighty Orange River through dramatic gorges and rapids. Multi‑day expeditions available.",
    duration: "Full day",
    price: "ZAR 950",
    image: "/karoo_river-rafting.jpg",
    fallback: "/karoo_river-rafting.jpg"
  },
  {
    id: 3,
    title: "San Rock Art Tours",
    category: "culture",
    icon: "fa-paintbrush",
    desc: "10,000‑year‑old Bushman paintings in situ. Cultural storytelling by local San descendants.",
    duration: "2-3 hrs",
    price: "ZAR 600",
    image: "/karoo_image2.jpg",
    fallback: "/karoo_image2.jpg"
  },
  {
    id: 4,
    title: "Wild Animal Hunting",
    category: "wildlife",
    icon: "fa-paw",
    desc: "Experience the thrill of ethical, guided hunting excursions in the vast Karoo plains. Professional trackers ensure a safe and respectful adventure.",
    duration: "Full day",
    price: "ZAR 2,500",
    image: "/karoo_image3.jpg",
    fallback: "/karoo_image3.jpg"
  },
  {
    id: 5,
    title: "Prieska Heritage",
    category: "heritage",
    icon: "fa-gem",
    desc: "Uncover the rich diamond rush stories, visit historic mines, and explore the cultural legacy of Prieska.",
    duration: "2-3 hrs",
    price: "ZAR 380",
    image: "/prieska-koppie.jpg",
    fallback: "/prieska-koppie.jpg"
  },
  {
    id: 6,
    title: "Prieska Town",
    category: "nature",
    icon: "fa-seedling",
    desc: "Discover the charm of Prieska town – stroll through local markets, enjoy Karoo hospitality, and experience daily life in the Northern Cape.",
    duration: "Flexible",
    price: "ZAR 250",
    image: "/prieska-town.jpg",
    fallback: "/prieska-town.jpg"
  }
];

const filters = ["all", "wildlife", "adventure", "culture", "heritage", "nature"];

const ExperienceCard = ({ experience, onBook }) => {
  const [imgSrc, setImgSrc] = useState(experience.image);

  const handleImageError = () => {
    setImgSrc(experience.fallback);
  };

  return (
    <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
      <div className="relative h-44 md:h-52 overflow-hidden bg-gray-100">
        <img
          src={imgSrc}
          alt={experience.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 md:px-3 py-0.5 md:py-1 text-[9px] md:text-xs font-bold text-[#B87333] z-10">
          <i className={`fas ${experience.icon} mr-1 text-[8px] md:text-xs`}></i> {experience.category}
        </div>
      </div>
      <div className="p-4 md:p-6">
        <h3 className="text-base md:text-xl font-bold text-[#2C3E2F] mb-1 md:mb-2 group-hover:text-[#B87333] transition line-clamp-1">
          {experience.title}
        </h3>
        <p className="text-gray-600 text-[11px] md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">
          {experience.desc}
        </p>
        <div className="flex justify-between items-center border-t border-gray-100 pt-3 md:pt-4">
          <div>
            <span className="text-[9px] md:text-xs text-gray-400">
              <i className="far fa-clock"></i> {experience.duration}
            </span>
            <p className="font-bold text-[#B87333] text-sm md:text-lg mt-0.5 md:mt-1">{experience.price}</p>
          </div>
          <button
            onClick={() => onBook(experience.title)}
            className="bg-[#2C3E2F] hover:bg-[#B87333] text-white px-3 md:px-5 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-sm font-semibold flex items-center gap-1 md:gap-2 transition-all"
          >
            <i className="fas fa-calendar-check text-[8px] md:text-xs"></i>
            <span>Book</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Experiences = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const filtered = activeFilter === "all"
    ? experiencesData
    : experiencesData.filter(exp => exp.category === activeFilter);

  const handleBook = (experienceTitle) => {
    setSelectedExperience(experienceTitle);
    setIsBookingOpen(true);
  };

  return (
    <>
      <div id="experiences" className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-12">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="section-title">
              Unforgettable <span className="text-[#B87333]">Experiences</span>
            </h2>
            <div className="h-1 w-20 bg-[#E6B17E] rounded-full mx-auto sm:mx-0"></div>
          </div>
          <div className="flex gap-1.5 md:gap-2 flex-wrap justify-center">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2.5 md:px-5 py-1 md:py-2 rounded-full text-[10px] md:text-sm font-medium transition-all capitalize ${
                  activeFilter === filter
                    ? 'bg-[#B87333] text-white shadow-md'
                    : 'bg-white border border-gray-200 text-[#3D2B1A] hover:bg-[#E6B17E]/20'
                }`}
              >
                {filter === 'all' ? 'All' : filter.slice(0, 4)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {filtered.map(exp => (
            <ExperienceCard key={exp.id} experience={exp} onBook={handleBook} />
          ))}
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedExperience(null);
        }}
        preselectedExperience={selectedExperience}
      />
    </>
  );
};

export default Experiences;