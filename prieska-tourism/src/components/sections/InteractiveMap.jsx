// src/components/sections/InteractiveMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import SectionTitle from '../ui/SectionTitle'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Fix Leaflet default icon path issues
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

// Prieska coordinates
const PRIESKA_CENTER = [-29.6669, 22.7444]

const mapLocations = [
  { id: 1, name: 'Die Bos Nature Reserve', type: 'attraction', lat: -29.665, lng: 22.735, desc: 'Hiking, birding, picnic spots' },
  { id: 2, name: 'Prieska Koppie Fort', type: 'attraction', lat: -29.668, lng: 22.742, desc: 'Historic fort with tiger\'s eye' },
  { id: 3, name: 'Wonderdraai', type: 'attraction', lat: -29.680, lng: 22.750, desc: 'River appears to flow uphill' },
  { id: 4, name: 'Gariep Country Lodge', type: 'accommodation', lat: -29.667, lng: 22.740, desc: 'Guesthouse on Main Road' },
  { id: 5, name: 'GWK Fuel Station', type: 'business', lat: -29.664, lng: 22.738, desc: '24/7 fuel & convenience' },
  { id: 6, name: 'Spar Tieroog Mall', type: 'business', lat: -29.662, lng: 22.745, desc: 'Supermarket & shops' }
]

const getMarkerColor = (type) => {
  switch(type) {
    case 'attraction': return 'bg-green-500'
    case 'accommodation': return 'bg-blue-500'
    case 'business': return 'bg-orange-500'
    default: return 'bg-gray-500'
  }
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
              <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                <Popup>
                  <div className="p-0.5 md:p-1">
                    <h4 className="font-bold text-gray-800 text-sm md:text-base">{loc.name}</h4>
                    <p className="text-xs md:text-sm text-gray-600">{loc.desc}</p>
                    <span className={`inline-block mt-1 px-1.5 md:px-2 py-0.5 text-white text-[10px] md:text-xs rounded-full ${getMarkerColor(loc.type)}`}>
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