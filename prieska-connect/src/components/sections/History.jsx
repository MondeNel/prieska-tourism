// src/components/sections/History.jsx
import React, { useState, useEffect } from 'react';
import { historyTimeline } from '../../data/historyData';
import { Landmark, Sparkles } from 'lucide-react';

const HistorySkeleton = () => (
  <div className="space-y-3">
    <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-4 animate-pulse">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 bg-white/20 rounded" />
        <div className="h-3 bg-white/20 rounded w-32" />
      </div>
      <div className="h-6 bg-white/20 rounded w-3/4 mb-1" />
      <div className="h-3 bg-white/20 rounded w-full" />
      <div className="h-3 bg-white/20 rounded w-2/3 mt-1" />
    </div>
    {Array(4).fill(0).map((_, i) => (
      <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 animate-pulse">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12" />
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
      </div>
    ))}
  </div>
)

const History = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(timer) }, [])
  if (loading) return <HistorySkeleton />

  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Landmark className="w-5 h-5" />
          <p className="text-[10px] uppercase tracking-wider text-white/80 font-medium">Stories That Stay With You</p>
        </div>
        <h2 className="text-xl font-serif font-bold mb-1">A Land of Legends & Legacy</h2>
        <p className="text-white/80 text-xs leading-relaxed">Prieska isn't just a dot on the map. It's a place where whispers of ancient peoples echo in the canyons, and where a river's bend defies logic.</p>
      </div>
      {historyTimeline.map((item) => (
        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full uppercase tracking-wider">{item.era}</span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500">{item.year}</span>
          </div>
          <h3 className="text-base font-serif font-bold text-gray-800 dark:text-white mb-1.5">{item.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">{item.description}</p>
          {(item.era === "Ancient Origins" || item.era === "War & Remembrance" || item.era === "Mining Boom" || item.era === "Your Adventure Awaits") && (
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md">
              <Sparkles className="w-3 h-3" />
              {item.era === "Ancient Origins" && "Still visible in rock art sites nearby"}
              {item.era === "War & Remembrance" && "Walk the fort walls & touch tiger's eye stone"}
              {item.era === "Mining Boom" && "The mine's legacy lives on in the town's character"}
              {item.era === "Your Adventure Awaits" && 'Come experience "Siyathemba" – Our Hope'}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default History