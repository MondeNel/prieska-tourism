import { useState } from 'react'
import SectionTitle from '../components/ui/SectionTitle'
import QuoteModal from '../components/ui/QuoteModal'
import { services } from '../data/services'

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  const openQuoteModal = (service) => {
    setSelectedService(service)
    setModalOpen(true)
  }

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <SectionTitle subtitle="WHAT WE OFFER" title="Our Services & Experiences" />
      <p className="text-center text-gray-600 max-w-3xl mx-auto -mt-6 mb-12">
        From historical tours to river adventures, let us help you create unforgettable memories in Prieska.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 border border-gray-100">
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-serif font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{service.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span className="font-semibold text-prieska-terracotta">{service.price}</span>
              <span>⏱️ {service.duration}</span>
            </div>
            <button
              onClick={() => openQuoteModal(service)}
              className="w-full border border-prieska-terracotta text-prieska-terracotta hover:bg-prieska-terracotta hover:text-white font-medium py-2 rounded-lg transition"
            >
              Request Quote
            </button>
          </div>
        ))}
      </div>

      <QuoteModal isOpen={modalOpen} onClose={() => setModalOpen(false)} service={selectedService} />
    </div>
  )
}

export default Services