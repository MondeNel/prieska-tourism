import { useState } from 'react'
import SectionTitle from '../components/ui/SectionTitle'
import QuoteModal from '../components/ui/QuoteModal'
import { services } from '../data/services'
import { Clock } from 'lucide-react'

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  const openQuoteModal = (service) => {
    setSelectedService(service)
    setModalOpen(true)
  }

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <SectionTitle subtitle="WHAT WE OFFER" title="Our Services & Experiences" />
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto -mt-6 mb-12">
        From historical tours to river adventures, let us help you create unforgettable memories in Prieska.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
          const IconComponent = service.icon
          return (
            <div 
              key={service.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 flex flex-col"
            >
              <div className="p-3 bg-prieska-terracotta/10 dark:bg-prieska-terracotta/20 rounded-xl w-fit mb-4">
                <IconComponent size={28} className="text-prieska-terracotta dark:text-prieska-terracotta" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2 text-gray-800 dark:text-white">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1">
                {service.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="font-semibold text-prieska-terracotta dark:text-prieska-terracotta">
                  {service.price}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {service.duration}
                </span>
              </div>
              <button
                onClick={() => openQuoteModal(service)}
                className="w-full border border-prieska-terracotta text-prieska-terracotta dark:text-prieska-terracotta hover:bg-prieska-terracotta hover:text-white dark:hover:text-white font-medium py-2.5 rounded-lg transition-all duration-200"
              >
                Request Quote
              </button>
            </div>
          )
        })}
      </div>

      <QuoteModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        service={selectedService} 
      />
    </div>
  )
}

export default Services