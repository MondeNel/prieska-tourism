const Gallery = () => {
  // Using the same local images you placed in public folder
  const galleryImages = [
    { url: "/karoo_image1.jpg", title: "Karoo Landscape" },
    { url: "/karoo_image2.jpg", title: "San Rock Art" },
    { url: "/karoo_image3.jpg", title: "Starry Karoo Sky" },
    { url: "/karoo_river-rafting.jpg", title: "Orange River Rafting" },
    { url: "/prieska-koppie.jpg", title: "Prieska Koppie" },
    { url: "/prieska-town.jpg", title: "Prieska Town" }
  ];

  return (
    <div id="gallery" className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#2C3E2F] mb-3">
        Gallery of <span className="text-[#B87333]">Prieska</span>
      </h2>
      <div className="h-1 w-20 bg-[#E6B17E] mx-auto rounded-full mb-8 md:mb-12"></div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {galleryImages.map((img, idx) => (
          <div key={idx} className="relative group overflow-hidden rounded-xl shadow-md aspect-[4/3]">
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
              <p className="text-white font-medium text-sm md:text-base bg-black/50 px-3 py-1 rounded-full">
                {img.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;