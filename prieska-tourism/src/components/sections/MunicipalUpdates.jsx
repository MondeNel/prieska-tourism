// src/components/sections/MunicipalUpdates.jsx
import { useState } from 'react'
import SectionTitle from '../ui/SectionTitle'
import { municipalUpdates, updateCategories, getPriorityColor, getPriorityLabel, formatDate, isToday, isTomorrow } from '../../data/municipalUpdates'
import { MapPin, Clock, Phone, User, Calendar, AlertTriangle, Megaphone } from 'lucide-react'

const MunicipalUpdates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [expandedUpdate, setExpandedUpdate] = useState(null)

  const filteredUpdates = municipalUpdates.filter(update => {
    const categoryMatch = selectedCategory === 'all' || update.category === selectedCategory
    const priorityMatch = selectedPriority === 'all' || update.priority === selectedPriority
    return categoryMatch && priorityMatch
  })

  const sortedUpdates = [...filteredUpdates].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 }
    const priorityDiff = (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)
    if (priorityDiff !== 0) return priorityDiff
    return a.date.localeCompare(b.date)
  })

  const getDateLabel = (dateString) => {
    if (isToday(dateString)) return 'Today'
    if (isTomorrow(dateString)) return 'Tomorrow'
    return formatDate(dateString)
  }

  const priorities = [
    { id: 'all', label: 'All Priorities' },
    { id: 'high', label: 'High Priority', color: 'text-red-600' },
    { id: 'medium', label: 'Medium Priority', color: 'text-orange-600' },
    { id: 'low', label: 'Low Priority', color: 'text-green-600' }
  ]

  return (
    <section id="municipal" className="py-12 md:py-16 px-4 max-w-7xl mx-auto bg-white dark:bg-gray-900">
      <SectionTitle subtitle="OFFICIAL ANNOUNCEMENTS" title="Municipal Updates" />
      
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-prieska-terracotta" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Official updates from Siyathemba Municipality
            </p>
          </div>
        </div>

        {/* Priority Alert Banner - Show if there are high priority updates */}
        {municipalUpdates.filter(u => u.priority === 'high').length > 0 && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-800 dark:text-red-300">
                {municipalUpdates.filter(u => u.priority === 'high').length} High Priority Updates
              </span>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col gap-2">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-1.5">
            {updateCategories.map(cat => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    selectedCategory === cat.id
                      ? 'bg-prieska-terracotta text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Priority Filter */}
          <div className="flex flex-wrap gap-1.5">
            {priorities.map(priority => (
              <button
                key={priority.id}
                onClick={() => setSelectedPriority(priority.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  selectedPriority === priority.id
                    ? 'bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-800'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {priority.label}
              </button>
            ))}
          </div>
        </div>

        {/* Updates Count */}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {filteredUpdates.length} {filteredUpdates.length === 1 ? 'update' : 'updates'} found
        </p>

        {/* Updates List */}
        <div className="space-y-3">
          {sortedUpdates.map(update => {
            const Icon = update.icon || Megaphone
            const isExpanded = expandedUpdate === update.id
            
            return (
              <div 
                key={update.id} 
                className={`rounded-xl border-l-4 overflow-hidden ${getPriorityColor(update.priority)}`}
              >
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition"
                  onClick={() => setExpandedUpdate(isExpanded ? null : update.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                      <Icon className="w-4 h-4 text-prieska-terracotta" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                          {update.title}
                        </h4>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                          update.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                          update.priority === 'medium' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        }`}>
                          {getPriorityLabel(update.priority)}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs mt-1 line-clamp-2">
                        {update.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[10px] text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {getDateLabel(update.date)}
                        </span>
                        {update.time && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {update.time}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {update.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-3">
                    <p className="text-gray-600 dark:text-gray-300 text-xs mb-3">
                      {update.description}
                    </p>
                    
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <User className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <span>{update.contactPerson}</span>
                      </div>
                      <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <Phone className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <a href={`tel:${update.contactNumber.replace(/\s/g, '')}`} className="hover:text-prieska-terracotta">
                          {update.contactNumber}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {sortedUpdates.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
            No updates match your filters.
          </p>
        )}
      </div>
    </section>
  )
}

export default MunicipalUpdates