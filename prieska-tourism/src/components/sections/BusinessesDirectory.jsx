// src/components/sections/BusinessesDirectory.jsx
import { useState, useEffect } from 'react'
import { businesses, categoryColors } from '../../data/businesses'
import { MapPin, Phone, Image } from 'lucide-react'
import BusinessSkeleton from '../ui/skeletons/BusinessSkeleton'
import AddBusinessModal from '../ui/AddBusinessModal'

const BusinessesDirectory = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  
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
    <div className="space-y-4">
      {/* Post Composer */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
            B
          </div>
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400">
            Add your business or recommend a local service...
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-gray-100 dark:border-gray-700 pt-3">
          <button className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-prieska-terracotta transition px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Image className="w-4 h-4" />
            Photo
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="ml-auto bg-prieska-terracotta text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-opacity-90 transition"
          >
            Add Business
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              selectedCategory === category
                ? 'bg-prieska-terracotta text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-prieska-terracotta'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Businesses Grid */}
      <div className="grid grid-cols-1 gap-3">
        {filteredBusinesses.map(business => {
          const IconComponent = business.icon
          return (
            <div 
              key={business.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <IconComponent className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                      {business.name}
                    </h3>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${categoryColors[business.category] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                      {business.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed mb-2">
                    {business.description}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {business.location}
                    </span>
                    {business.contact && (
                      <a href={`tel:${business.contact.replace(/\s/g, '')}`} className="flex items-center gap-1 text-prieska-terracotta hover:underline">
                        <Phone className="w-3 h-3" />
                        {business.contact}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredBusinesses.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
          No businesses found in this category.
        </p>
      )}

      {/* Add Business Modal */}
      <AddBusinessModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  )
}

export default BusinessesDirectory