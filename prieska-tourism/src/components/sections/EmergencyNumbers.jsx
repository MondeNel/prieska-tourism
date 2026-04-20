import SectionTitle from '../ui/SectionTitle'
import { emergencyCategories } from '../../data/emergencyNumbers'
import { PhoneCall } from 'lucide-react'

const EmergencyNumbers = () => {
  return (
    <section id="emergency" className="py-16 px-4 max-w-7xl mx-auto">
      <SectionTitle subtitle="KEEP THIS HANDY" title="Emergency & Important Numbers" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emergencyCategories.map((category) => {
          const Icon = category.icon
          return (
            <div 
              key={category.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <div className={`${category.color} px-5 py-4 flex items-center gap-3`}>
                <Icon className="text-white" size={24} />
                <h3 className="text-white font-serif font-bold text-lg">{category.title}</h3>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {category.numbers.map((item, idx) => (
                  <div key={idx} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{item.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                      </div>
                      <a 
                        href={`tel:${item.number.replace(/\s/g, '')}`}
                        className="flex items-center gap-1 bg-prieska-terracotta/10 dark:bg-prieska-terracotta/20 text-prieska-terracotta dark:text-prieska-terracotta font-bold text-lg px-3 py-1 rounded-lg hover:bg-prieska-terracotta hover:text-white dark:hover:bg-prieska-terracotta dark:hover:text-white transition"
                      >
                        <PhoneCall size={14} />
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