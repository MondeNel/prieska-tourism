import { useState, useEffect } from 'react'
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer } from 'lucide-react'

// Mock data - replace with real API call later
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

  // Placeholder for real API integration
  // useEffect(() => { fetch from OpenWeatherMap }, [])

  const getWeatherIcon = (icon) => {
    switch(icon) {
      case 'sun': return <Sun size={48} className="text-yellow-500" />
      case 'cloud': return <Cloud size={48} className="text-gray-500" />
      case 'rain': return <CloudRain size={48} className="text-blue-500" />
      default: return <Sun size={48} className="text-yellow-500" />
    }
  }

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-prieska-river to-prieska-terracotta dark:from-prieska-river dark:to-prieska-terracotta rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {getWeatherIcon(weather.icon)}
              <div>
                <h3 className="text-3xl font-serif font-bold">{weather.location}</h3>
                <p className="text-white/80 text-sm">Updated just now</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-6xl font-bold">{weather.temp}°C</div>
              <p className="text-white/90">Feels like {weather.feelsLike}°C</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
              <Thermometer size={24} />
              <div>
                <p className="text-xs uppercase tracking-wider opacity-80">Condition</p>
                <p className="font-semibold">{weather.condition}</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
              <Droplets size={24} />
              <div>
                <p className="text-xs uppercase tracking-wider opacity-80">Humidity</p>
                <p className="font-semibold">{weather.humidity}%</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
              <Wind size={24} />
              <div>
                <p className="text-xs uppercase tracking-wider opacity-80">Wind</p>
                <p className="font-semibold">{weather.windSpeed} km/h</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
              <Cloud size={24} />
              <div>
                <p className="text-xs uppercase tracking-wider opacity-80">Forecast</p>
                <p className="font-semibold">Sunny all day</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeatherWidget