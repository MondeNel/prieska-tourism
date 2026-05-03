// src/components/sections/RecentActivity.jsx
import { getRecentActivity, getQuickStats, getTimeAgo } from '../../data/activityFeed'
import { Newspaper, Megaphone, Calendar, AlertTriangle, TrendingUp } from 'lucide-react'

const RecentActivity = () => {
  const activities = getRecentActivity(6)
  const stats = getQuickStats()

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
    <section id="recent-activity" className="py-8 px-4 max-w-7xl mx-auto">
      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <Newspaper className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.newsThisWeek}</span>
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">News this week</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <Megaphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.newNotices}</span>
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">New notices</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.upcomingEvents}</span>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">Upcoming events</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <span className="text-2xl font-bold text-orange-700 dark:text-orange-300">{stats.activeReports}</span>
          </div>
          <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">Active reports</p>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-prieska-terracotta" />
            <h3 className="font-semibold text-gray-800 dark:text-white text-sm">Recent Activity</h3>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Latest updates</span>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {activities.map(activity => (
            <div key={activity.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${activity.color}`}>
                  {getIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                      {getTypeLabel(activity.type)}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">•</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {getTimeAgo(activity.date)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {activity.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentActivity