import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons in Leaflet (needed for webpack)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const InteractiveMap = () => {
  // Coordinates for towns
  const towns = [
    { name: 'Prieska', lat: -29.6667, lon: 22.75, color: '#7A3215' },
    { name: 'Marydale', lat: -29.3833, lon: 22.1167, color: '#C8780A' },
    { name: 'Niekerkshoop', lat: -29.3333, lon: 22.8333, color: '#1A1F2E' },
  ];

  // Simplified Orange River path
  const riverPath = [
    [-29.5, 22.0],
    [-29.55, 22.3],
    [-29.6, 22.6],
    [-29.65, 22.8],
    [-29.7, 23.0],
  ];

  const center = [-29.6, 22.6];

  return (
    <div className="relative rounded-lg overflow-hidden h-[260px]">
      <MapContainer
        center={center}
        zoom={9}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Orange River polyline */}
        <Polyline positions={riverPath} color="rgba(60,120,200,0.7)" weight={4} />
        {/* Town markers */}
        {towns.map((town) => (
          <Marker key={town.name} position={[town.lat, town.lon]}>
            <Popup>
              <strong>{town.name}</strong>
              <br />
              Explore this town
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {/* Legend Overlay (same as before, positioned on top) */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 min-w-[140px] z-10">
        <div className="font-serif text-sm font-bold text-[#1A1F2E] mb-2">Map Layers</div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#5A4A3A]">
            <div className="w-2 h-2 rounded-full bg-[#7A3215]"></div>
            Attractions
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#5A4A3A]">
            <div className="w-2 h-2 rounded-full bg-[#C8780A]"></div>
            Accommodation
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#5A4A3A]">
            <div className="w-2 h-2 rounded-full bg-[#1A1F2E]"></div>
            Adventures
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#5A4A3A]">
            <div className="w-2 h-2 rounded-full bg-[rgba(60,120,200,0.7)]"></div>
            Orange River
          </div>
        </div>
        <button className="mt-3 w-full bg-[#7A3215] text-white font-bold text-xs py-1.5 rounded hover:bg-[#7A3215]/80 transition">
          <i className="fas fa-map mr-1"></i> Open Full Map
        </button>
      </div>
    </div>
  );
};

export default InteractiveMap;