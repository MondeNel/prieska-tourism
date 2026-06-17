import { useState, useEffect } from 'react';
import BookingModal from './BookingModal';
import { getExperiences } from '../services/dataService';

const filters = ["all", "wildlife", "adventure", "culture", "heritage", "nature"];

// Featured Card – large hero card with background image
const FeaturedCard = ({ experience, onBook }) => {
  return (
    <div 
      className="relative rounded-lg overflow-hidden cursor-pointer group min-h-[320px] flex flex-col justify-end p-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${experience.image || '/fallback.jpg'})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="relative z-10">
        <span className="inline-block bg-[#E8A020] text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider mb-3">
          ⭐ Signature Experience
        </span>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">{experience.title}</h3>
        <p className="text-sm text-white/80 mb-4 max-w-md">{experience.desc}</p>
        <button
          onClick={() => onBook(experience.title)}
          className="bg-[#7A3215] text-white font-bold px-5 py-2 rounded text-sm hover:bg-[#7A3215]/80 transition"
        >
          Explore {experience.category}
        </button>
      </div>
    </div>
  );
};

// Mini Featured Card – smaller side card with background image
const MiniFeaturedCard = ({ experience, onBook }) => {
  return (
    <div 
      className="relative rounded-lg overflow-hidden cursor-pointer group min-h-[148px] flex flex-col justify-end p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${experience.image || '/fallback.jpg'})` }}
      onClick={() => onBook(experience.title)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="relative z-10">
        <h4 className="font-serif text-lg font-bold text-white">{experience.title}</h4>
        <p className="text-xs text-white/70">{experience.duration}</p>
      </div>
    </div>
  );
};

// Standard Card (unchanged)
const StandardCard = ({ experience, onBook }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(experience.timeSlots?.[0] || '');

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition border border-[#7A3215]/15 group">
      <div className="relative h-44 bg-gray-100">
        <img src={experience.image || '/fallback.jpg'} alt={experience.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 bg-[#7A3215] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          {experience.category}
        </div>
        <i className={`fas ${experience.icon} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white/20`}></i>
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-bold text-[#1A1F2E] group-hover:text-[#7A3215] transition">{experience.title}</h3>
        <p className="text-xs text-[#5A4A3A] mt-1 line-clamp-2">{experience.desc}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#7A3215]/10">
          <span className="text-xs font-bold text-[#7A3215] uppercase tracking-wider cursor-pointer hover:underline">
            Explore <i className="fas fa-arrow-right ml-1"></i>
          </span>
          <span className="text-[10px] font-bold text-[#5A4A3A] bg-[#F2E8D5] px-2 py-0.5 rounded">
            {experience.duration}
          </span>
        </div>
      </div>
    </div>
  );
};

const Experiences = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [experiences, setExperiences] = useState([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  useEffect(() => {
    const loadData = () => {
      setExperiences(getExperiences());
    };
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const filtered = activeFilter === "all" 
    ? experiences 
    : experiences.filter(exp => exp.category === activeFilter);

  // Take first 3 for featured (if available)
  const featured = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  const handleBook = (experienceTitle, timeSlot) => {
    setSelectedExperience(experienceTitle);
    setSelectedTimeSlot(timeSlot || null);
    setIsBookingOpen(true);
  };

  return (
    <>
      <div id="experiences" className="container mx-auto px-4 py-12 md:py-16">
        {/* Featured Section */}
        {featured.length > 0 && (
          <div className="mb-12">
            <div className="flex justify-between items-end mb-6">
              <div>
                <div className="text-[#C8780A] text-xs font-bold uppercase tracking-widest">What's Waiting For You</div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1F2E]">Featured Experiences</h2>
              </div>
              <span className="text-xs font-bold text-[#7A3215] uppercase tracking-wider cursor-pointer hover:underline flex items-center gap-1">
                View all <i className="fas fa-arrow-right"></i>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Large card */}
              <div className="md:col-span-2">
                <FeaturedCard experience={featured[0]} onBook={handleBook} />
              </div>
              {/* Two mini cards */}
              <div className="flex flex-col gap-4">
                {featured.slice(1, 3).map((exp) => (
                  <MiniFeaturedCard
                    key={exp.id}
                    experience={exp}
                    onBook={handleBook}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filter and Grid */}
        <div>
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div>
              <div className="text-[#C8780A] text-xs font-bold uppercase tracking-widest">Browse by Category</div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1F2E]">Discover Prieska</h2>
            </div>
            <div className="flex gap-2 flex-wrap mt-2 md:mt-0">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                    activeFilter === filter
                      ? 'bg-[#7A3215] text-white'
                      : 'bg-white border border-[#7A3215]/20 text-[#5A4A3A] hover:border-[#7A3215]'
                  }`}
                >
                  {filter === 'all' ? 'All' : filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(exp => (
              <StandardCard key={exp.id} experience={exp} onBook={handleBook} />
            ))}
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => { setIsBookingOpen(false); setSelectedExperience(null); setSelectedTimeSlot(null); }}
        preselectedExperience={selectedExperience}
        preselectedTimeSlot={selectedTimeSlot}
      />
    </>
  );
};

export default Experiences;