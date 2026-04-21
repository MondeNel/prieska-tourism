// src/components/sections/InteractiveMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import SectionTitle from '../ui/SectionTitle'

// Create custom colored icons for each category
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
  attraction: createCustomIcon('#22c55e'), // green
  accommodation: createCustomIcon('#3b82f6'), // blue
  business: createCustomIcon('#f97316'), // orange
  default: createCustomIcon('#6b7280'), // gray
}

// Prieska center coordinates (town center)
const PRIESKA_CENTER = [-29.6669, 22.7444]

// Updated locations with verified/approximate coordinates
const mapLocations = [
  { 
    id: 1, 
    name: 'Die Bos Nature Reserve', 
    type: 'attraction', 
    lat: -29.6620, 
    lng: 22.7320, 
    desc: 'Hiking, birding, picnic spots along the Orange River' 
  },
  { 
    id: 2, 
    name: 'Prieska Koppie Fort', 
    type: 'attraction', 
    lat: -29.6680, 
    lng: 22.7420, 
    desc: 'Historic fort built with tiger\'s eye stone' 
  },
  { 
    id: 3, 
    name: 'Wonderdraai', 
    type: 'attraction', 
    lat: -29.6800, 
    lng: 22.7500, 
    desc: 'River bend where water appears to flow uphill' 
  },
  { 
    id: 4, 
    name: 'Gariep Country Lodge', 
    type: 'accommodation', 
    lat: -29.6670, 
    lng: 22.7400, 
    desc: 'Guesthouse on Main Road with secure parking' 
  },
  { 
    id: 5, 
    name: 'GWK Fuel Station', 
    type: 'business', 
    lat: -29.6640, 
    lng: 22.7380, 
    desc: '24/7 fuel, convenience store, clean restrooms' 
  },
  { 
    id: 6, 
    name: 'Spar Tieroog Mall', 
    type: 'business', 
    lat: -29.6620, 
    lng: 22.7450, 
    desc: 'Supermarket with bakery, deli, fresh produce' 
  },
  { 
    id: 7, 
    name: 'Delikaat Bed & Coffee', 
    type: 'accommodation', 
    lat: -29.6650, 
    lng: 22.7420, 
    desc: 'Self-catering units near Prieska Museum' 
  },
  { 
    id: 8, 
    name: 'OVK Fuel Station', 
    type: 'business', 
    lat: -29.6700, 
    lng: 22.7500, 
    desc: 'Fuel and QuickShop on N10 Highway' 
  },
]

const getMarkerIcon = (type) => {
  return markerIcons[type] || markerIcons.default
}

const InteractiveMap = () => {
  return (
    <section id="map" className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      <SectionTitle subtitle="EXPLORE THE AREA" title="Interactive Map" />
      
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
            {mapLocations.map(loc => (
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
                      loc.type === 'accommodation' ? 'bg-blue-500' : 
                      'bg-orange-500'
                    }`}>
                      {loc.type}
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      
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