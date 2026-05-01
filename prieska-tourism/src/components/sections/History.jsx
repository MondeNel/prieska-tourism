// src/components/sections/History.jsx
import React from 'react';
import { historyTimeline } from '../../data/historyData';
import { MapPin, Clock, Sparkles, Landmark } from 'lucide-react';

const History = () => {
  return (
    <div className="space-y-4">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">STORIES THAT STAY WITH YOU</span>
          </div>
        </div>
        <h2 className="text-2xl font-serif font-bold mb-2">A Land of Legends & Legacy</h2>
        <p className="text-white/90 text-sm leading-relaxed">
          Prieska isn't just a dot on the map. It's a place where whispers of ancient peoples echo in the canyons, and where a river's bend defies logic. Come write your own chapter.
        </p>
      </div>

      {/* Timeline Cards */}
      {historyTimeline.map((item, index) => (
        <div 
          key={item.id} 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          {/* Card Header */}
          <div className="p-4 pb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                    {item.era}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">•</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.year}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="px-4 pb-4">
            <h3 className="text-lg font-serif font-bold text-gray-800 dark:text-white mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {item.description}
            </p>
            
            {/* Highlight tags */}
            {item.era === "Ancient Origins" && (
              <div className="mt-3 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg">
                <Sparkles className="w-3.5 h-3.5" />
                Still visible in rock art sites nearby
              </div>
            )}
            {item.era === "War & Remembrance" && (
              <div className="mt-3 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg">
                <Sparkles className="w-3.5 h-3.5" />
                Walk the fort walls & touch tiger's eye stone
              </div>
            )}
            {item.era === "Your Adventure Awaits" && (
              <div className="mt-3 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg">
                <Sparkles className="w-3.5 h-3.5" />
                Come experience "Siyathemba" – Our Hope
              </div>
            )}
          </div>

          {/* Card Actions (Like, Comment, Share) */}
          <div className="flex items-center border-t border-gray-100 dark:border-gray-700">
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
              ❤️ Like
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition border-x border-gray-100 dark:border-gray-700">
              💬 Comment
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
              ↗️ Share
            </button>
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-4">
        <MapPin className="w-3 h-3 inline mr-1" />
        Prieska, Northern Cape • Established 1878
      </div>
    </div>
  )
}

export default History