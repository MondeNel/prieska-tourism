// src/components/sections/History.jsx
import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { historyTimeline } from '../../data/historyData';
import { Sparkles } from 'lucide-react';

const History = () => {
  return (
    <section id="history" className="py-16 px-4 max-w-7xl mx-auto bg-white dark:bg-gray-900">
      <SectionTitle 
        subtitle="STORIES THAT STAY WITH YOU" 
        title="A Land of Legends & Legacy" 
      />
      
      <p className="text-center text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto -mt-6 mb-12">
        Prieska isn't just a dot on the map. It's a place where whispers of ancient peoples echo in the canyons, and where a river's bend defies logic. Come write your own chapter.
      </p>

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-prieska-sand dark:bg-gray-700 hidden md:block"></div>

        {historyTimeline.map((item, index) => (
          <div 
            key={item.id} 
            className={`flex flex-col md:flex-row items-center mb-12 relative ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-prieska-terracotta rounded-full border-4 border-white dark:border-gray-900 shadow-md z-10 hidden md:block"></div>
            
            <div className="md:w-1/2 p-4 md:p-6">
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-prieska-terracotta group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-prieska-terracotta text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {item.year}
                  </span>
                  <span className="text-sm font-semibold text-prieska-river dark:text-prieska-river uppercase tracking-wide">
                    {item.era}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 text-gray-800 dark:text-white group-hover:text-prieska-terracotta dark:group-hover:text-prieska-terracotta transition">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                {item.era === "Ancient Origins" && (
                  <div className="mt-4 flex items-center text-prieska-terracotta text-sm font-medium">
                    <Sparkles size={16} className="mr-1" /> Still visible in rock art sites nearby
                  </div>
                )}
                {item.era === "War & Remembrance" && (
                  <div className="mt-4 flex items-center text-prieska-terracotta text-sm font-medium">
                    <Sparkles size={16} className="mr-1" /> Walk the fort walls & touch tiger's eye stone
                  </div>
                )}
                {item.era === "Modern Prieska" && (
                  <div className="mt-4 flex items-center text-prieska-terracotta text-sm font-medium">
                    <Sparkles size={16} className="mr-1" /> Come experience "Siyathemba" – Our Hope
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