// src/components/sections/CommunityNoticeBoard.jsx
import { useState } from 'react'
import { notices, noticeCategories, getRelativeTime } from '../../data/noticeBoard'
import { MapPin, Phone, Clock, Tag, Plus } from 'lucide-react'
import PostNoticeModal from '../ui/PostNoticeModal'

const CommunityNoticeBoard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showPostModal, setShowPostModal] = useState(false)

  const filteredNotices = selectedCategory === 'all' 
    ? notices 
    : notices.filter(n => n.category === selectedCategory)

  const getCategoryIcon = (categoryId) => {
    const category = noticeCategories.find(c => c.id === categoryId)
    return category?.icon || Tag
  }

  const getCategoryLabel = (categoryId) => {
    const category = noticeCategories.find(c => c.id === categoryId)
    return category?.label || categoryId
  }

  return (
    <div className="space-y-4">
      {/* Header with Post Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Local classifieds and community announcements
        </p>
        <button
          onClick={() => setShowPostModal(true)}
          className="flex items-center gap-1.5 bg-prieska-terracotta text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition"
        >
          <Plus className="w-4 h-4" />
          Post Notice
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-1.5 pb-2">
        {noticeCategories.map(cat => {
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

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredNotices.map(notice => {
          const CategoryIcon = getCategoryIcon(notice.category)
          const postedTime = getRelativeTime(notice.postedDate)
          
          return (
            <div 
              key={notice.id} 
              className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                  <CategoryIcon className="w-4 h-4 text-prieska-terracotta" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-gray-800 dark:text-white text-sm truncate">
                      {notice.title}
                    </h4>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap">
                      {postedTime}
                    </span>
                  </div>
                  <span className="inline-block text-[10px] font-medium text-prieska-terracotta bg-prieska-terracotta/10 px-1.5 py-0.5 rounded-full mt-0.5">
                    {getCategoryLabel(notice.category)}
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-xs mt-2 line-clamp-2">
                    {notice.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {notice.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {notice.contact}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                    Posted by {notice.postedBy}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredNotices.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
          No notices in this category yet.
        </p>
      )}

      {/* Post Notice Modal */}
      <PostNoticeModal 
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
      />
    </div>
  )
}

export default CommunityNoticeBoard