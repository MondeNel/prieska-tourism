import { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons inline config
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Memoized Marker Styles static allocation - prevents severe memory re-allocation on re-renders
const MARKER_ICONS = {
  attraction: L.divIcon({
    className: 'custom-marker-attraction',
    html: `<div style="background-color:#7A3215;width:14px;height:14px;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35);transform:scale(1);transition:transform 0.2s ease;"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  }),
  accommodation: L.divIcon({
    className: 'custom-marker-accommodation',
    html: `<div style="background-color:#C8780A;width:14px;height:14px;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  }),
  adventure: L.divIcon({
    className: 'custom-marker-adventure',
    html: `<div style="background-color:#1A1F2E;width:14px;height:14px;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  }),
  town: L.divIcon({
    className: 'custom-marker-town',
    html: `<div style="background-color:#E8A020;width:10px;height:10px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.35);"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  })
};

const InteractiveMap = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Core Map Constraints Focus points
  const center = [-29.55, 22.6];
  const zoom = 8;
  const bounds = [
    [-30.4, 21.4], // Expanded bounds buffer slightly for edge pan leeway
    [-28.6, 23.6], 
  ];

  // Static Data Arrays wrapped outside or evaluated implicitly
  const towns = [
    { name: 'Prieska', lat: -29.6667, lon: 22.75 },
    { name: 'Marydale', lat: -29.3833, lon: 22.1167 },
    { name: 'Niekerkshoop', lat: -29.3333, lon: 22.8333 },
  ];

  const attractions = [
    { name: 'Die Bos Viewpoint', lat: -29.65, lon: 22.72, desc: 'Scenic viewpoint over the Orange River' },
    { name: 'Prieska Museum', lat: -29.67, lon: 22.74, desc: 'Local history and diamond mining exhibits' },
    { name: 'San Rock Art Site', lat: -29.55, lon: 22.80, desc: 'Ancient Bushman paintings' },
  ];

  const accommodations = [
    { name: 'Riverview Lodge', lat: -29.68, lon: 22.76, desc: 'Lodge on the banks of the Orange River' },
    { name: 'Gariep Country Lodge', lat: -29.67, lon: 22.73, desc: 'Cozy country lodge with warm hospitality' },
    { name: 'BoKáro Boutique Guesthouse', lat: -29.66, lon: 22.74, desc: 'Luxury boutique guesthouse' },
  ];

  const adventures = [
    { name: 'Orange River Canoe Launch', lat: -29.72, lon: 22.78, desc: 'Start point for canoe trips' },
    { name: 'Hunting Farm #1', lat: -29.58, lon: 22.60, desc: 'Guided hunting excursions' },
    { name: 'Stargazing Site', lat: -29.70, lon: 22.70, desc: 'Dark sky observation point' },
  ];

  const riverPath = [
    [-29.52, 22.1],
    [-29.55, 22.3],
    [-29.60, 22.6],
    [-29.65, 22.8],
    [-29.70, 23.0],
  ];

  // Layer filter helper logic
  const shouldShow = (type) => activeFilter === 'all' || activeFilter === type;

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full bg-gray-50 p-3 sm:p-4 rounded-2xl border border-gray-100">
      
      {/* Map Element Container */}
      <div className="relative rounded-xl overflow-hidden w-full lg:flex-1 aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[550px] shadow-sm inner-map-layer">
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
          maxBounds={bounds}
          maxBoundsViscosity={0.9}
        >
          {/* Using highly modern, elegant Positron Light Tiles from CartoDB matching elegant Editorial Design style */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          
          <Polyline positions={riverPath} color="#2B6CB0" weight={3.5} opacity={0.65} dashArray="2, 6" />
          
          {/* Town Markers */}
          {towns.map((town) => (
            <Marker key={town.name} position={[town.lat, town.lon]} icon={MARKER_ICONS.town}>
              <Popup className="custom-popup">
                <div className="font-serif text-sm font-bold text-[#1A1F2E]">{town.name}</div>
                <p className="text-[11px] text-gray-500 m-0 mt-0.5 font-sans">Northern Cape Hub Town</p>
              </Popup>
            </Marker>
          ))}

          {/* Attractions Layer */}
          {shouldShow('attraction') && attractions.map((place) => (
            <Marker key={place.name} position={[place.lat, place.lon]} icon={MARKER_ICONS.attraction}>
              <Popup>
                <div className="font-sans font-bold text-xs text-[#7A3215] uppercase tracking-wider mb-1">Attraction</div>
                <div className="font-serif font-bold text-sm text-[#1A1F2E]">{place.name}</div>
                <p className="text-xs text-gray-600 m-0 mt-1 leading-relaxed">{place.desc}</p>
              </Popup>
            </Marker>
          ))}

          {/* Accommodation Layer */}
          {shouldShow('accommodation') && accommodations.map((place) => (
            <Marker key={place.name} position={[place.lat, place.lon]} icon={MARKER_ICONS.accommodation}>
              <Popup>
                <div className="font-sans font-bold text-xs text-[#C8780A] uppercase tracking-wider mb-1">Accommodation</div>
                <div className="font-serif font-bold text-sm text-[#1A1F2E]">{place.name}</div>
                <p className="text-xs text-gray-600 m-0 mt-1 leading-relaxed">{place.desc}</p>
              </Popup>
            </Marker>
          ))}

          {/* Adventures Layer */}
          {shouldShow('adventure') && adventures.map((place) => (
            <Marker key={place.name} position={[place.lat, place.lon]} icon={MARKER_ICONS.adventure}>
              <Popup>
                <div className="font-sans font-bold text-xs text-[#1A1F2E] uppercase tracking-wider mb-1">Adventure</div>
                <div className="font-serif font-bold text-sm text-[#1A1F2E]">{place.name}</div>
                <p className="text-xs text-gray-600 m-0 mt-1 leading-relaxed">{place.desc}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Fully Mobile Responsive Filter Controller Side Panel */}
      <div className="w-full lg:w-72 bg-white rounded-xl border border-gray-100 p-4 sm:p-5 flex flex-col justify-between shadow-sm">
        <div>
          <div className="font-serif text-base font-black text-[#1A1F2E] mb-1">Siyathemba Region</div>
          <p className="text-xs text-gray-400 mb-4 font-medium">Toggle layers to filter points of interest across the Karoo landscape.</p>
          
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {[
              { id: 'all', color: 'bg-gray-400', label: 'All Items' },
              { id: 'attraction', color: 'bg-[#7A3215]', label: 'Attractions' },
              { id: 'accommodation', color: 'bg-[#C8780A]', label: 'Where to Stay' },
              { id: 'adventure', color: 'bg-[#1A1F2E]', label: 'Adventures' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 text-left rounded-xl border transition-all duration-200 text-xs font-bold ${
                  activeFilter === btn.id
                    ? 'border-[#1A1F2E] bg-gray-50 text-[#1A1F2E] shadow-xs'
                    : 'border-gray-100 text-[#5A4A3A] hover:bg-gray-50/50'
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${btn.color} shrink-0`} />
                <span className="truncate">{btn.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-50 hidden lg:block">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500">
              <i className="fas fa-water text-blue-500 w-4 text-center"></i>
              <span>Orange River Route</span>
            </div>
          </div>
        </div>

        <button className="mt-4 lg:mt-6 w-full bg-[#1A1F2E] hover:bg-[#E8A020] text-white font-bold text-xs py-3.5 rounded-xl transition duration-300 uppercase tracking-wider shadow-sm flex items-center justify-center gap-2">
          <i className="fas fa-expand-arrows-alt text-[10px]"></i>
          <span>Open Full Route Map</span>
        </button>
      </div>
    </div>
  );
};

export default InteractiveMap;