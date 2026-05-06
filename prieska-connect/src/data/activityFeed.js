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
      image: null,  // news currently has no image
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
      image: null,  // notices currently have no image
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
      image: event.image || null,  // ← include event image
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
      image: null,  // reports have no image
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