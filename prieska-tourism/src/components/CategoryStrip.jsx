import { useState } from 'react';

const categories = [
  { id: 'all', label: 'All', icon: 'fa-compass' },
  { id: 'stay', label: 'Stay', icon: 'fa-bed' },
  { id: 'adventure', label: 'Adventure', icon: 'fa-fire' },
  { id: 'stargazing', label: 'Stargazing', icon: 'fa-star' },
  { id: 'dining', label: 'Dining', icon: 'fa-utensils' },
  { id: 'heritage', label: 'Heritage', icon: 'fa-landmark' },
  { id: 'farming', label: 'Farming', icon: 'fa-seedling' },
  { id: 'events', label: 'Events', icon: 'fa-calendar-alt' },
];

const CategoryStrip = ({ onCategorySelect }) => {
  const [active, setActive] = useState('all');

  const handleClick = (id) => {
    setActive(id);
    if (onCategorySelect) onCategorySelect(id);
  };

  return (
    <div className="bg-[#FBF6EE] border-b border-[#7A3215]/15">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-0 overflow-x-auto py-2 md:py-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`flex flex-col items-center gap-1 px-3 md:px-5 py-2 md:py-4 border-b-2 transition-all duration-200 flex-shrink-0 ${
                active === cat.id
                  ? 'border-[#7A3215] text-[#7A3215]'
                  : 'border-transparent text-[#5A4A3A] hover:text-[#7A3215] hover:border-[#7A3215]/30'
              }`}
            >
              <i className={`fas ${cat.icon} text-lg md:text-2xl`}></i>
              <span className="text-[9px] md:text-xs font-bold uppercase tracking-wider">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryStrip;