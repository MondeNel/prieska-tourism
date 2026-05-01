// src/components/layout/MainFeed.jsx
import { getRecentActivity, getTimeAgo } from '../../data/activityFeed'
import { Newspaper, Megaphone, Calendar, AlertTriangle, Image, Heart, MessageCircle, Share2, X } from 'lucide-react'
import { useState } from 'react'

const postCategories = [
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'notice', label: 'Notice', icon: Megaphone },
  { id: 'event', label: 'Event', icon: Calendar },
  { id: 'report', label: 'Report', icon: AlertTriangle },
]

const MainFeed = () => {
  const activities = getRecentActivity(10)
  const [postText, setPostText] = useState('')
  const [showComposer, setShowComposer] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('news')

  const handlePost = () => {
    if (!postText.trim()) return
    setPostText('')
    setShowComposer(false)
    setSelectedCategory('news')
  }

  const getIcon = (type) => {
    const iconClass = "w-3.5 h-3.5 sm:w-4 sm:h-4"
    switch (type) {
      case 'news': return <Newspaper className={iconClass} />
      case 'notice': return <Megaphone className={iconClass} />
      case 'event': return <Calendar className={iconClass} />
      case 'report': return <AlertTriangle className={iconClass} />
      default: return <Megaphone className={iconClass} />
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'news': return 'News'
      case 'notice': return 'Notice'
      case 'event': return 'Event'
      case 'report': return 'Report'
      default: return 'Update'
    }
  }

  return (
    <div className="space-y-2.5 sm:space-y-3">

      {/* Post Composer Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4">
        {!showComposer ? (
          <button
            onClick={() => setShowComposer(true)}
            className="w-full flex items-center gap-2.5 sm:gap-3"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-prieska-terracotta to-prieska-river flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
              P
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-left truncate">
              What's happening in Prieska?
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hover:text-prieska-terracotta transition px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0">
              <Image className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Photo</span>
            </div>
          </button>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white">Create Post</span>
              <button
                onClick={() => setShowComposer(false)}
                className="text-gray-400 hover:text-gray-600 p-0.5"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Category Selection */}
            <div className="flex gap-1 sm:gap-1.5 mb-2 sm:mb-3 flex-wrap">
              {postCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition ${
                    selectedCategory === cat.id
                      ? 'bg-prieska-terracotta text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <cat.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  {cat.label}
                </button>
              ))}
            </div>

            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder={`Share ${selectedCategory === 'news' ? 'a news story' : selectedCategory === 'notice' ? 'a notice' : selectedCategory === 'event' ? 'an event' : 'an issue'}...`}
              className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-prieska-terracotta resize-none"
              rows={3}
            />
            <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700">
              <button className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hover:text-prieska-terracotta transition px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Image className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Add Photo
              </button>
              <button
                onClick={handlePost}
                disabled={!postText.trim()}
                className="bg-prieska-terracotta text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post as {postCategories.find(c => c.id === selectedCategory)?.label}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Activity Feed Posts — each post is its own card */}
      {activities.map(activity => (
        <div
          key={activity.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          {/* Post Header */}
          <div className="p-3 sm:p-4 pb-1.5 sm:pb-2">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className={`p-1.5 sm:p-2 rounded-lg ${activity.color}`}>
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white">
                    {getTypeLabel(activity.type)}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500">•</span>
                  <span className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500">
                    {getTimeAgo(activity.date)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-3 sm:px-4 pb-2.5 sm:pb-3">
            <h4 className="font-semibold text-gray-800 dark:text-white text-xs sm:text-sm mb-0.5 sm:mb-1">
              {activity.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-[11px] sm:text-xs leading-relaxed">
              {activity.description}
            </p>
          </div>

          {/* Post Actions */}
          <div className="flex items-center border-t border-gray-100 dark:border-gray-700">
            <button className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Like
            </button>
            <button className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition border-x border-gray-100 dark:border-gray-700">
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Comment
            </button>
            <button className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Share
            </button>
          </div>
        </div>
      ))}

    </div>
  )
}

export default MainFeed