// src/components/sections/EventsCalendar.jsx
import { useState } from 'react'
import { events, eventCategories, formatDate, formatTime, isToday, isTomorrow } from '../../data/events'
import { MapPin, Clock, Users, Phone, Image, Smile, Heart, MessageCircle, Share2 } from 'lucide-react'

const EventsCalendar = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [postText, setPostText] = useState('')

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(e => e.category === selectedCategory)

  const sortedEvents = [...filteredEvents].sort((a, b) => a.date.localeCompare(b.date))

  const upcomingEvents = events
    .filter(e => e.date >= new Date().toISOString().split('T')[0])
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)

  const getCategoryIcon = (categoryId) => {
    const category = eventCategories.find(c => c.id === categoryId)
    return category?.icon
  }

  const getCategoryLabel = (categoryId) => {
    const category = eventCategories.find(c => c.id === categoryId)
    return category?.label || categoryId
  }

  const getCategoryColor = (categoryId) => {
    switch(categoryId) {
      case 'market': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'church': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'sports': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
      case 'community': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
      case 'music': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400'
      case 'outdoor': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
      case 'food': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getDateLabel = (dateString) => {
    if (isToday(dateString)) return 'Today'
    if (isTomorrow(dateString)) return 'Tomorrow'
    return formatDate(dateString)
  }

  return (
    <div className="space-y-4">
      {/* Post Composer */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
            E
          </div>
          <input
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Create an event or share what's happening..."
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

      {/* Coming Up Soon */}
      {upcomingEvents.length > 0 && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Coming Up Soon</h4>
          <div className="space-y-2">
            {upcomingEvents.map(event => {
              const CategoryIcon = getCategoryIcon(event.category)
              return (
                <div key={event.id} className="flex items-center gap-3">
                  {CategoryIcon && <CategoryIcon className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{event.title}</p>
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
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
            selectedCategory === 'all'
              ? 'bg-prieska-terracotta text-white'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-prieska-terracotta'
          }`}
        >
          All Events
        </button>
        {eventCategories.filter(c => c.id !== 'all').map(cat => {
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

      {/* Events Feed */}
      <div className="space-y-3">
        {sortedEvents.map(event => {
          const CategoryIcon = getCategoryIcon(event.category)
          
          return (
            <div 
              key={event.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              {/* Post Header */}
              <div className="p-4 pb-2">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getCategoryColor(event.category)}`}>
                    {CategoryIcon && <CategoryIcon className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                        {getCategoryLabel(event.category)}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">•</span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">
                        {getDateLabel(event.date)}
                      </span>
                      {event.recurring && (
                        <>
                          <span className="text-[10px] text-gray-400 dark:text-gray-500">•</span>
                          <span className="text-[10px] text-gray-400 dark:text-gray-500">{event.recurring}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">
                  {event.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Event Details */}
              <div className="px-4 pb-3 space-y-1 text-[10px] text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  <span>{event.location}</span>
                </div>
                {event.startTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>
                      {formatTime(event.startTime)}
                      {event.endTime && ` - ${formatTime(event.endTime)}`}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Users className="w-3 h-3" />
                  <span>{event.organizer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  <a href={`tel:${event.contact.replace(/\s/g, '')}`} className="text-prieska-terracotta hover:underline">
                    {event.contact}
                  </a>
                </div>
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

      {sortedEvents.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
          No events in this category yet.
        </p>
      )}
    </div>
  )
}

export default EventsCalendar