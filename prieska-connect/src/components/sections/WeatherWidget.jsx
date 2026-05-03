// src/components/sections/WeatherWidget.jsx
import { useState, useEffect } from 'react'
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer } from 'lucide-react'

const mockWeather = {
  temp: 28,
  feelsLike: 26,
  condition: 'Sunny',
  humidity: 35,
  windSpeed: 12,
  icon: 'sun',
  location: 'Prieska, Northern Cape'
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState(mockWeather)
  const [loading, setLoading] = useState(false)

  const getWeatherIcon = (icon) => {
    const iconClass = "w-10 h-10 md:w-12 md:h-12"
    switch(icon) {
      case 'sun': return <Sun className={`${iconClass} text-yellow-500`} />
      case 'cloud': return <Cloud className={`${iconClass} text-gray-400`} />
      case 'rain': return <CloudRain className={`${iconClass} text-blue-400`} />
      default: return <Sun className={`${iconClass} text-yellow-500`} />
    }
  }

  return (
    <section id="weather" className="py-8 md:py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-prieska-river to-prieska-terracotta dark:from-prieska-river dark:to-prieska-terracotta rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 md:p-6 lg:p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-3 md:gap-4">
              {getWeatherIcon(weather.icon)}
              <div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold">{weather.location}</h3>
                <p className="text-white/70 text-xs md:text-sm">Updated just now</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-5xl md:text-6xl font-bold">{weather.temp}°C</div>
              <p className="text-white/80 text-sm md:text-base">Feels like {weather.feelsLike}°C</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-6 md:mt-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 flex items-center gap-2 md:gap-3">
              <Thermometer className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs uppercase tracking-wider opacity-70">Condition</p>
                <p className="font-semibold text-sm md:text-base truncate">{weather.condition}</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 flex items-center gap-2 md:gap-3">
              <Droplets className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs uppercase tracking-wider opacity-70">Humidity</p>
                <p className="font-semibold text-sm md:text-base">{weather.humidity}%</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 flex items-center gap-2 md:gap-3">
              <Wind className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs uppercase tracking-wider opacity-70">Wind</p>
                <p className="font-semibold text-sm md:text-base">{weather.windSpeed} km/h</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 flex items-center gap-2 md:gap-3">
              <Cloud className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs uppercase tracking-wider opacity-70">Forecast</p>
                <p className="font-semibold text-sm md:text-base">Sunny all day</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeatherWidget