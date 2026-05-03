// src/components/ui/ReportIssueModal.jsx
import { useState } from 'react'
import { X, MapPin, FileText, Phone, Image as ImageIcon } from 'lucide-react'
import { issueCategories } from '../../data/issueReporting'

const ReportIssueModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    category: 'pothole',
    title: '',
    description: '',
    location: '',
    reportedBy: '',
    contact: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState('')

  if (!isOpen) return null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const generateReference = () => {
    const date = new Date()
    const year = date.getFullYear()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `PRK-${year}-${random}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const ref = generateReference()
    setReferenceNumber(ref)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
      setFormData({
        category: 'pothole',
        title: '',
        description: '',
        location: '',
        reportedBy: '',
        contact: ''
      })
    }, 3000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg md:text-xl font-serif font-bold text-gray-800 dark:text-white">
              Report an Issue
            </h3>
            <button 
              onClick={onClose} 
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {submitted ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
              <div className="text-green-600 dark:text-green-400 text-4xl mb-3">✓</div>
              <h4 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">
                Issue Reported!
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Your reference number:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg py-3 px-4 mb-4">
                <span className="font-mono text-lg font-bold text-gray-800 dark:text-white">
                  {referenceNumber}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                The municipality will review your report. You can track status with this reference number.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Issue Type *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                >
                  {issueCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Brief Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                  placeholder="e.g., Large pothole on Main Road"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent resize-none"
                  placeholder="Please provide details about the issue..."
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                    placeholder="Street address or landmark"
                  />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-xs mb-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Add Photo (Optional)</span>
                </div>
                <button
                  type="button"
                  className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg py-3 text-xs text-gray-500 dark:text-gray-400 hover:border-prieska-terracotta hover:text-prieska-terracotta transition"
                >
                  Tap to upload a photo
                </button>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                  Photos help the municipality assess the issue faster.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="reportedBy"
                      required
                      value={formData.reportedBy}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-3 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contact *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      name="contact"
                      required
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-3 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                      placeholder="082 555 1234"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-prieska-terracotta text-white py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-opacity-90 transition"
              >
                Submit Report
              </button>
              
              <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                * This is a demo. Reports are simulated for demonstration purposes.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReportIssueModal