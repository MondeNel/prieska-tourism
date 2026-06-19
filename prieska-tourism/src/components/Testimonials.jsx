const Testimonials = () => {
  const testimonials = [
    { id: 1, name: "Sarah M.", location: "Cape Town, SA", text: "Siyathemba completely stole my heart. The immense silence of the Upper Karoo at dawn and the profound warmth of the local hosts make this a spectacular wilderness retreat.", rating: 5 },
    { id: 2, name: "James K.", location: "London, UK", text: "Unforgettable stargazing along the Orange River bank! Some of the darkest, clearest night skies I've ever recorded in my travels. Highly recommended.", rating: 5 },
    { id: 3, name: "Amara N.", location: "Johannesburg, SA", text: "The deep river rafting excursions were pure adrenaline and pristine beauty. An absolute must-visit for adventure lovers tracking through the Northern Cape.", rating: 5 },
    { id: 4, name: "Lerato M.", location: "Durban, SA", text: "The ancient rock art excursions left our tour group entirely speechless. There is so much historical wealth preserved in these hills.", rating: 5 }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-3 h-3 ${i < rating ? 'text-[#E8A020]' : 'text-gray-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section id="stories" className="bg-gray-50/60 py-16 sm:py-24 px-4 sm:px-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Synchronized Header Panel */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#E8A020] text-[11px] font-black uppercase tracking-[0.2em] block mb-3">
            Guest Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-gray-900 leading-tight tracking-tight">
            Stories From Our Guests
          </h2>
          <div className="h-0.5 w-12 bg-[#E8A020] mx-auto mt-4 rounded-full"></div>
        </div>
        
        {/* Editorial Feedback Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map(t => (
            <div 
              key={t.id} 
              className="bg-white p-6 rounded-xl shadow-xs border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
            >
              <div>
                <i className="fas fa-quote-left text-[#E8A020]/20 text-xl mb-4 block group-hover:text-[#E8A020]/40 transition-colors"></i>
                <p className="text-gray-500 font-medium italic text-xs sm:text-sm mb-6 leading-relaxed">
                  "{t.text}"</p>
              </div>

              <div className="flex justify-between items-end pt-4 border-t border-gray-50">
                <div>
                  <p className="font-serif font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{t.location}</p>
                </div>
                <div className="pb-1">
                  {renderStars(t.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;