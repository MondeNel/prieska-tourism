// src/components/ui/ApplyJobModal.jsx
import { useState } from 'react'
import { X, User, Mail, Phone, FileText, Upload } from 'lucide-react'

const ApplyJobModal = ({ isOpen, onClose, vacancy }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: ''
  })
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen || !vacancy) return null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
      setFormData({ name: '', email: '', phone: '', coverLetter: '' })
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg md:text-xl font-serif font-bold text-gray-800 dark:text-white">
              Apply Now
            </h3>
            <button 
              onClick={onClose} 
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Job Summary */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-4">
            <p className="font-semibold text-gray-800 dark:text-white text-sm">{vacancy.title}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{vacancy.company} • {vacancy.type}</p>
          </div>
          
          {submitted ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
              <div className="text-green-600 dark:text-green-400 text-4xl mb-3">✓</div>
              <h4 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">
                Application Submitted!
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                The employer will review your application and contact you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                    placeholder="082 555 1234"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cover Letter
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    name="coverLetter"
                    rows="4"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent resize-none"
                    placeholder="Tell the employer why you're a great fit..."
                  />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-xs mb-2">
                  <Upload className="w-4 h-4" />
                  <span>Attach CV (Optional)</span>
                </div>
                <button
                  type="button"
                  className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg py-3 text-xs text-gray-500 dark:text-gray-400 hover:border-prieska-terracotta hover:text-prieska-terracotta transition"
                >
                  Tap to upload your CV
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-prieska-terracotta text-white py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-opacity-90 transition"
              >
                Submit Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApplyJobModal