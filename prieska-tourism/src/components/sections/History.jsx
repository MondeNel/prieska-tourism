// src/components/sections/History.jsx
import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { historyTimeline } from '../../data/historyData';
import { Sparkles } from 'lucide-react';

const History = () => {
  return (
    <section id="history" className="py-12 md:py-16 px-4 max-w-7xl mx-auto bg-white dark:bg-gray-900">
      <SectionTitle 
        subtitle="STORIES THAT STAY WITH YOU" 
        title="A Land of Legends & Legacy" 
      />
      
      <p className="text-center text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto -mt-4 md:-mt-6 mb-8 md:mb-12">
        Prieska isn't just a dot on the map. It's a place where whispers of ancient peoples echo in the canyons, and where a river's bend defies logic. Come write your own chapter.
      </p>

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 md:w-1 bg-prieska-sand dark:bg-gray-700 hidden md:block"></div>

        {historyTimeline.map((item, index) => (
          <div 
            key={item.id} 
            className={`flex flex-col md:flex-row items-center mb-8 md:mb-12 relative ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 md:w-6 md:h-6 bg-prieska-terracotta rounded-full border-2 md:border-4 border-white dark:border-gray-900 shadow-md z-10 hidden md:block"></div>
            
            <div className="md:w-1/2 p-3 md:p-4 lg:p-6">
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-prieska-terracotta group">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <span className="bg-prieska-terracotta text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-sm">
                    {item.year}
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-prieska-river dark:text-prieska-river uppercase tracking-wide">
                    {item.era}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-serif font-bold mb-2 md:mb-3 text-gray-800 dark:text-white group-hover:text-prieska-terracotta dark:group-hover:text-prieska-terracotta transition">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed">{item.description}</p>
                {item.era === "Ancient Origins" && (
                  <div className="mt-3 md:mt-4 flex items-center text-prieska-terracotta text-xs md:text-sm font-medium">
                    <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1" /> Still visible in rock art sites nearby
                  </div>
                )}
                {item.era === "War & Remembrance" && (
                  <div className="mt-3 md:mt-4 flex items-center text-prieska-terracotta text-xs md:text-sm font-medium">
                    <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1" /> Walk the fort walls & touch tiger's eye stone
                  </div>
                )}
                {item.era === "Modern Prieska" && (
                  <div className="mt-3 md:mt-4 flex items-center text-prieska-terracotta text-xs md:text-sm font-medium">
                    <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1" /> Come experience "Siyathemba" – Our Hope
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default History;