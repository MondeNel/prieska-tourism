// src/components/sections/EventsCalendar.jsx
import { useState } from 'react'
import { events, eventCategories, formatDate, formatTime, getUpcomingEvents, isToday, isTomorrow } from '../../data/events'
import { MapPin, Clock, Users, Phone, Calendar, Plus, Tag } from 'lucide-react'
import PostEventModal from '../ui/PostEventModal'

const EventsCalendar = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showPostModal, setShowPostModal] = useState(false)
  const [expandedEvent, setExpandedEvent] = useState(null)

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(e => e.category === selectedCategory)

  // Sort by date
  const sortedEvents = [...filteredEvents].sort((a, b) => a.date.localeCompare(b.date))

  const getCategoryIcon = (categoryId) => {
    const category = eventCategories.find(c => c.id === categoryId)
    return category?.icon || Calendar
  }

  const getCategoryLabel = (categoryId) => {
    const category = eventCategories.find(c => c.id === categoryId)
    return category?.label || categoryId
  }

  const getDateLabel = (dateString) => {
    if (isToday(dateString)) return 'Today'
    if (isTomorrow(dateString)) return 'Tomorrow'
    return formatDate(dateString)
  }

  const upcomingEvents = getUpcomingEvents(3)

  return (
    <div className="space-y-4">
      {/* Header with Post Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Community events and gatherings in Prieska
        </p>
        <button
          onClick={() => setShowPostModal(true)}
          className="flex items-center gap-1.5 bg-prieska-terracotta text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition"
        >
          <Plus className="w-4 h-4" />
          Post Event
        </button>
      </div>

      {/* Upcoming Events Preview */}
      {upcomingEvents.length > 0 && (
        <div className="bg-gradient-to-r from-prieska-terracotta/10 to-prieska-river/10 dark:from-prieska-terracotta/20 dark:to-prieska-river/20 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-prieska-terracotta" />
            Coming Up Soon
          </h4>
          <div className="space-y-2">
            {upcomingEvents.map(event => {
              const CategoryIcon = getCategoryIcon(event.category)
              return (
                <div key={event.id} className="flex items-center gap-3 text-sm">
                  <CategoryIcon className="w-4 h-4 text-prieska-terracotta flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 dark:text-white truncate">{event.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {getDateLabel(event.date)} • {event.startTime ? formatTime(event.startTime) : 'All day'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-1.5 pb-2">
        {eventCategories.map(cat => {
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

      {/* Events List */}
      <div className="space-y-3">
        {sortedEvents.map(event => {
          const CategoryIcon = getCategoryIcon(event.category)
          const isExpanded = expandedEvent === event.id
          
          return (
            <div 
              key={event.id} 
              className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div 
                className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition"
                onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <CategoryIcon className="w-4 h-4 text-prieska-terracotta" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-prieska-terracotta bg-prieska-terracotta/10 px-1.5 py-0.5 rounded-full">
                        {getCategoryLabel(event.category)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {getDateLabel(event.date)}
                      </span>
                      {event.recurring && (
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          • {event.recurring}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-3 bg-white dark:bg-gray-800/30">
                  <p className="text-gray-600 dark:text-gray-300 text-xs mb-3">
                    {event.description}
                  </p>
                  
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{event.location}</span>
                    </div>
                    {event.startTime && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {formatTime(event.startTime)} 
                          {event.endTime && ` - ${formatTime(event.endTime)}`}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Users className="w-3.5 h-3.5" />
                      <span>{event.organizer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="w-3.5 h-3.5" />
                      <a href={`tel:${event.contact.replace(/\s/g, '')}`} className="hover:text-prieska-terracotta">
                        {event.contact}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {sortedEvents.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
          No events in this category yet.
        </p>
      )}

      {/* Post Event Modal */}
      <PostEventModal 
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
      />
    </div>
  )
}

export default EventsCalendar