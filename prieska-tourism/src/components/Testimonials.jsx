const Testimonials = () => {
  const testimonials = [
    { id: 1, name: "Sarah M.", location: "Cape Town, SA", text: "Prieska stole my heart. The silence of the Karoo at dawn, the warmth of the people — this is Africa as it was meant to be experienced.", rating: 5 },
    { id: 2, name: "James K.", location: "London, UK", text: "Unforgettable stargazing! The darkest skies I've ever seen. Safari guide was world-class.", rating: 5 },
    { id: 3, name: "Amara N.", location: "Johannesburg, SA", text: "Orange River rafting was pure adrenaline and beauty. A must-do for adventure lovers.", rating: 5 },
    { id: 4, name: "Lerato M.", location: "Durban, SA", text: "San rock art tour gave me chills — so much history preserved. Highly recommend.", rating: 5 }
  ];

  // Helper to render gold stars
  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-3 h-3 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
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
    <div id="testimonials" className="bg-[#F5EDE2] py-16 md:py-20 my-8 md:my-10">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#2C3E2F] mb-3">
          Stories <span className="text-[#B87333]">from Our Guests</span>
        </h2>
        <div className="h-1 w-20 bg-[#E6B17E] mx-auto rounded-full mb-8 md:mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white p-5 md:p-6 rounded-xl shadow-sm border-l-4 border-[#B87333] hover:shadow-md transition-all group">
              <i className="fas fa-quote-left text-[#E6B17E] text-xl mb-3 block"></i>
              <p className="text-gray-700 italic text-xs md:text-sm mb-4 leading-relaxed">"{t.text}"</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-[#2C3E2F] text-sm md:text-base">{t.name}</p>
                  <p className="text-[10px] md:text-xs text-gray-400">{t.location}</p>
                </div>
                {renderStars(t.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;