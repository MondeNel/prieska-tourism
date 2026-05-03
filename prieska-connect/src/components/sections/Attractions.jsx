// src/components/sections/Attractions.jsx
import SectionTitle from '../ui/SectionTitle'
import { attractions } from '../../data/attractions'

const Attractions = () => {
  return (
    <section id="discover" className="py-12 md:py-16 px-4 max-w-7xl mx-auto bg-prieska-sand/20 dark:bg-gray-900">
      <SectionTitle subtitle="THINGS TO DO" title="Discover Prieska" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {attractions.map((attr) => (
          <div key={attr.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition group">
            <div className="h-40 md:h-48 bg-gradient-to-br from-prieska-terracotta to-prieska-river flex items-center justify-center group-hover:scale-105 transition duration-500">
              <span className="text-white text-sm md:text-base font-medium">Attraction Image</span>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-serif font-bold mb-1.5 md:mb-2 text-gray-800 dark:text-white">{attr.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3">{attr.description}</p>
              <div className="flex items-center text-prieska-terracotta dark:text-prieska-terracotta font-medium text-sm md:text-base">
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