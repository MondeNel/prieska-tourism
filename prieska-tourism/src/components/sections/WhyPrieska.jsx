// src/components/sections/WhyPrieska.jsx
import React from 'react';
import { Compass, Eye, Heart, Star } from 'lucide-react';

const WhyPrieska = () => {
  const reasons = [
    {
      icon: <Compass className="w-8 h-8" />,
      title: "The Road Less Traveled",
      description: "Escape the crowds and discover an authentic South African experience that few travelers ever find."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Optical Illusion Wonder",
      description: "Stand at Wonderdraai and watch the Orange River appear to flow uphill – a natural marvel you have to see to believe."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Stories in Stone",
      description: "From ancient San rock art to a fort built of tiger's eye, history is not in a museum – it's under your feet."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Genuine Karoo Warmth",
      description: "Our guesthouses aren't just beds; they're homes where you'll be welcomed like family."
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-prieska-sand to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-prieska-terracotta dark:text-prieska-terracotta font-semibold uppercase tracking-wider">
          Why make the journey?
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 dark:text-white mt-2 mb-4">
          Prieska is Different.
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          In a world of over-touristed spots, Prieska offers something rare: <span className="font-semibold">space to breathe, stories to hear, and beauty that surprises.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-prieska-terracotta dark:text-prieska-terracotta mb-4 flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-serif font-bold mb-2 text-gray-800 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPrieska;