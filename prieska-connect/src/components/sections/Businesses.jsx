// src/components/sections/Businesses.jsx
import { useState, useEffect } from 'react'
import SectionTitle from '../ui/SectionTitle'
import { businesses, categoryColors } from '../../data/businesses'
import { MapPin } from 'lucide-react'
import BusinessSkeleton from '../ui/skeletons/BusinessSkeleton'

const Businesses = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  
  const categories = ['All', ...new Set(businesses.map(b => b.category))]
  
  const filteredBusinesses = selectedCategory === 'All' 
    ? businesses 
    : businesses.filter(b => b.category === selectedCategory)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <BusinessSkeleton count={6} />
  }

  return (
    <section id="businesses" className="py-12 md:py-16 px-4 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900">
      <SectionTitle subtitle="EVERYTHING YOU NEED" title="Local Businesses & Amenities" />
      
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto -mt-4 md:-mt-6 mb-6 md:mb-8 text-sm md:text-base">
        From fuel stops to fashion, Prieska has all the essentials for a comfortable stay or permanent move.
      </p>

      <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-8 md:mb-10">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition ${
              selectedCategory === category
                ? 'bg-prieska-terracotta text-white dark:bg-prieska-terracotta'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredBusinesses.map(business => {
          const IconComponent = business.icon
          return (
            <div 
              key={business.id} 
              className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition border border-gray-100 dark:border-gray-700 flex flex-col"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-prieska-sand/30 dark:bg-gray-700 rounded-lg md:rounded-xl">
                  <IconComponent className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-prieska-terracotta dark:text-prieska-terracotta" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg lg:text-xl font-serif font-bold text-gray-800 dark:text-white mb-0.5 md:mb-1">
                    {business.name}
                  </h3>
                  <span className={`inline-block px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold ${categoryColors[business.category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                    {business.category}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mt-3 md:mt-4 mb-2 md:mb-3 flex-1">
                {business.description}
              </p>
              
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-2 pt-2 md:pt-3 border-t border-gray-100 dark:border-gray-700">
                <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1 text-prieska-terracotta dark:text-prieska-terracotta flex-shrink-0" />
                <span>{business.location}</span>
              </div>
            </div>
          )
        })}
      </div>

      {filteredBusinesses.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8 text-sm md:text-base">No businesses found in this category.</p>
      )}
    </section>
  )
}

export default Businesses