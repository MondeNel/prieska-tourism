// src/services/weatherService.js
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// Prieska coordinates
const PRIESKA_COORDS = {
  lat: -29.6669,
  lon: 22.7444
}

export const fetchWeatherData = async () => {
  // If no API key is provided, return mock data immediately
  if (!API_KEY) {
    console.warn('No OpenWeather API key found. Using mock data.')
    return getMockWeatherData()
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${PRIESKA_COORDS.lat}&lon=${PRIESKA_COORDS.lon}&units=metric&appid=${API_KEY}`
    )
    
    if (!response.ok) {
      const errorData = await response.json()
      console.error('Weather API error:', errorData)
      throw new Error(errorData.message || 'Weather data fetch failed')
    }
    
    const data = await response.json()
    return formatWeatherData(data)
  } catch (error) {
    console.error('Error fetching weather:', error)
    return getMockWeatherData()
  }
}

export const fetchForecastData = async () => {
  if (!API_KEY) {
    console.warn('No OpenWeather API key found. Using mock forecast data.')
    return getMockForecastData()
  }

  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${PRIESKA_COORDS.lat}&lon=${PRIESKA_COORDS.lon}&units=metric&cnt=40&appid=${API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error('Forecast data fetch failed')
    }
    
    const data = await response.json()
    return formatForecastData(data)
  } catch (error) {
    console.error('Error fetching forecast:', error)
    return getMockForecastData()
  }
}

const formatWeatherData = (data) => {
  // Get wind direction as compass point
  const getWindDirection = (deg) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    const index = Math.round(deg / 22.5) % 16
    return directions[index]
  }

  return {
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
    windDirection: getWindDirection(data.wind.deg),
    pressure: data.main.pressure,
    location: data.name,
    country: data.sys.country,
    sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }),
    sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }),
    lastUpdated: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
  }
}

const formatForecastData = (data) => {
  const dailyForecasts = []
  const seenDates = new Set()
  
  for (const item of data.list) {
    const date = new Date(item.dt * 1000)
    const dateString = date.toLocaleDateString('en-ZA')
    
    // Only take one forecast per day (around midday)
    if (!seenDates.has(dateString) && date.getHours() >= 11 && date.getHours() <= 14) {
      seenDates.add(dateString)
      dailyForecasts.push({
        date: date.toLocaleDateString('en-ZA', { weekday: 'short' }),
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        condition: item.weather[0].main
      })
    }
    
    if (dailyForecasts.length >= 5) break
  }
  
  // If we don't have 5 days, fill with any available forecasts
  if (dailyForecasts.length < 5) {
    for (const item of data.list) {
      const date = new Date(item.dt * 1000)
      const dateString = date.toLocaleDateString('en-ZA')
      
      if (!seenDates.has(dateString)) {
        seenDates.add(dateString)
        dailyForecasts.push({
          date: date.toLocaleDateString('en-ZA', { weekday: 'short' }),
          temp: Math.round(item.main.temp),
          icon: item.weather[0].icon,
          condition: item.weather[0].main
        })
      }
      
      if (dailyForecasts.length >= 5) break
    }
  }
  
  return dailyForecasts
}

// Mock data for fallback
export const getMockWeatherData = () => {
  return {
    temp: 28,
    feelsLike: 26,
    condition: 'Clear',
    description: 'clear sky',
    icon: '01d',
    humidity: 35,
    windSpeed: 12,
    windDirection: 'SW',
    pressure: 1015,
    location: 'Prieska',
    country: 'ZA',
    sunrise: '06:45',
    sunset: '18:15',
    lastUpdated: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
  }
}

export const getMockForecastData = () => {
  return [
    { date: 'Mon', temp: 28, icon: '01d', condition: 'Clear' },
    { date: 'Tue', temp: 30, icon: '01d', condition: 'Clear' },
    { date: 'Wed', temp: 27, icon: '02d', condition: 'Clouds' },
    { date: 'Thu', temp: 25, icon: '10d', condition: 'Rain' },
    { date: 'Fri', temp: 26, icon: '01d', condition: 'Clear' }
  ]
}