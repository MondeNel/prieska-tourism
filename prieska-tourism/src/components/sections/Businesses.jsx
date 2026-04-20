// src/components/sections/Businesses.jsx
import { useState } from 'react'
import SectionTitle from '../ui/SectionTitle'
import { businesses, categoryColors } from '../../data/businesses'
import { MapPin } from 'lucide-react'

const Businesses = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const categories = ['All', ...new Set(businesses.map(b => b.category))]
  
  const filteredBusinesses = selectedCategory === 'All' 
    ? businesses 
    : businesses.filter(b => b.category === selectedCategory)

  return (
    <section id="businesses" className="py-16 px-4 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900">
      <SectionTitle subtitle="EVERYTHING YOU NEED" title="Local Businesses & Amenities" />
      
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto -mt-6 mb-8">
        From fuel stops to fashion, Prieska has all the essentials for a comfortable stay or permanent move.
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === category
                ? 'bg-prieska-terracotta text-white dark:bg-prieska-terracotta'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.map(business => {
          const IconComponent = business.icon
          return (
            <div 
              key={business.id} 
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-100 dark:border-gray-700 flex flex-col"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-prieska-sand/30 dark:bg-gray-700 rounded-xl">
                  <IconComponent size={28} className="text-prieska-terracotta dark:text-prieska-terracotta" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif font-bold text-gray-800 dark:text-white mb-1">
                    {business.name}
                  </h3>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${categoryColors[business.category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                    {business.category}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-4 mb-3 flex-1">
                {business.description}
              </p>
              
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <MapPin size={14} className="mr-1 text-prieska-terracotta dark:text-prieska-terracotta flex-shrink-0" />
                <span>{business.location}</span>
              </div>
            </div>
          )
        })}
      </div>

      {filteredBusinesses.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No businesses found in this category.</p>
      )}
    </section>
  )
}

export default Businesses