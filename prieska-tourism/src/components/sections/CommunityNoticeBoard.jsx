// src/components/sections/CommunityNoticeBoard.jsx
import { useState } from 'react'
import { notices, noticeCategories, getRelativeTime } from '../../data/noticeBoard'
import { MapPin, Phone, Clock, Image, Smile, Heart, MessageCircle, Share2, Megaphone } from 'lucide-react'
import PostNoticeModal from '../ui/PostNoticeModal'

const CommunityNoticeBoard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showPostModal, setShowPostModal] = useState(false)
  const [postText, setPostText] = useState('')

  const filteredNotices = selectedCategory === 'all' 
    ? notices 
    : notices.filter(n => n.category === selectedCategory)

  const sortedNotices = [...filteredNotices].sort((a, b) => 
    new Date(b.postedDate) - new Date(a.postedDate)
  )

  const getCategoryIcon = (categoryId) => {
    const category = noticeCategories.find(c => c.id === categoryId)
    return category?.icon
  }

  const getCategoryLabel = (categoryId) => {
    const category = noticeCategories.find(c => c.id === categoryId)
    return category?.label || categoryId
  }

  const getCategoryColor = (categoryId) => {
    switch(categoryId) {
      case 'forsale': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'lostfound': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
      case 'housing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'community': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div className="space-y-4">
      {/* Post Composer */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
            N
          </div>
          <input
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Post a notice, sell an item, or make an announcement..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-prieska-terracotta"
          />
        </div>
        <div className="flex items-center gap-2 border-t border-gray-100 dark:border-gray-700 pt-3">
          <button className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-prieska-terracotta transition px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Image className="w-4 h-4" />
            Photo
          </button>
          <button className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-prieska-terracotta transition px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Smile className="w-4 h-4" />
            Feeling
          </button>
          <button 
            disabled={!postText.trim()}
            className="ml-auto bg-prieska-terracotta text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {noticeCategories.map(cat => {
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

      {/* Notices Feed */}
      <div className="space-y-3">
        {sortedNotices.map(notice => {
          const CategoryIcon = getCategoryIcon(notice.category)
          
          return (
            <div 
              key={notice.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              {/* Post Header */}
              <div className="p-4 pb-2">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getCategoryColor(notice.category)}`}>
                    {CategoryIcon ? <CategoryIcon className="w-4 h-4" /> : <Megaphone className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {getCategoryLabel(notice.category)}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">•</span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">
                        {getRelativeTime(notice.postedDate)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Posted by {notice.postedBy}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">
                  {notice.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                  {notice.description}
                </p>
              </div>

              {/* Contact Info */}
              <div className="px-4 pb-3 flex items-center gap-4 text-[10px] text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {notice.location}
                </span>
                <a href={`tel:${notice.contact.replace(/\s/g, '')}`} className="flex items-center gap-1 text-prieska-terracotta hover:underline">
                  <Phone className="w-3 h-3" />
                  {notice.contact}
                </a>
              </div>

              {/* Post Actions */}
              <div className="flex items-center border-t border-gray-100 dark:border-gray-700">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <Heart className="w-4 h-4" />
                  Like
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition border-x border-gray-100 dark:border-gray-700">
                  <MessageCircle className="w-4 h-4" />
                  Comment
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {sortedNotices.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
          No notices in this category yet.
        </p>
      )}
    </div>
  )
}

export default CommunityNoticeBoard