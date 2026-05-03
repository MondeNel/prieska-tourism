const Testimonials = () => {
  const testimonials = [
    { id: 1, name: "Sarah M.", location: "Cape Town, SA", text: "Prieska stole my heart. The silence of the Karoo at dawn, the warmth of the people — this is Africa as it was meant to be experienced.", rating: 5 },
    { id: 2, name: "James K.", location: "London, UK", text: "Unforgettable stargazing! The darkest skies I've ever seen. Safari guide was world-class.", rating: 5 },
    { id: 3, name: "Amara N.", location: "Johannesburg, SA", text: "Orange River rafting was pure adrenaline and beauty. A must-do for adventure lovers.", rating: 4.9 },
    { id: 4, name: "Lerato M.", location: "Durban, SA", text: "San rock art tour gave me chills — so much history preserved. Highly recommend.", rating: 5 }
  ];

  return (
    <div id="testimonials" className="bg-[#F5EDE2] py-20 my-10">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-[#2C3E2F] mb-4">
          Stories <span className="text-[#B87333]">from Our Guests</span>
        </h2>
        <div className="h-1 w-20 bg-[#E6B17E] mx-auto rounded-full mb-12"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#B87333] hover:shadow-lg transition-all group">
              <i className="fas fa-quote-left text-[#E6B17E] text-xl mb-3 block"></i>
              <p className="text-gray-700 italic mb-4">"{t.text}"</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-[#2C3E2F]">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
                <div className="text-[#E6B17E]">
                  <i className="fas fa-star"></i> {t.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;