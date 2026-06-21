const BusinessDirectory = ({ onListClick }) => {
  const categories = [
    { name: 'Accommodation', icon: 'fa-bed', count: 16, premium: true },
    { name: 'Restaurants & Cafés', icon: 'fa-utensils', count: 9, premium: false },
    { name: 'Adventure Operators', icon: 'fa-fire', count: 8, premium: false },
    { name: 'Hunting & Game Farms', icon: 'fa-bullseye', count: 11, premium: true },
    { name: 'Heritage Sites', icon: 'fa-landmark', count: 14, premium: false },
    { name: 'Agri-Tourism', icon: 'fa-seedling', count: 6, premium: false },
    { name: 'Events & Venues', icon: 'fa-calendar-alt', count: 7, premium: false },
    { name: 'List Your Business', icon: 'fa-plus', count: '', premium: false, isCta: true },
  ];

  return (
    <div className="bg-[#FBF6EE] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="text-[#C8780A] text-xs font-bold uppercase tracking-widest">Local Business Directory</div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1F2E]">Find & Book</h2>
          </div>
          <span className="text-xs font-bold text-[#7A3215] uppercase tracking-wider cursor-pointer hover:underline flex items-center gap-1">
            All businesses <i className="fas fa-arrow-right"></i>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => cat.isCta && onListClick ? onListClick() : null}
              className={`bg-white rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition border ${
                cat.premium ? 'border-[#C8780A]' : cat.isCta ? 'border-dashed border-[#7A3215]/30 bg-amber-50/20' : 'border-[#7A3215]/15'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg mx-auto flex items-center justify-center ${
                  cat.isCta ? 'bg-[#7A3215]' : 'bg-[#F2E8D5]'
                }`}
              >
                <i className={`fas ${cat.icon} ${cat.isCta ? 'text-white' : 'text-[#7A3215]'} text-xl`}></i>
              </div>
              <div className="font-serif font-bold text-sm text-[#1A1F2E] mt-2">{cat.name}</div>
              {!cat.isCta && <div className="text-xs text-[#5A4A3A] font-bold">{cat.count} listed</div>}
              {cat.premium && (
                <span className="inline-block mt-1 text-[9px] font-bold bg-[#C8780A] text-white px-2 py-0.5 rounded uppercase tracking-wider">
                  ✦ Premium
                </span>
              )}
              {cat.isCta && (
                <div className="text-xs text-[#7A3215] font-bold mt-1">Free · Premium · Platinum</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessDirectory;