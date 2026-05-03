// src/components/sections/InteractiveMap.jsx
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import SectionTitle from '../ui/SectionTitle'
import { Search, Navigation, X, MapPin } from 'lucide-react'

// Create custom colored icons
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  })
}

const markerIcons = {
  attraction: createCustomIcon('#22c55e'),
  accommodation: createCustomIcon('#3b82f6'),
  business: createCustomIcon('#f97316'),
}

const PRIESKA_CENTER = [-29.6669, 22.7444]

const mapLocations = [
  { id: 1, name: 'Die Bos Nature Reserve', type: 'attraction', lat: -29.6620, lng: 22.7320, desc: 'Hiking, birding, picnic spots' },
  { id: 2, name: 'Prieska Koppie Fort', type: 'attraction', lat: -29.6680, lng: 22.7420, desc: 'Historic fort built with tiger\'s eye' },
  { id: 3, name: 'Wonderdraai', type: 'attraction', lat: -29.6800, lng: 22.7500, desc: 'River appears to flow uphill' },
  { id: 4, name: 'Gariep Country Lodge', type: 'accommodation', lat: -29.6670, lng: 22.7400, desc: 'Guesthouse on Main Road' },
  { id: 5, name: 'GWK Fuel Station', type: 'business', lat: -29.6640, lng: 22.7380, desc: '24/7 fuel & convenience' },
  { id: 6, name: 'Spar Tieroog Mall', type: 'business', lat: -29.6620, lng: 22.7450, desc: 'Supermarket & shops' },
  { id: 7, name: 'Delikaat Bed & Coffee', type: 'accommodation', lat: -29.6650, lng: 22.7420, desc: 'Self-catering units' },
  { id: 8, name: 'OVK Fuel Station', type: 'business', lat: -29.6700, lng: 22.7500, desc: 'Fuel and QuickShop on N10' },
]

// Component to fly to searched location
const MapController = ({ center, zoom }) => {
  const map = useMap()
  if (center) {
    map.flyTo(center, zoom || 15)
  }
  return null
}

const InteractiveMap = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredLocations, setFilteredLocations] = useState(mapLocations)
  const [flyToCenter, setFlyToCenter] = useState(null)
  const [flyToZoom, setFlyToZoom] = useState(13)
  const [showSearch, setShowSearch] = useState(false)

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase()
    setSearchTerm(value)
    
    if (value.trim() === '') {
      setFilteredLocations(mapLocations)
      setFlyToCenter(null)
      return
    }

    const filtered = mapLocations.filter(
      loc => loc.name.toLowerCase().includes(value) || 
             loc.type.toLowerCase().includes(value) ||
             loc.desc.toLowerCase().includes(value)
    )
    setFilteredLocations(filtered)

    // Fly to first match
    if (filtered.length > 0) {
      setFlyToCenter([filtered[0].lat, filtered[0].lng])
      setFlyToZoom(15)
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
    setFilteredLocations(mapLocations)
    setFlyToCenter(null)
  }

  const getDirections = (location) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
    window.open(url, '_blank')
  }

  const getMarkerIcon = (type) => markerIcons[type] || markerIcons.attraction

  return (
    <section id="map" className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      <SectionTitle subtitle="EXPLORE THE AREA" title="Interactive Map" />

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => setShowSearch(true)}
            placeholder="Search for a place or business..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-10 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
          />
          {searchTerm && (
            <button 
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showSearch && searchTerm && filteredLocations.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mt-1 max-h-48 overflow-y-auto">
            {filteredLocations.map(loc => (
              <button
                key={loc.id}
                onClick={() => {
                  setFlyToCenter([loc.lat, loc.lng])
                  setFlyToZoom(16)
                  setShowSearch(false)
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left"
              >
                <MapPin className="w-4 h-4 text-prieska-terracotta flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{loc.name}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">{loc.desc}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-1.5 md:p-2">
        <div className="h-[350px] sm:h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden">
          <MapContainer 
            center={PRIESKA_CENTER} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
            className="z-0"
            scrollWheelZoom={true}
            dragging={true}
            touchZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <MapController center={flyToCenter} zoom={flyToZoom} />
            
            {(searchTerm ? filteredLocations : mapLocations).map(loc => (
              <Marker 
                key={loc.id} 
                position={[loc.lat, loc.lng]}
                icon={getMarkerIcon(loc.type)}
              >
                <Popup>
                  <div className="p-0.5 md:p-1">
                    <h4 className="font-bold text-gray-800 text-sm md:text-base">{loc.name}</h4>
                    <p className="text-xs md:text-sm text-gray-600">{loc.desc}</p>
                    <span className={`inline-block mt-1 px-1.5 md:px-2 py-0.5 text-white text-[10px] md:text-xs rounded-full ${
                      loc.type === 'attraction' ? 'bg-green-500' : 
                      loc.type === 'accommodation' ? 'bg-blue-500' : 'bg-orange-500'
                    }`}>
                      {loc.type}
                    </span>
                    <button
                      onClick={() => getDirections(loc)}
                      className="mt-2 flex items-center gap-1 text-xs text-prieska-terracotta hover:underline"
                    >
                      <Navigation className="w-3 h-3" />
                      Get Directions
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 md:mt-6 text-xs md:text-sm">
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></span> 
          <span className="text-gray-700 dark:text-gray-300">Attractions</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-blue-500"></span> 
          <span className="text-gray-700 dark:text-gray-300">Accommodation</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-orange-500"></span> 
          <span className="text-gray-700 dark:text-gray-300">Businesses</span>
        </div>
      </div>
    </section>
  )
}

export default InteractiveMap