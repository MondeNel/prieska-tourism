// src/components/layout/RightSidebar.jsx
import { Calendar, Fuel, Cloud } from 'lucide-react'
import { getUpcomingEvents, formatDate, formatTime } from '../../data/events'
import { fuelPrices } from '../../data/fuelPrices'

const RightSidebar = ({ openModal, className = '' }) => {
  const upcomingEvents = getUpcomingEvents(3)
  const mockWeather = { temp: 28, condition: 'Sunny' }

  return (
    <aside className={`hidden lg:block ${className}`}>
      <div className="sticky top-24 space-y-4">
        {/* Ad Banner 1 */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 text-white cursor-pointer">
          <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">Sponsored</span>
          <h4 className="font-bold text-sm mt-2">Tieroog Mall</h4>
          <p className="text-xs text-white/80 mt-1">Shop local. Support Prieska.</p>
        </div>

        {/* Weather */}
        <div className="bg-gradient-to-br from-prieska-river to-prieska-terracotta rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              <span className="text-sm font-medium">Prieska Weather</span>
            </div>
            <span className="text-2xl font-bold">{mockWeather.temp}°C</span>
          </div>
          <p className="text-xs text-white/70 mt-1">{mockWeather.condition}</p>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-prieska-terracotta" />
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white">Upcoming Events</h4>
            </div>
            <button 
              onClick={() => openModal?.('events')}
              className="text-xs text-prieska-terracotta hover:underline"
            >
              View All
            </button>
          </div>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <p className="font-medium text-gray-800 dark:text-white text-sm truncate">{event.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {formatDate(event.date)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {event.startTime ? formatTime(event.startTime) : 'All day'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400">No upcoming events</p>
          )}
        </div>

        {/* Fuel Quick View */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Fuel className="w-4 h-4 text-prieska-terracotta" />
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white">Fuel Prices</h4>
            </div>
            <button 
              onClick={() => document.getElementById('fuel')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs text-prieska-terracotta hover:underline"
            >
              View All
            </button>
          </div>
          {fuelPrices.slice(0, 1).map(station => (
            <div key={station.id} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <p className="text-xs font-medium text-gray-800 dark:text-white">{station.station}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-orange-600 dark:text-orange-400 font-mono font-bold">R {station.prices.petrol95.toFixed(2)}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">/L (95)</span>
              </div>
            </div>
          ))}
        </div>

        {/* Ad Banner 2 */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-4 text-white cursor-pointer">
          <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">Sponsored</span>
          <h4 className="font-bold text-sm mt-2">Prieska Copper Mine</h4>
          <p className="text-xs text-white/80 mt-1">Now hiring! Join our team.</p>
        </div>
      </div>
    </aside>
  )
}

export default RightSidebar