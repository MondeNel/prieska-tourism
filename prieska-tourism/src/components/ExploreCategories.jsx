const ExploreCategories = () => {
  const categories = [
    { icon: 'fa-map-marked-alt', label: 'Places to Go', color: '#7A3215' },
    { icon: 'fa-bed', label: 'Areas to Stay', color: '#C8780A' },
    { icon: 'fa-compass', label: 'Things to Do', color: '#1A1F2E' },
    { icon: 'fa-calendar-check', label: 'Plan Your Trip', color: '#7A3215' },
    { icon: 'fa-lightbulb', label: 'TravelWise', color: '#C8780A' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className="flex flex-col items-center justify-center p-4 md:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer border border-[#7A3215]/10 hover:border-[#7A3215]/30"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: cat.color + '20' }}>
              <i className={`fas ${cat.icon} text-lg md:text-xl`} style={{ color: cat.color }}></i>
            </div>
            <span className="text-xs md:text-sm font-bold text-[#1A1F2E] text-center">{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCategories;