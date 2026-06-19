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

  const content = activeCategory ? getDropdownContent(activeCategory) : null;

  return (
    <div className="relative w-full" onMouseLeave={() => setActiveCategory(null)}>
      
      {/* Responsive Category Track: 
        - Horizontal swipe behavior with hidden scrollbars on mobile.
        - Flex layout on mobile avoids rigid grid spacing that clips layout structures.
      */}
      <div className={`flex md:grid md:grid-cols-5 gap-3 md:gap-4 max-w-5xl mx-auto overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory px-2 md:px-0 ${
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
              onMouseEnter={() => setActiveCategory(cat.id)}
              className={`group flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl transition-all duration-300 min-w-[110px] md:min-w-0 flex-shrink-0 snap-center focus:outline-none relative ${
                isCurrent 
                  ? 'bg-gray-50 md:bg-white text-gray-900' 
                  : 'text-current'
              }`}
              aria-expanded={isCurrent}
            >
              {/* Category Circle Icon Indicator Layout */}
              <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                isCurrent 
                  ? 'bg-[#E8A020] text-white' 
                  : isHero ? 'bg-white/10 text-white group-hover:bg-white/20' : 'bg-gray-100 text-gray-800 group-hover:bg-gray-200/60'
              }`}>
                <i className={`fas ${cat.icon} text-sm`}></i>
              </div>
              
              <span className={`text-[10px] md:text-xs font-bold text-center tracking-wider uppercase transition-colors whitespace-nowrap ${
                isCurrent 
                  ? 'text-gray-900' 
                  : isHero ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'
              }`}>
                {cat.label}
              </span>

              {/* Bottom active accent accent bar - Desktop only for sleek header design */}
              <div className={`absolute bottom-0 left-6 right-6 h-[2px] bg-[#E8A020] transition-all duration-300 hidden md:block ${
                isCurrent ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Drawer Overlay Panel */}
      <div
        className={`absolute left-0 right-0 top-full mt-3 z-50 transition-all duration-300 ease-in-out px-2 md:px-0 ${
          activeCategory ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
        }`}
      >
        {activeCategory && content && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left informational summary section */}
            <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-6">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {content.title}
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed mb-5">
                {content.description}
              </p>
              <button className="text-[11px] font-bold uppercase tracking-widest text-[#E8A020] hover:text-gray-900 transition-colors flex items-center gap-2 group">
                <span>View All Listings</span>
                <i className="fas fa-arrow-right text-[9px] group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>

            {/* Right Interactive Selection Links Grid */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              {content.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2.5 px-3 text-xs md:text-sm font-bold uppercase tracking-wider text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg cursor-pointer transition-all duration-200 group/item"
                >
                  <span>{item}</span>
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