// src/components/ui/AddReviewModal.jsx
import { useState } from 'react'
import { X, Star } from 'lucide-react'

const AddReviewModal = ({ isOpen, onClose, accommodation }) => {
  const [formData, setFormData] = useState({ rating: 5, text: '', user: '' })
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen || !accommodation) return null

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); onClose(); setFormData({ rating: 5, text: '', user: '' }) }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-serif font-bold text-gray-800 dark:text-white">Write a Review</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1"><X className="w-5 h-5" /></button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{accommodation.name}</p>
          {submitted ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
              <div className="text-green-600 dark:text-green-400 text-4xl mb-3">✓</div>
              <h4 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">Review Submitted!</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Thank you for your feedback.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(star => (
                    <button type="button" key={star} onClick={() => setFormData({ ...formData, rating: star })}>
                      <Star className={`w-6 h-6 ${star <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                <input type="text" name="user" required value={formData.user} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Your Review</label>
                <textarea name="text" required rows={3} value={formData.text} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent resize-none" placeholder="Share your experience..." />
              </div>
              <button type="submit" className="w-full bg-prieska-terracotta text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-opacity-90 transition">Submit Review</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddReviewModal