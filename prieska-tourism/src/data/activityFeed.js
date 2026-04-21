// src/data/activityFeed.js
import { newsArticles } from './localNews'
import { notices } from './noticeBoard'
import { events } from './events'
import { mockReports } from './issueReporting'

export const getRecentActivity = (limit = 6) => {
  const activities = [
    ...newsArticles.map(article => ({
      id: `news-${article.id}`,
      type: 'news',
      title: article.title,
      description: article.excerpt,
      date: article.publishedDate,
      icon: 'newspaper',
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
      link: null
    })),
    ...notices.map(notice => ({
      id: `notice-${notice.id}`,
      type: 'notice',
      title: notice.title,
      description: notice.description,
      date: notice.postedDate,
      icon: 'megaphone',
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
      link: null
    })),
    ...events.map(event => ({
      id: `event-${event.id}`,
      type: 'event',
      title: event.title,
      description: `${event.location} • ${event.startTime || 'All day'}`,
      date: event.date,
      icon: 'calendar',
      color: 'text-green-600 bg-green-100 dark:bg-green-900/30',
      link: null
    })),
    ...mockReports.map(report => ({
      id: `report-${report.id}`,
      type: 'report',
      title: report.title,
      description: `${report.status} • ${report.location}`,
      date: report.reportedDate,
      icon: 'alert',
      color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
      link: null
    }))
  ]

  // Sort by date (newest first) and limit
  return activities
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)
}

export const getQuickStats = () => {
  const today = new Date()
  const todayString = today.toISOString().split('T')[0]
  
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const weekAgoString = oneWeekAgo.toISOString().split('T')[0]

  return {
    newNotices: notices.filter(n => n.postedDate >= weekAgoString).length,
    upcomingEvents: events.filter(e => e.date >= todayString).length,
    activeReports: mockReports.filter(r => r.status !== 'resolved').length,
    newsThisWeek: newsArticles.filter(n => n.publishedDate >= weekAgoString).length
  }
}

export const getTimeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) === 1 ? '' : 's'} ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) === 1 ? '' : 's'} ago`
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) === 1 ? '' : 's'} ago`
}