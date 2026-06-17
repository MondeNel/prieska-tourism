const BusinessDirectory = () => {
  const categories = [
    { id: 1, name: 'Accommodation', icon: 'fa-bed', count: '16 listed', premium: true },
    { id: 2, name: 'Restaurants & Cafés', icon: 'fa-utensils', count: '9 listed', premium: false },
    { id: 3, name: 'Adventure Operators', icon: 'fa-fire', count: '8 listed', premium: false },
    { id: 4, name: 'Hunting & Game Farms', icon: 'fa-crosshairs', count: '11 listed', premium: true },
    { id: 5, name: 'Heritage Sites', icon: 'fa-landmark', count: '14 listed', premium: false },
    { id: 6, name: 'Agri-Tourism', icon: 'fa-seedling', count: '6 listed', premium: false },
    { id: 7, name: 'Events & Venues', icon: 'fa-calendar-alt', count: '7 listed', premium: false },
  ];

  return (
    <div className="bg-[#FBF6EE] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div>
            <div className="text-[#C8780A] text-xs font-bold uppercase tracking-widest">Local Business Directory</div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1F2E]">Find & Book</h2>
          </div>
          <span className="text-xs font-bold text-[#7A3215] uppercase tracking-wider cursor-pointer hover:underline flex items-center gap-1">
            All businesses <i className="fas fa-arrow-right"></i>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`bg-white rounded-lg p-5 flex flex-col items-center text-center gap-2 cursor-pointer hover:border-[#7A3215] transition border ${
                cat.premium ? 'border-[#C8780A]' : 'border-[#7A3215]/15'
              }`}
            >
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                cat.premium ? 'bg-[#FDF6E3]' : 'bg-[#F2E8D5]'
              }`}>
                <i className={`fas ${cat.icon} text-xl ${cat.premium ? 'text-[#C8780A]' : 'text-[#7A3215]'}`}></i>
              </div>
              <div className="font-serif font-bold text-sm text-[#1A1F2E]">{cat.name}</div>
              <div className="text-xs font-bold text-[#5A4A3A]">{cat.count}</div>
              {cat.premium && (
                <span className="text-[9px] font-bold bg-[#C8780A] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">✦ Premium</span>
              )}
            </div>
          ))}

          {/* Add New Business Card */}
          <div className="bg-transparent rounded-lg p-5 flex flex-col items-center text-center gap-2 border border-dashed border-[#7A3215]/15 cursor-pointer hover:border-[#7A3215] transition justify-center">
            <div className="w-11 h-11 rounded-lg bg-[#7A3215] flex items-center justify-center">
              <i className="fas fa-plus text-white text-xl"></i>
            </div>
            <div className="font-serif font-bold text-sm text-[#1A1F2E]">List Your Business</div>
            <div className="text-xs font-bold text-[#7A3215]">Free · Premium · Platinum</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDirectory;