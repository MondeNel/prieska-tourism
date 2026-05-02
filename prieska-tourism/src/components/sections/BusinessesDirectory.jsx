// src/components/sections/BusinessesDirectory.jsx
import { useState, useEffect } from 'react'
import { businesses, categoryColors } from '../../data/businesses'
import { MapPin, Phone, Plus } from 'lucide-react'
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

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 600); return () => clearTimeout(timer) }, [])
  if (loading) return <BusinessSkeleton count={6} />

  return (
    <div className="space-y-3">
      <button onClick={() => setShowAddModal(true)} className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4 flex items-center gap-2 sm:gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition group">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white"><Plus className="w-4 h-4 sm:w-5 sm:h-5" /></div>
        <div className="flex-1 text-left"><p className="text-[11px] sm:text-sm font-medium text-gray-800 dark:text-white group-hover:text-prieska-terracotta transition">Add Your Business</p><p className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400">List your business in the Prieska directory</p></div>
      </button>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {categories.map(category => (
          <button key={category} onClick={() => setSelectedCategory(category)} className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap transition ${selectedCategory === category ? 'bg-prieska-terracotta text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-prieska-terracotta'}`}>{category}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:gap-3">
        {filteredBusinesses.map(business => {
          const IconComponent = business.icon
          return (
            <div key={business.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg"><IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white text-[11px] sm:text-sm">{business.name}</h3>
                    <span className={`text-[8px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full ${categoryColors[business.category] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>{business.category}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs leading-relaxed mb-2">{business.description}</p>
                  <div className="flex items-center gap-3 text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />{business.location}</span>
                    {business.contact && <a href={`tel:${business.contact.replace(/\s/g, '')}`} className="flex items-center gap-1 text-prieska-terracotta hover:underline"><Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3" />{business.contact}</a>}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredBusinesses.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-[11px] sm:text-sm">No businesses found in this category.</p>}
      <AddBusinessModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  )
}

export default BusinessesDirectory