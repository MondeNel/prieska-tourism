// src/components/sections/Vacancies.jsx
import { useState, useEffect } from 'react'
import { vacancies, getRelativeTime } from '../../data/vacancies'
import { MapPin, Clock, Send, Plus } from 'lucide-react'
import PostVacancyModal from '../ui/PostVacancyModal'
import ApplyJobModal from '../ui/ApplyJobModal'

const VacanciesSkeleton = () => (
  <div className="space-y-3">
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
      </div>
    </div>
    {Array(3).fill(0).map((_, i) => (
      <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
            <div className="flex gap-2 pt-2">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)

const Vacancies = () => {
  const [showPostModal, setShowPostModal] = useState(false)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [selectedVacancy, setSelectedVacancy] = useState(null)
  const [selectedType, setSelectedType] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(timer) }, [])
  if (loading) return <VacanciesSkeleton />

  const types = ['all', ...new Set(vacancies.map(v => v.type.toLowerCase()))]
  const filteredVacancies = selectedType === 'all' ? vacancies : vacancies.filter(v => v.type.toLowerCase() === selectedType)
  const handleApply = (vacancy) => { setSelectedVacancy(vacancy); setShowApplyModal(true) }

  return (
    <div className="space-y-3">
      <button onClick={() => setShowPostModal(true)} className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4 flex items-center gap-2 sm:gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition group">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white"><Plus className="w-4 h-4 sm:w-5 sm:h-5" /></div>
        <div className="flex-1 text-left"><p className="text-[11px] sm:text-sm font-medium text-gray-800 dark:text-white group-hover:text-prieska-terracotta transition">Post a Vacancy</p><p className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400">Share a job opportunity with the community</p></div>
      </button>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {types.map(type => (
          <button key={type} onClick={() => setSelectedType(type)} className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium capitalize whitespace-nowrap transition ${selectedType === type ? 'bg-prieska-terracotta text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-prieska-terracotta'}`}>{type === 'all' ? 'All Types' : type}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:gap-3">
        {filteredVacancies.map(vacancy => {
          const IconComponent = vacancy.icon; const postedTime = getRelativeTime(vacancy.postedDate)
          return (
            <div key={vacancy.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-3 sm:p-4 pb-1 sm:pb-2">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg"><IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-gray-800 dark:text-white text-[11px] sm:text-sm">{vacancy.title}</h3>
                      <span className="text-[8px] sm:text-[10px] font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 sm:px-2 py-0.5 rounded-full">{vacancy.type}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">{vacancy.company}</p>
                  </div>
                </div>
              </div>
              <div className="px-3 sm:px-4 pb-2 sm:pb-3">
                <p className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs leading-relaxed line-clamp-2">{vacancy.description}</p>
              </div>
              <div className="px-3 sm:px-4 pb-2 sm:pb-3 text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5"><MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" /><span>{vacancy.location}</span><span className="text-gray-300 dark:text-gray-600">•</span><Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" /><span>{postedTime}</span></div>
              </div>
              <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                <button onClick={() => handleApply(vacancy)} className="w-full bg-prieska-terracotta text-white py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-sm font-medium hover:bg-opacity-90 transition flex items-center justify-center gap-1.5"><Send className="w-3 h-3 sm:w-4 sm:h-4" />Apply Now</button>
              </div>
            </div>
          )
        })}
      </div>
      {filteredVacancies.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-[11px] sm:text-sm">No vacancies in this category yet.</p>}
      <PostVacancyModal isOpen={showPostModal} onClose={() => setShowPostModal(false)} />
      <ApplyJobModal isOpen={showApplyModal} onClose={() => setShowApplyModal(false)} vacancy={selectedVacancy} />
    </div>
  )
}

export default Vacancies