// src/components/sections/CommunityGroups.jsx
import { useState } from 'react'
import { groupCategories, communityGroups } from '../../data/communityGroups'
import { MapPin, Phone, User, Clock, ChevronDown, ChevronUp, Users as UsersIcon, Edit3, Plus } from 'lucide-react'
import UpdateGroupModal from '../ui/UpdateGroupModal'
import AddGroupModal from '../ui/AddGroupModal'

const CommunityGroups = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedGroup, setExpandedGroup] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  const handleUpdateInfo = (group, e) => {
    e.stopPropagation()
    setSelectedGroup(group)
    setShowUpdateModal(true)
  }

  const filteredGroups = selectedCategory === 'all' 
    ? communityGroups 
    : communityGroups.filter(g => g.category === selectedCategory)

  const sortedGroups = [...filteredGroups].sort((a, b) => a.name.localeCompare(b.name))

  const getCategoryLabel = (categoryId) => {
    const category = groupCategories.find(c => c.id === categoryId)
    return category?.label || categoryId
  }

  const getCategoryColor = (categoryId) => {
    switch(categoryId) {
      case 'churches': return 'bg-purple-500'
      case 'community': return 'bg-blue-500'
      case 'sports': return 'bg-green-500'
      case 'youth': return 'bg-pink-500'
      case 'seniors': return 'bg-amber-500'
      case 'arts': return 'bg-indigo-500'
      case 'social': return 'bg-teal-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-4">
      {/* Add Group Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Churches, clubs, and community organizations in Prieska
        </p>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-prieska-terracotta text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-opacity-90 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Group
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {groupCategories.map(cat => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-prieska-terracotta text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-prieska-terracotta'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Group Count */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {filteredGroups.length} {filteredGroups.length === 1 ? 'group' : 'groups'} found
      </p>

      {/* Groups List */}
      <div className="space-y-2">
        {sortedGroups.map(group => {
          const CategoryIcon = group.icon || UsersIcon
          const isExpanded = expandedGroup === group.id
          
          return (
            <div 
              key={group.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setExpandedGroup(isExpanded ? null : group.id)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
              >
                <div className={`p-2 rounded-lg text-white ${getCategoryColor(group.category)}`}>
                  <CategoryIcon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 dark:text-white text-sm truncate">
                    {group.name}
                  </h4>
                  <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                    {getCategoryLabel(group.category)}
                  </span>
                </div>
                {isExpanded ? 
                  <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : 
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                }
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
                  <p className="text-gray-600 dark:text-gray-300 text-xs mb-3">
                    {group.description}
                  </p>
                  
                  <div className="space-y-1.5 text-[10px] text-gray-500 dark:text-gray-400 mb-3">
                    {group.location && (
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>{group.location}</span>
                      </div>
                    )}
                    {group.meetingTimes && (
                      <div className="flex items-start gap-1.5">
                        <Clock className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>{group.meetingTimes}</span>
                      </div>
                    )}
                    {group.contactPerson && (
                      <div className="flex items-start gap-1.5">
                        <User className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>{group.contactPerson}</span>
                      </div>
                    )}
                    {group.contact && (
                      <div className="flex items-start gap-1.5">
                        <Phone className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <a href={`tel:${group.contact.replace(/\s/g, '')}`} className="text-prieska-terracotta hover:underline">
                          {group.contact}
                        </a>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleUpdateInfo(group, e)}
                    className="w-full border border-prieska-terracotta text-prieska-terracotta py-2 rounded-lg text-xs font-medium hover:bg-prieska-terracotta hover:text-white transition flex items-center justify-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Update Information
                  </button>
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

      {/* Update Group Modal */}
      <UpdateGroupModal 
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        group={selectedGroup}
      />

      {/* Add Group Modal */}
      <AddGroupModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  )
}

export default CommunityGroups