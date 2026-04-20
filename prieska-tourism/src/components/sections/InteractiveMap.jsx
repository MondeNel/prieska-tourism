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
    <section id="map" className="py-16 px-4 max-w-7xl mx-auto">
      <SectionTitle subtitle="EXPLORE THE AREA" title="Interactive Map" />
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-2">
        <div className="h-[500px] w-full rounded-lg overflow-hidden">
          <MapContainer 
            center={PRIESKA_CENTER} 
            zoom={14} 
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mapLocations.map(loc => (
              <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                <Popup>
                  <div className="p-1">
                    <h4 className="font-bold text-gray-800">{loc.name}</h4>
                    <p className="text-sm text-gray-600">{loc.desc}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-white text-xs rounded-full ${getMarkerColor(loc.type)}`}>
                      {loc.type}
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Attractions</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Accommodation</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"></span> Businesses</div>
      </div>
    </section>
  )
}

export default InteractiveMap