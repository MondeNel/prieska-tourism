// src/pages/FAQ.jsx
import { useState } from 'react'
import LeftSidebar from '../components/layout/LeftSidebar'
import RightSidebar from '../components/layout/RightSidebar'
import SectionTitle from '../components/ui/SectionTitle'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { faqData } from '../data/faq'
import { getQuickStats } from '../data/activityFeed'
import { Newspaper, Calendar, Megaphone } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
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

            {/* FAQ Content */}
            <SectionTitle subtitle="GOT QUESTIONS?" title="Frequently Asked Questions" />
            
            <div className="space-y-2">
              {faqData.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <span className="font-medium text-gray-800 dark:text-white text-sm pr-4">
                      {item.question}
                    </span>
                    {openIndex === index ? (
                      <ChevronUp className="w-4 h-4 text-prieska-terracotta flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-300 text-xs leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Sidebar */}
          <RightSidebar className="lg:col-span-3" />
        </div>
      </div>
    </div>
  )
}

export default FAQ