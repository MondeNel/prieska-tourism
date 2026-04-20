// src/components/sections/Vacancies.jsx
import { useState } from 'react'
import SectionTitle from '../ui/SectionTitle'
import { vacancies, getRelativeTime } from '../../data/vacancies'
import { MapPin, Clock, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react'
import PostVacancyModal from '../ui/PostVacancyModal'

const Vacancies = () => {
  const [expandedId, setExpandedId] = useState(null)
  const [showPostModal, setShowPostModal] = useState(false)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="vacancies" className="py-12 md:py-16 px-4 max-w-7xl mx-auto bg-gradient-to-b from-white to-prieska-sand/10 dark:from-gray-900 dark:to-gray-800">
      <SectionTitle subtitle="WORK IN PRIESKA" title="Job Vacancies" />
      
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto -mt-4 md:-mt-6 mb-8 md:mb-10 text-sm md:text-base">
        Discover employment opportunities in and around Prieska. Connect directly with local businesses looking for talent.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {vacancies.map((vacancy) => {
          const IconComponent = vacancy.icon
          const isExpanded = expandedId === vacancy.id
          const postedTime = getRelativeTime(vacancy.postedDate)

          return (
            <div 
              key={vacancy.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div 
                className="p-4 md:p-5 cursor-pointer"
                onClick={() => toggleExpand(vacancy.id)}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-prieska-terracotta/10 dark:bg-prieska-terracotta/20 rounded-lg md:rounded-xl">
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-prieska-terracotta dark:text-prieska-terracotta" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base md:text-lg font-serif font-bold text-gray-800 dark:text-white">
                          {vacancy.title}
                        </h3>
                        <p className="text-prieska-terracotta dark:text-prieska-terracotta font-medium text-xs md:text-sm">
                          {vacancy.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <span className="text-[10px] md:text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full font-medium">
                          {vacancy.type}
                        </span>
                        {isExpanded ? 
                          <ChevronUp className="w-4 h-4 md:w-4.5 md:h-4.5 text-gray-400 dark:text-gray-500" /> : 
                          <ChevronDown className="w-4 h-4 md:w-4.5 md:h-4.5 text-gray-400 dark:text-gray-500" />
                        }
                      </div>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 mt-1.5 md:mt-2 text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        {vacancy.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        {postedTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-gray-100 dark:border-gray-700 pt-3 md:pt-4 bg-gray-50/50 dark:bg-gray-900/30">
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                    {vacancy.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                    <a 
                      href={`tel:${vacancy.contactPhone.replace(/\s/g, '')}`}
                      className="flex-1 bg-prieska-terracotta text-white px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium hover:bg-opacity-90 transition flex items-center justify-center gap-1.5 md:gap-2"
                    >
                      <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Call to Apply
                    </a>
                    <a 
                      href={`mailto:${vacancy.contactEmail}?subject=Application for ${vacancy.title}`}
                      className="flex-1 border border-prieska-terracotta text-prieska-terracotta dark:text-prieska-terracotta px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium hover:bg-prieska-terracotta hover:text-white dark:hover:text-white transition flex items-center justify-center gap-1.5 md:gap-2"
                    >
                      <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Email Application
                    </a>
                  </div>
                  
                  <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500 text-center mt-2 md:mt-3">
                    Contact: {vacancy.contactPhone} • {vacancy.contactEmail}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="text-center mt-10 md:mt-12">
        <p className="text-gray-500 dark:text-gray-400 mb-3 md:mb-4 text-sm md:text-base">
          Are you an employer looking to hire in Prieska?
        </p>
        <button 
          onClick={() => setShowPostModal(true)}
          className="bg-white dark:bg-gray-800 border-2 border-prieska-terracotta text-prieska-terracotta dark:text-prieska-terracotta px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-semibold hover:bg-prieska-terracotta hover:text-white dark:hover:bg-prieska-terracotta dark:hover:text-white transition-all"
        >
          Post a Vacancy
        </button>
      </div>

      {/* Post Vacancy Modal */}
      <PostVacancyModal 
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
      />
    </section>
  )
}

export default Vacancies