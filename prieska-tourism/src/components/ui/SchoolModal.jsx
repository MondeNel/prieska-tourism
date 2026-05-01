// src/components/ui/SchoolModal.jsx
import { useState } from 'react'
import { X, MapPin, Phone, GraduationCap, CreditCard, User, BookOpen, Hash, Calendar } from 'lucide-react'

const SchoolModal = ({ isOpen, onClose, school }) => {
  const [showPayment, setShowPayment] = useState(false)
  const [paymentSubmitted, setPaymentSubmitted] = useState(false)
  
  const [paymentForm, setPaymentForm] = useState({
    learnerName: '',
    grade: '',
    studentNumber: '',
    amount: '',
    parentName: '',
    parentPhone: '',
    paymentMethod: 'eft'
  })

  if (!isOpen || !school) return null

  const handlePaymentChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    setPaymentSubmitted(true)
    setTimeout(() => {
      setPaymentSubmitted(false)
      setShowPayment(false)
      setPaymentForm({
        learnerName: '',
        grade: '',
        studentNumber: '',
        amount: '',
        parentName: '',
        parentPhone: '',
        paymentMethod: 'eft'
      })
    }, 2000)
  }

  const grades = ['Grade R', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg md:text-xl font-serif font-bold text-gray-800 dark:text-white">
              {school.name}
            </h3>
            <button 
              onClick={onClose} 
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!showPayment ? (
            <>
              {/* School Info */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{school.description}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{school.location}</span>
                  </div>
                  {school.phone && (
                    <a 
                      href={`tel:${school.phone.replace(/\s/g, '')}`} 
                      className="flex items-center gap-2 text-prieska-terracotta hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{school.phone}</span>
                    </a>
                  )}
                  {school.whatsapp && (
                    <a 
                      href={`https://wa.me/${school.whatsapp.replace(/\s/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-600 hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>WhatsApp: {school.whatsapp}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <a
                  href={`tel:${school.phone?.replace(/\s/g, '')}`}
                  className="w-full flex items-center justify-center gap-2 bg-prieska-terracotta text-white py-3 rounded-lg text-sm font-medium hover:bg-opacity-90 transition"
                >
                  <Phone className="w-4 h-4" />
                  Call School
                </a>
                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full flex items-center justify-center gap-2 border-2 border-prieska-terracotta text-prieska-terracotta py-3 rounded-lg text-sm font-medium hover:bg-prieska-terracotta hover:text-white transition"
                >
                  <CreditCard className="w-4 h-4" />
                  Pay School Fees Online
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Payment Form */}
              {paymentSubmitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                  <div className="text-green-600 dark:text-green-400 text-4xl mb-3">✓</div>
                  <h4 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">
                    Payment Submitted!
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Your school fees payment is being processed. A confirmation will be sent to your phone.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-prieska-terracotta text-white px-6 py-2 rounded-lg text-sm font-medium"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-2">
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      🏫 Paying fees to: {school.name}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Learner's Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="learnerName"
                        required
                        value={paymentForm.learnerName}
                        onChange={handlePaymentChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                        placeholder="Full name of learner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Grade *
                      </label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          name="grade"
                          required
                          value={paymentForm.grade}
                          onChange={handlePaymentChange}
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-3 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                        >
                          <option value="">Select grade</option>
                          {grades.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Student Number
                      </label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="studentNumber"
                          value={paymentForm.studentNumber}
                          onChange={handlePaymentChange}
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 pr-3 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Amount (R) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">R</span>
                      <input
                        type="number"
                        name="amount"
                        required
                        min="1"
                        value={paymentForm.amount}
                        onChange={handlePaymentChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-8 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                        placeholder="500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Parent/Guardian Name *
                      </label>
                      <input
                        type="text"
                        name="parentName"
                        required
                        value={paymentForm.parentName}
                        onChange={handlePaymentChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="parentPhone"
                        required
                        value={paymentForm.parentPhone}
                        onChange={handlePaymentChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                        placeholder="082 555 1234"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Payment Method
                    </label>
                    <select
                      name="paymentMethod"
                      value={paymentForm.paymentMethod}
                      onChange={handlePaymentChange}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                    >
                      <option value="eft">EFT / Bank Transfer</option>
                      <option value="cash">Cash Deposit</option>
                      <option value="card">Card Payment</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowPayment(false)}
                      className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-prieska-terracotta text-white py-2.5 rounded-lg text-sm font-medium hover:bg-opacity-90 transition"
                    >
                      Submit Payment
                    </button>
                  </div>

                  <p className="text-center text-[10px] text-gray-400 dark:text-gray-500">
                    * This is a demo form. No actual payment will be processed.
                  </p>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SchoolModal