// src/pages/Services.jsx
import { useState } from 'react'
import LeftSidebar from '../components/layout/LeftSidebar'
import RightSidebar from '../components/layout/RightSidebar'
import SectionTitle from '../components/ui/SectionTitle'
import QuoteModal from '../components/ui/QuoteModal'
import { services } from '../data/services'
import { Clock, ArrowRight } from 'lucide-react'
import { getQuickStats } from '../data/activityFeed'
import { Newspaper, Calendar, Megaphone } from 'lucide-react'

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  const openQuoteModal = (service) => {
    setSelectedService(service)
    setModalOpen(true)
  }

  const stats = getQuickStats()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <LeftSidebar className="lg:col-span-3" />
          
          {/* Main Content Area */}
          <div id="main-feed" className="lg:col-span-6 overflow-y-auto max-h-[calc(100vh-100px)]">
            {/* Quick Stats */}
            <div className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-950 pb-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{stats.newsThisWeek}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Newspaper className="w-3 h-3 text-blue-500" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">News</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{stats.upcomingEvents}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Calendar className="w-3 h-3 text-green-500" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Events</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm">
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{stats.newNotices}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Megaphone className="w-3 h-3 text-purple-500" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Notices</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Content */}
            <SectionTitle subtitle="WHAT WE OFFER" title="Our Services & Experiences" />
            <p className="text-center text-sm text-gray-600 dark:text-gray-300 -mt-4 mb-6">
              From historical tours to river adventures, let us help you create unforgettable memories.
            </p>

            <div className="space-y-3">
              {services.map((service) => {
                const IconComponent = service.icon
                return (
                  <div 
                    key={service.id} 
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-prieska-terracotta/10 dark:bg-prieska-terracotta/20 rounded-xl group-hover:scale-105 transition-transform">
                        <IconComponent className="w-6 h-6 text-prieska-terracotta" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-serif font-bold text-gray-800 dark:text-white mb-1">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                            <span className="font-semibold text-prieska-terracotta">{service.price}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {service.duration}
                            </span>
                          </div>
                          <button
                            onClick={() => openQuoteModal(service)}
                            className="flex items-center gap-1.5 text-sm font-medium text-prieska-terracotta hover:text-white bg-prieska-terracotta/10 hover:bg-prieska-terracotta px-4 py-2 rounded-lg transition"
                          >
                            Request Quote
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Right Sidebar */}
          <RightSidebar className="lg:col-span-3" />
        </div>
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