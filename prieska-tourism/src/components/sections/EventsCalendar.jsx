// src/components/sections/EventsCalendar.jsx
import { useState, useEffect } from 'react'
import { events, eventCategories, formatDate, formatTime, isToday, isTomorrow } from '../../data/events'
import { MapPin, Clock, Users, Phone, X, Heart, MessageCircle, Share2 } from 'lucide-react'
import EventsSkeleton from '../ui/skeletons/EventsSkeleton'

const EventsCalendar = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [postText, setPostText] = useState('')
  const [showComposer, setShowComposer] = useState(false)

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(timer) }, [])
  if (loading) return <EventsSkeleton />

  const filteredEvents = selectedCategory === 'all' ? events : events.filter(e => e.category === selectedCategory)
  const sortedEvents = [...filteredEvents].sort((a, b) => a.date.localeCompare(b.date))
  const upcomingEvents = events.filter(e => e.date >= new Date().toISOString().split('T')[0]).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3)

  const getCategoryIcon = (categoryId) => { const cat = eventCategories.find(c => c.id === categoryId); return cat?.icon }
  const getCategoryLabel = (categoryId) => { const cat = eventCategories.find(c => c.id === categoryId); return cat?.label || categoryId }
  const getCategoryColor = (categoryId) => {
    switch(categoryId) { case 'market': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'; case 'church': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'; case 'sports': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'; case 'community': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'; case 'music': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400'; case 'outdoor': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'; case 'food': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'; default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' }
  }
  const getDateLabel = (dateString) => { if (isToday(dateString)) return 'Today'; if (isTomorrow(dateString)) return 'Tomorrow'; return formatDate(dateString) }

  return (
    <div className="space-y-3">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-2.5 sm:p-4">
        {!showComposer ? (
          <button onClick={() => setShowComposer(true)} className="w-full flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-[10px] sm:text-sm flex-shrink-0">E</div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-3 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-sm text-gray-500 dark:text-gray-400 text-left truncate">Create an event or share what's happening...</div>
          </button>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-[11px] sm:text-sm font-medium text-gray-800 dark:text-white">Create Post</span>
              <button onClick={() => setShowComposer(false)} className="text-gray-400 hover:text-gray-600 p-0.5"><X className="w-3 h-3 sm:w-4 sm:h-4" /></button>
            </div>
            <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Create an event..." className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-prieska-terracotta resize-none" rows={3} />
            <div className="flex items-center justify-end mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700">
              <button onClick={() => { setPostText(''); setShowComposer(false) }} disabled={!postText.trim()} className="bg-prieska-terracotta text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed">Post</button>
            </div>
          </div>
        )}
      </div>

      {upcomingEvents.length > 0 && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 rounded-xl p-3 sm:p-4 border border-green-200 dark:border-green-800">
          <h4 className="text-[11px] sm:text-sm font-semibold text-gray-800 dark:text-white mb-2">Coming Up Soon</h4>
          <div className="space-y-1.5">
            {upcomingEvents.map(event => { const CategoryIcon = getCategoryIcon(event.category); return (
              <div key={event.id} className="flex items-center gap-2">
                {CategoryIcon && <CategoryIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400 flex-shrink-0" />}
                <div className="flex-1 min-w-0"><p className="text-[11px] sm:text-sm font-medium text-gray-800 dark:text-white truncate">{event.title}</p><p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{getDateLabel(event.date)} • {event.startTime ? formatTime(event.startTime) : 'All day'}</p></div>
              </div>
            )})}
          </div>
        </div>
      )}

      <div className="flex gap-1 overflow-x-auto pb-1">
        <button onClick={() => setSelectedCategory('all')} className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap transition ${selectedCategory === 'all' ? 'bg-prieska-terracotta text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-prieska-terracotta'}`}>All Events</button>
        {eventCategories.filter(c => c.id !== 'all').map(cat => { const Icon = cat.icon; return (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap transition ${selectedCategory === cat.id ? 'bg-prieska-terracotta text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-prieska-terracotta'}`}><Icon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />{cat.label}</button>
        )})}
      </div>

      <div className="space-y-2 sm:space-y-3">
        {sortedEvents.map(event => { const CategoryIcon = getCategoryIcon(event.category); return (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-2.5 sm:p-4 pb-1 sm:pb-2">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className={`p-1 sm:p-2 rounded-lg ${getCategoryColor(event.category)}`}>{CategoryIcon && <CategoryIcon className="w-3 h-3 sm:w-4 sm:h-4" />}</div>
                <div className="flex-1"><div className="flex items-center gap-1 sm:gap-2"><span className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400">{getCategoryLabel(event.category)}</span><span className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">•</span><span className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">{getDateLabel(event.date)}</span>{event.recurring && <><span className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">•</span><span className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">{event.recurring}</span></>}</div></div>
              </div>
            </div>
            <div className="px-2.5 sm:px-4 pb-2 sm:pb-3">
              <h4 className="font-semibold text-gray-800 dark:text-white text-[11px] sm:text-sm mb-0.5">{event.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs leading-relaxed">{event.description}</p>
            </div>
            <div className="px-2.5 sm:px-4 pb-2 sm:pb-3 space-y-1 text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5"><MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" /><span>{event.location}</span></div>
              {event.startTime && <div className="flex items-center gap-1.5"><Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" /><span>{formatTime(event.startTime)}{event.endTime && ` - ${formatTime(event.endTime)}`}</span></div>}
              <div className="flex items-center gap-1.5"><Users className="w-2.5 h-2.5 sm:w-3 sm:h-3" /><span>{event.organizer}</span></div>
              <div className="flex items-center gap-1.5"><Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3" /><a href={`tel:${event.contact.replace(/\s/g, '')}`} className="text-prieska-terracotta hover:underline">{event.contact}</a></div>
            </div>
            <div className="flex items-center border-t border-gray-100 dark:border-gray-700">
              <button className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><Heart className="w-3 h-3 sm:w-4 sm:h-4" />Like</button>
              <button className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition border-x border-gray-100 dark:border-gray-700"><MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />Comment</button>
              <button className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><Share2 className="w-3 h-3 sm:w-4 sm:h-4" />Share</button>
            </div>
          </div>
        )})}
      </div>
      {sortedEvents.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-[11px] sm:text-sm">No events in this category yet.</p>}
    </div>
  )
}

export default EventsCalendar