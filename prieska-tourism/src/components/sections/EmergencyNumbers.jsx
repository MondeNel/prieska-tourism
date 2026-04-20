// src/components/sections/EmergencyNumbers.jsx
import SectionTitle from '../ui/SectionTitle'
import { emergencyCategories } from '../../data/emergencyNumbers'
import { PhoneCall } from 'lucide-react'

const EmergencyNumbers = () => {
  return (
    <section id="emergency" className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      <SectionTitle subtitle="KEEP THIS HANDY" title="Emergency & Important Numbers" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {emergencyCategories.map((category) => {
          const Icon = category.icon
          return (
            <div 
              key={category.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <div className={`${category.color} px-4 md:px-5 py-3 md:py-4 flex items-center gap-2 md:gap-3`}>
                <Icon className="text-white w-5 h-5 md:w-6 md:h-6" />
                <h3 className="text-white font-serif font-bold text-base md:text-lg">{category.title}</h3>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {category.numbers.map((item, idx) => (
                  <div key={idx} className="p-3 md:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white text-sm md:text-base">{item.name}</p>
                        <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                      </div>
                      <a 
                        href={`tel:${item.number.replace(/\s/g, '')}`}
                        className="flex items-center gap-1 bg-prieska-terracotta/10 dark:bg-prieska-terracotta/20 text-prieska-terracotta dark:text-prieska-terracotta font-bold text-sm md:text-base px-2 md:px-3 py-1 rounded-lg hover:bg-prieska-terracotta hover:text-white dark:hover:bg-prieska-terracotta dark:hover:text-white transition whitespace-nowrap"
                      >
                        <PhoneCall className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        {item.number}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default EmergencyNumbers