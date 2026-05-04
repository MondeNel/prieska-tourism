import { useState, useEffect } from 'react';
import BookingModal from './BookingModal';
import { getExperiences } from '../services/dataService';

const filters = ["all", "wildlife", "adventure", "culture", "heritage", "nature"];

const ExperienceCard = ({ experience, onBook }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(experience.timeSlots?.[0] || '');

  return (
    <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
      <div className="relative h-44 md:h-52 overflow-hidden bg-gray-100">
        <img 
          src={experience.image} 
          alt={experience.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          loading="lazy" 
          onError={(e) => { e.target.src = experience.fallback; }} 
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 md:px-3 py-0.5 md:py-1 text-[9px] md:text-xs font-bold text-[#B87333] z-10">
          <i className={`fas ${experience.icon} mr-1`}></i> {experience.category}
        </div>
      </div>
      <div className="p-4 md:p-6">
        <h3 className="text-base md:text-xl font-bold text-[#2C3E2F] mb-1 md:mb-2 group-hover:text-[#B87333] transition">{experience.title}</h3>
        <p className="text-gray-600 text-[11px] md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">{experience.desc}</p>
        <div className="mb-3">
          <label className="block text-[10px] md:text-xs font-medium text-gray-600 mb-1"><i className="far fa-clock mr-1"></i> Preferred time:</label>
          <select value={selectedTimeSlot} onChange={(e) => setSelectedTimeSlot(e.target.value)} className="w-full px-2 py-1.5 md:px-3 md:py-2 text-[10px] md:text-xs border rounded-lg focus:border-[#B87333] outline-none">
            {experience.timeSlots?.map((slot, idx) => <option key={idx} value={slot}>{slot}</option>)}
          </select>
        </div>
        <div className="flex justify-between items-center border-t border-gray-100 pt-3 md:pt-4">
          <div>
            <span className="text-[9px] md:text-xs text-gray-400"><i className="far fa-clock"></i> {experience.duration}</span>
            <p className="font-bold text-[#B87333] text-sm md:text-lg mt-0.5">{experience.price}</p>
          </div>
          <button onClick={() => onBook(experience.title, selectedTimeSlot)} className="bg-[#2C3E2F] hover:bg-[#B87333] text-white px-3 md:px-5 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-sm font-semibold flex items-center gap-1 md:gap-2 transition-all">
            <i className="fas fa-calendar-check"></i> Book
          </button>
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

  const filtered = activeFilter === "all" ? experiences : experiences.filter(exp => exp.category === activeFilter);

  const handleBook = (experienceTitle, timeSlot) => {
    setSelectedExperience(experienceTitle);
    setSelectedTimeSlot(timeSlot);
    setIsBookingOpen(true);
  };

  return (
    <>
      <div id="experiences" className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-12">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="section-title">Unforgettable <span className="text-[#B87333]">Experiences</span></h2>
            <div className="h-1 w-20 bg-[#E6B17E] rounded-full mx-auto sm:mx-0"></div>
          </div>
          <div className="flex gap-1.5 md:gap-2 flex-wrap justify-center">
            {filters.map(filter => (
              <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-2.5 md:px-5 py-1 md:py-2 rounded-full text-[10px] md:text-sm font-medium transition-all capitalize ${activeFilter === filter ? 'bg-[#B87333] text-white shadow-md' : 'bg-white border border-gray-200 text-[#3D2B1A] hover:bg-[#E6B17E]/20'}`}>
                {filter === 'all' ? 'All' : filter.slice(0, 4)}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {filtered.map(exp => <ExperienceCard key={exp.id} experience={exp} onBook={handleBook} />)}
        </div>
      </div>
      <BookingModal isOpen={isBookingOpen} onClose={() => { setIsBookingOpen(false); setSelectedExperience(null); setSelectedTimeSlot(null); }} preselectedExperience={selectedExperience} preselectedTimeSlot={selectedTimeSlot} />
    </>
  );
};

export default Experiences;