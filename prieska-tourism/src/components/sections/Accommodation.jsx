import { MapPin, Bed, Wifi, Car, Wind, Utensils } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import { accommodations } from '../../data/accommodations'

const Accommodation = () => {
  const getFeatureIcon = (feature) => {
    if (feature.includes('WiFi')) return <Wifi size={14} />
    if (feature.includes('Parking')) return <Car size={14} />
    if (feature.includes('A/C') || feature.includes('Air')) return <Wind size={14} />
    if (feature.includes('Breakfast')) return <Utensils size={14} />
    return <Bed size={14} />
  }

  return (
    <section id="accommodation" className="py-16 px-4 max-w-7xl mx-auto">
      <SectionTitle subtitle="STAY IN COMFORT" title="Prieska Guesthouses & Lodges" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {accommodations.map((place) => (
          <div 
            key={place.id} 
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
          >
            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-prieska-river to-prieska-terracotta flex items-center justify-center group-hover:scale-105 transition duration-500">
              <span className="text-white text-lg font-semibold opacity-80">Guesthouse Photo</span>
              <div className="absolute top-4 left-4">
                <span className="bg-prieska-terracotta text-white text-xs font-bold px-3 py-1 rounded-full">
                  {place.type}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-serif font-bold text-gray-800">
                  {place.name}
                </h3>
                <span className="text-prieska-terracotta font-semibold text-sm bg-orange-50 px-2 py-1 rounded">
                  {place.priceRange}
                </span>
              </div>
              
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <MapPin size={16} className="mr-1 text-prieska-terracotta" />
                <span>Prieska, Northern Cape</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {place.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4 border-t border-gray-100 pt-4">
                {place.features.map((feat, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {getFeatureIcon(feat)}
                    {feat}
                  </span>
                ))}
              </div>
              
              <button className="w-full border border-prieska-terracotta text-prieska-terracotta hover:bg-prieska-terracotta hover:text-white font-medium py-2 rounded-lg transition duration-200">
                View Availability
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">
                Tel: {place.contact}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <p className="text-gray-500 italic">
          * Frontend Demo — Contact details shown for illustrative purposes.
        </p>
      </div>
    </section>
  )
}

export default Accommodation