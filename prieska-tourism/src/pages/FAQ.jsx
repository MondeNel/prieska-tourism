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
    <div className="py-16 px-4 max-w-4xl mx-auto">
      <SectionTitle subtitle="GOT QUESTIONS?" title="Frequently Asked Questions" />
      
      <div className="space-y-3">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition"
            >
              <span className="font-semibold text-gray-800">{item.question}</span>
              {openIndex === index ? <ChevronUp size={20} className="text-prieska-terracotta" /> : <ChevronDown size={20} />}
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-600 bg-gray-50 border-t border-gray-200">
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