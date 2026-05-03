const Gallery = () => {
  const galleryImages = [
    "https://images.pexels.com/photos/258117/pexels-photo-258117.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/21483/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1118867/pexels-photo-1118867.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  return (
    <div id="gallery" className="container mx-auto px-6 py-16">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-[#2C3E2F] mb-4">
        Gallery of <span className="text-[#B87333]">Prieska</span>
      </h2>
      <div className="h-1 w-20 bg-[#E6B17E] mx-auto rounded-full mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((img, idx) => (
          <div key={idx} className="relative group overflow-hidden rounded-xl shadow-md">
            <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <i className="fas fa-search-plus text-white text-3xl"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;