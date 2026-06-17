import { useState } from 'react';
import { getExperiences, getAccommodations } from '../services/dataService';

const ExploreCategories = ({ isHero = false }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    { id: 'places', icon: 'fa-map-marked-alt', label: 'Places to Go' },
    { id: 'stay', icon: 'fa-bed', label: 'Where to Stay' },
    { id: 'things', icon: 'fa-compass', label: 'Things to Do' },
    { id: 'plan', icon: 'fa-calendar-check', label: 'Plan Your Trip' },
    { id: 'wise', icon: 'fa-lightbulb', label: 'TravelWise' },
  ];

  const getDropdownContent = (categoryId) => {
    const experiences = getExperiences();
    const accommodations = getAccommodations();

    switch (categoryId) {
      case 'places':
        return {
          title: 'Explore Local Attractions',
          description: 'Uncover the hidden gems and breathtaking geographic landmarks across the destination area.',
          items: experiences.slice(0, 6).map(e => e.title),
        };
      case 'stay':
        return {
          title: 'Find Premium Accommodation',
          description: 'From luxury river lodges to historic Karoo farmstays and starry camping sites.',
          items: accommodations.slice(0, 6).map(a => a.name),
        };
      case 'things':
        return {
          title: 'Activities & Adventures',
          description: 'Curated experiences ranging from thrilling water trails to clear sky safaris.',
          items: experiences.filter(e => e.category === 'adventure' || e.category === 'wildlife').slice(0, 6).map(e => e.title),
        };
      case 'plan':
        return {
          title: 'Plan Your Perfect Visit',
          description: 'Essential logistic insights, regional travel conditions, and mapped visitor routes.',
          items: ['Best Time to Visit', 'How to Get There', 'Tourism Routes', 'Events Calendar', 'Travel Tips', 'Emergency Contacts'],
        };
      case 'wise':
        return {
          title: 'TravelWise Sustainable Tips',
          description: 'Helpful resources on exploring safely, responsibly, and protecting our natural ecosystem.',
          items: ['Pack for the Karoo', 'Stay Safe in the Sun', 'Respect Local Customs', 'Support Local Businesses', 'Leave No Trace', 'Emergency Preparedness'],
        };
      default:
        return { title: '', description: '', items: [] };
    }
  };

  const handleCategoryClick = (id) => {
    setActiveCategory(activeCategory === id ? null : id);
  };

  const handleCategoryHover = (id) => {
    setActiveCategory(id);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  const content = activeCategory ? getDropdownContent(activeCategory) : null;

  return (
    <div className="relative w-full" onMouseLeave={handleMouseLeave}>
      
      {/* Primary Category Menu Row Container */}
      <div className={`grid grid-cols-2 sm:grid-cols-5 gap-2 md:gap-4 max-w-5xl mx-auto ${
        isHero 
          ? 'bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/10 shadow-xl' 
          : 'bg-white rounded-2xl shadow-xl p-3 border border-gray-100'
      }`}>
        {categories.map((cat) => {
          const isCurrent = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              onMouseEnter={() => handleCategoryHover(cat.id)}
              className={`group flex flex-col items-center justify-center gap-3 p-4 rounded-xl transition-all duration-300 focus:outline-none relative ${
                isCurrent 
                  ? 'bg-white text-[#1A1F2E] shadow-sm' 
                  : 'hover:bg-gray-50/80 text-current'
              }`}
              aria-expanded={isCurrent}
            >
              {/* Category Circle Icon Indicator Layout */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isCurrent 
                  ? 'bg-[#E8A020] text-white' 
                  : isHero ? 'bg-white/10 text-white group-hover:bg-white/20' : 'bg-gray-100 text-[#1A1F2E] group-hover:bg-gray-200/70'
              }`}>
                <i className={`fas ${cat.icon} text-sm md:text-base`}></i>
              </div>
              
              <span className={`text-xs font-bold text-center tracking-wide uppercase transition-colors ${
                isCurrent 
                  ? 'text-[#1A1F2E]' 
                  : isHero ? 'text-white' : 'text-gray-700 group-hover:text-[#1A1F2E]'
              }`}>
                {cat.label}
              </span>

              {/* Minimalist bottom active point indicator line */}
              <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-[#E8A020] transition-all duration-300 ${
                isCurrent ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </button>
          );
        })}
      </div>

      {/* Clean Premium Overlay Dynamic Multi-Column Dropdown Panel Layout */}
      <div
        className={`absolute left-0 right-0 top-full mt-4 z-20 transition-all duration-300 ease-in-out ${
          activeCategory ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
        }`}
      >
        {activeCategory && content && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left intro text area column mimicking Cape Town Tourism style */}
            <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-6">
              <h3 className="font-serif text-2xl font-bold text-[#1A1F2E] mb-2 leading-tight">
                {content.title}
              </h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed mb-4">
                {content.description}
              </p>
              <button className="text-xs font-bold uppercase tracking-wider text-[#E8A020] hover:text-[#1A1F2E] transition-colors flex items-center gap-2 group">
                <span>View Directory</span>
                <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>

            {/* Right Multi-Column Directory Items View Grid */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              {content.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2.5 px-3 text-sm text-gray-700 hover:text-[#1A1F2E] hover:bg-gray-50 rounded-lg cursor-pointer transition-all duration-200 group/item"
                >
                  <span className="font-medium tracking-wide">{item}</span>
                  <i className="fas fa-chevron-right text-[9px] text-gray-300 group-hover/item:text-[#E8A020] group-hover/item:translate-x-1 transition-all"></i>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCategories;