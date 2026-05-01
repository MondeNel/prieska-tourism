// src/components/ui/AddGroupModal.jsx
import { useState } from 'react'
import { X, Users, MapPin, Phone, Clock, User, Tag } from 'lucide-react'

const groupCategories = [
  'churches',
  'community',
  'sports',
  'youth',
  'seniors',
  'arts',
  'social'
]

const categoryLabels = {
  churches: 'Churches',
  community: 'Community Service',
  sports: 'Sports & Recreation',
  youth: 'Youth & Children',
  seniors: 'Seniors',
  arts: 'Arts & Culture',
  social: 'Social Clubs'
}

const AddGroupModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'churches',
    description: '',
    location: '',
    meetingTimes: '',
    contactPerson: '',
    contact: ''
  })
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
      setFormData({
        name: '',
        category: 'churches',
        description: '',
        location: '',
        meetingTimes: '',
        contactPerson: '',
        contact: ''
      })
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg md:text-xl font-serif font-bold text-gray-800 dark:text-white">
              Add a Community Group
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
                Group Added!
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Your group will appear in the directory after review.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Group Name *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                    placeholder="e.g., Prieska Hiking Club"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category *
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                  >
                    {groupCategories.map(cat => (
                      <option key={cat} value={cat}>{categoryLabels[cat]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent resize-none"
                  placeholder="Describe the group and its activities..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                    placeholder="e.g., Community Hall, Victoria Street"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meeting Times
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="meetingTimes"
                    value={formData.meetingTimes}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                    placeholder="e.g., Sundays 9:00 AM"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contact Person
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-3 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contact Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-3 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                      placeholder="053 353 1234"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-prieska-terracotta text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-opacity-90 transition"
              >
                Add Group
              </button>
              
              <p className="text-center text-[10px] text-gray-400 dark:text-gray-500">
                * Groups are reviewed before appearing in the directory.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddGroupModal