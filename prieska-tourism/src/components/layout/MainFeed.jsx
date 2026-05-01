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
    // In a real app, this would submit to a backend
    setPostText('')
    setShowComposer(false)
    setSelectedCategory('news')
  }

  const getIcon = (type) => {
    switch(type) {
      case 'news': return <Newspaper className="w-4 h-4" />
      case 'notice': return <Megaphone className="w-4 h-4" />
      case 'event': return <Calendar className="w-4 h-4" />
      case 'report': return <AlertTriangle className="w-4 h-4" />
      default: return <Megaphone className="w-4 h-4" />
    }
  }

  const getTypeLabel = (type) => {
    switch(type) {
      case 'news': return 'News'
      case 'notice': return 'Notice'
      case 'event': return 'Event'
      case 'report': return 'Report'
      default: return 'Update'
    }
  }

  return (
    <div>
      {/* Post Composer */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-4">
        {!showComposer ? (
          <button
            onClick={() => setShowComposer(true)}
            className="w-full flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-prieska-terracotta to-prieska-river flex items-center justify-center text-white font-bold text-sm">
              P
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400 text-left">
              What's happening in Prieska?
            </div>
            <button className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-prieska-terracotta transition px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Image className="w-4 h-4" />
              Photo
            </button>
          </button>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-800 dark:text-white">Create Post</span>
              <button 
                onClick={() => setShowComposer(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Selection */}
            <div className="flex gap-1.5 mb-3">
              {postCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    selectedCategory === cat.id
                      ? 'bg-prieska-terracotta text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <cat.icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              ))}
            </div>

            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder={`Share ${selectedCategory === 'news' ? 'a news story' : selectedCategory === 'notice' ? 'a notice' : selectedCategory === 'event' ? 'an event' : 'an issue'}...`}
              className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-prieska-terracotta resize-none"
              rows={3}
            />
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <button className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-prieska-terracotta transition px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Image className="w-4 h-4" />
                Add Photo
              </button>
              <button 
                onClick={handlePost}
                disabled={!postText.trim()}
                className="bg-prieska-terracotta text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post as {postCategories.find(c => c.id === selectedCategory)?.label}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Activity Feed Posts */}
      <div className="space-y-3">
        {activities.map(activity => (
          <div 
            key={activity.id} 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-4 pb-2">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${activity.color}`}>
                  {getIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      {getTypeLabel(activity.type)}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">•</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {getTimeAgo(activity.date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 pb-3">
              <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">
                {activity.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-xs">
                {activity.description}
              </p>
            </div>

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
        ))}
      </div>
    </div>
  )
}

export default MainFeed