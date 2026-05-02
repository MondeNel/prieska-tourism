// src/components/sections/EmergencyNumbers.jsx
import SectionTitle from '../ui/SectionTitle'
import { emergencyCategories } from '../../data/emergencyNumbers'
import { PhoneCall, ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useEffect } from 'react'

const EmergencySkeleton = () => (
  <div className="space-y-4">
    <div className="text-center">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto mb-2 animate-pulse" />
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto animate-pulse" />
      <div className="h-0.5 bg-gray-200 dark:bg-gray-700 w-16 mx-auto mt-2 animate-pulse" />
    </div>
    {Array(4).fill(0).map((_, i) => (
      <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
            </div>
          </div>
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    ))}
  </div>
)

const EmergencyNumbers = () => {
  const [expandedCategory, setExpandedCategory] = useState('emergency')
  const [loading, setLoading] = useState(true)

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(timer) }, [])
  if (loading) return <EmergencySkeleton />

  const toggleCategory = (id) => { setExpandedCategory(expandedCategory === id ? null : id) }

  return (
    <div className="space-y-4">
      <SectionTitle subtitle="KEEP THIS HANDY" title="Emergency & Important Numbers" />
      <div className="space-y-3">
        {emergencyCategories.map((category) => {
          const Icon = category.icon; const isExpanded = expandedCategory === category.id
          return (
            <div key={category.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <button onClick={() => toggleCategory(category.id)} className={`w-full flex items-center justify-between p-4 transition-colors ${isExpanded ? category.color.replace('bg-', 'bg-opacity-90 ') + ' text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isExpanded ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'}`}><Icon className={`w-5 h-5 ${isExpanded ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} /></div>
                  <div className="text-left"><h3 className={`font-serif font-bold text-sm ${isExpanded ? 'text-white' : 'text-gray-800 dark:text-white'}`}>{category.title}</h3><p className={`text-xs ${isExpanded ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>{category.numbers.length} numbers</p></div>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>
              {isExpanded && (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {category.numbers.map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0 mr-3"><p className="font-semibold text-gray-800 dark:text-white text-sm">{item.name}</p><p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p></div>
                        <a href={`tel:${item.number.replace(/\s/g, '')}`} className="flex items-center gap-1.5 bg-prieska-terracotta/10 dark:bg-prieska-terracotta/20 text-prieska-terracotta font-bold text-sm px-3 py-2 rounded-lg hover:bg-prieska-terracotta hover:text-white transition-all flex-shrink-0"><PhoneCall className="w-3.5 h-3.5" />{item.number}</a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EmergencyNumbers