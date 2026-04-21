// src/components/sections/Schools.jsx
import SectionTitle from '../ui/SectionTitle'
import { primarySchools, highSchools } from '../../data/schools'
import { MapPin, Phone } from 'lucide-react'

const Schools = () => {
  return (
     <section id="schools" className="py-12 md:py-16 px-4 max-w-7xl mx-auto bg-white dark:bg-gray-900">
      <SectionTitle subtitle="EDUCATION IN PRIESKA" title="Schools & Learning" />
      
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto -mt-4 md:-mt-6 mb-8 md:mb-10 text-sm md:text-base">
        Prieska offers quality education through several primary and high schools serving the local community.
      </p>

      {/* Primary Schools */}
      <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-800 dark:text-white mb-4 md:mb-6">
        Primary Schools
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
        {primarySchools.map(school => {
          const IconComponent = school.icon
          return (
            <div key={school.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 dark:text-white text-base md:text-lg">{school.name}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mt-1">{school.description}</p>
                  <div className="flex items-center gap-1 mt-2 text-gray-500 dark:text-gray-400 text-xs">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span>{school.location}</span>
                  </div>
                  {school.phone && (
                    <div className="flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-400 text-xs">
                      <Phone className="w-3 h-3 flex-shrink-0" />
                      <a href={`tel:${school.phone.replace(/\s/g, '')}`} className="hover:text-prieska-terracotta transition">
                        {school.phone}
                      </a>
                      {school.phoneAlt && (
                        <span> / <a href={`tel:${school.phoneAlt.replace(/\s/g, '')}`} className="hover:text-prieska-terracotta transition">{school.phoneAlt}</a></span>
                      )}
                      {school.whatsapp && (
                        <span className="ml-2">
                          <a href={`https://wa.me/${school.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                            WhatsApp
                          </a>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* High Schools */}
      <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-800 dark:text-white mb-4 md:mb-6">
        High Schools
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {highSchools.map(school => {
          const IconComponent = school.icon
          return (
            <div key={school.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 dark:text-white text-base md:text-lg">{school.name}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mt-1">{school.description}</p>
                  <div className="flex items-center gap-1 mt-2 text-gray-500 dark:text-gray-400 text-xs">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span>{school.location}</span>
                  </div>
                  {school.phone && (
                    <div className="flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-400 text-xs">
                      <Phone className="w-3 h-3 flex-shrink-0" />
                      <a href={`tel:${school.phone.replace(/\s/g, '')}`} className="hover:text-prieska-terracotta transition">
                        {school.phone}
                      </a>
                      {school.phoneAlt && (
                        <span> / <a href={`tel:${school.phoneAlt.replace(/\s/g, '')}`} className="hover:text-prieska-terracotta transition">{school.phoneAlt}</a></span>
                      )}
                      {school.whatsapp && (
                        <span className="ml-2">
                          <a href={`https://wa.me/${school.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                            WhatsApp
                          </a>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Schools