// src/components/layout/MainFeed.jsx
import { getRecentActivity, getQuickStats, getTimeAgo } from '../../data/activityFeed'
import { Newspaper, Megaphone, Calendar, AlertTriangle, TrendingUp, Image, Smile } from 'lucide-react'
import { useState } from 'react'

const MainFeed = ({ className = '' }) => {
  const activities = getRecentActivity(8)
  const stats = getQuickStats()
  const [postText, setPostText] = useState('')

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
    <div className={`${className}`}>
      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 text-center">
          <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{stats.newsThisWeek}</p>
          <p className="text-[10px] text-blue-600 dark:text-blue-400">News</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 text-center">
          <p className="text-lg font-bold text-green-700 dark:text-green-300">{stats.upcomingEvents}</p>
          <p className="text-[10px] text-green-600 dark:text-green-400">Events</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2 text-center">
          <p className="text-lg font-bold text-purple-700 dark:text-purple-300">{stats.newNotices}</p>
          <p className="text-[10px] text-purple-600 dark:text-purple-400">Notices</p>
        </div>
      </div>

      {/* Post Composer */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-prieska-terracotta to-prieska-river flex items-center justify-center text-white font-bold">
            P
          </div>
          <input
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's happening in Prieska?"
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

      {/* Activity Feed */}
      <div className="space-y-3">
        {activities.map(activity => (
          <div 
            key={activity.id} 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {getTypeLabel(activity.type)}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">•</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">
                    {getTimeAgo(activity.date)}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">
                  {activity.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs">
                  {activity.description}
                </p>
                {/* Interaction Buttons */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <button className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-prieska-terracotta transition">
                    👍 Like
                  </button>
                  <button className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-prieska-terracotta transition">
                    💬 Comment
                  </button>
                  <button className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-prieska-terracotta transition">
                    ↗️ Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainFeed