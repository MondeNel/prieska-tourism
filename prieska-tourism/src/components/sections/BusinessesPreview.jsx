// src/components/sections/BusinessesPreview.jsx
import { businesses } from '../../data/businesses'
import { Store, MapPin, ArrowRight } from 'lucide-react'

const BusinessesPreview = ({ openModal }) => {
  const previewBusinesses = businesses.slice(0, 4)

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 dark:text-white">
            Local Businesses
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Shops and services in Prieska
          </p>
        </div>
        <button
          onClick={() => openModal?.('businesses')}
          className="flex items-center gap-1 text-prieska-terracotta font-medium text-sm hover:underline"
        >
          View More <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {previewBusinesses.map(business => {
          const Icon = business.icon
          return (
            <div
              key={business.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-prieska-terracotta/10 rounded-lg">
                  <Icon className="w-5 h-5 text-prieska-terracotta" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                  {business.name}
                </h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                {business.description}
              </p>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <MapPin className="w-3 h-3 mr-1" />
                {business.location}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default BusinessesPreview