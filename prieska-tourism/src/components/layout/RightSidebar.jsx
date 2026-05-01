// src/components/layout/RightSidebar.jsx
import { Calendar, Fuel, Cloud, TrendingDown } from 'lucide-react'
import { getUpcomingEvents, formatDate, formatTime } from '../../data/events'
import { fuelPrices } from '../../data/fuelPrices'

const RightSidebar = ({ className = '' }) => {
  const upcomingEvents = getUpcomingEvents(2)
  const mockWeather = { temp: 28, condition: 'Sunny', icon: 'sun' }

  return (
    <aside className={`hidden lg:block ${className}`}>
      <div className="sticky top-24 space-y-4">
        {/* Ad Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 text-white">
          <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">Sponsored</span>
          <h4 className="font-bold text-sm mt-2">Tieroog Mall</h4>
          <p className="text-xs text-white/80 mt-1">Shop local. Support Prieska.</p>
        </div>

        {/* Weather Compact */}
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
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-prieska-terracotta" />
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white">Upcoming Events</h4>
          </div>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="text-sm">
                  <p className="font-medium text-gray-800 dark:text-white truncate">{event.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(event.date)} • {event.startTime ? formatTime(event.startTime) : 'All day'}
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
          <div className="flex items-center gap-2 mb-3">
            <Fuel className="w-4 h-4 text-prieska-terracotta" />
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white">Fuel Prices</h4>
          </div>
          {fuelPrices.slice(0, 1).map(station => (
            <div key={station.id}>
              <p className="text-xs font-medium text-gray-800 dark:text-white">{station.station}</p>
              <div className="flex items-center gap-2 mt-1 text-xs">
                <span className="text-orange-600 font-mono font-bold">R {station.prices.petrol95.toFixed(2)}</span>
                <span className="text-gray-500 dark:text-gray-400">/L (95)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default RightSidebar