// src/components/sections/CommunityGroups.jsx
import { useState } from 'react'
import { groupCategories, communityGroups } from '../../data/communityGroups'
import { MapPin, Phone, User, Clock, Globe, Users as UsersIcon } from 'lucide-react'

const CommunityGroups = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedGroup, setExpandedGroup] = useState(null)

  const filteredGroups = selectedCategory === 'all' 
    ? communityGroups 
    : communityGroups.filter(g => g.category === selectedCategory)

  const sortedGroups = [...filteredGroups].sort((a, b) => a.name.localeCompare(b.name))

  const getCategoryIcon = (categoryId) => {
    const category = groupCategories.find(c => c.id === categoryId)
    return category?.icon || UsersIcon
  }

  const getCategoryLabel = (categoryId) => {
    const category = groupCategories.find(c => c.id === categoryId)
    return category?.label || categoryId
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center mb-2">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Churches, clubs, and community organizations in Prieska
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-1.5 pb-2">
        {groupCategories.map(cat => {
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

      {/* Group Count */}
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        {filteredGroups.length} {filteredGroups.length === 1 ? 'group' : 'groups'} found
      </p>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sortedGroups.map(group => {
          const CategoryIcon = group.icon || getCategoryIcon(group.category)
          const isExpanded = expandedGroup === group.id
          
          return (
            <div 
              key={group.id} 
              className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div 
                className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition"
                onClick={() => setExpandedGroup(isExpanded ? null : group.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <CategoryIcon className="w-4 h-4 text-prieska-terracotta" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                      {group.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-prieska-terracotta bg-prieska-terracotta/10 px-1.5 py-0.5 rounded-full">
                        {getCategoryLabel(group.category)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-3 bg-white dark:bg-gray-800/30">
                  <p className="text-gray-600 dark:text-gray-300 text-xs mb-3">
                    {group.description}
                  </p>
                  
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <span>{group.location}</span>
                    </div>
                    {group.meetingTimes && (
                      <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <Clock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <span>{group.meetingTimes}</span>
                      </div>
                    )}
                    {group.contactPerson && (
                      <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <User className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <span>{group.contactPerson}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <a href={`tel:${group.contact.replace(/\s/g, '')}`} className="hover:text-prieska-terracotta">
                        {group.contact}
                      </a>
                    </div>
                    {group.website && (
                      <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <Globe className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <a href={group.website} target="_blank" rel="noopener noreferrer" className="hover:text-prieska-terracotta">
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {sortedGroups.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
          No groups found in this category.
        </p>
      )}
    </div>
  )
}

export default CommunityGroups