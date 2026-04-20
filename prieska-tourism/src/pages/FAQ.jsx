// src/pages/FAQ.jsx
import { useState } from 'react'
import SectionTitle from '../components/ui/SectionTitle'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { faqData } from '../data/faq'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="py-8 md:py-16 px-4 max-w-4xl mx-auto min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <SectionTitle subtitle="GOT QUESTIONS?" title="Frequently Asked Questions" />
      
      <div className="space-y-2 md:space-y-3">
        {faqData.map((item, index) => (
          <div 
            key={index} 
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 transition-colors duration-200"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 md:p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
            >
              <span className="font-semibold text-gray-800 dark:text-white text-sm md:text-base pr-4">
                {item.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-prieska-terracotta flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 md:px-5 pb-4 md:pb-5 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 text-sm md:text-base leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ