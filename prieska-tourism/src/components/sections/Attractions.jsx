import SectionTitle from '../ui/SectionTitle'
import { attractions } from '../../data/attractions'

const Attractions = () => {
  return (
    <section id="discover" className="py-16 px-4 max-w-7xl mx-auto bg-prieska-sand bg-opacity-20">
      <SectionTitle subtitle="THINGS TO DO" title="Discover Prieska" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {attractions.map((attr) => (
          <div key={attr.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition group">
            <div className="h-48 bg-gradient-to-br from-prieska-terracotta to-prieska-river flex items-center justify-center group-hover:scale-105 transition duration-500">
              <span className="text-white font-medium">Attraction Image</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif font-bold mb-2">{attr.name}</h3>
              <p className="text-gray-600 mb-4">{attr.description}</p>
              <div className="flex items-center text-prieska-terracotta font-medium">
                Learn more <span className="ml-1">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Attractions