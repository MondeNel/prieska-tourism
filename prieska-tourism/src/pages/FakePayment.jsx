// src/pages/FakePayment.jsx
import { useState } from 'react'
import { CreditCard, Lock, X, CheckCircle } from 'lucide-react'

const FakePayment = ({ isOpen, onClose, onSuccess }) => {
  const [processing, setProcessing] = useState(false)
  const [complete, setComplete] = useState(false)

  if (!isOpen) return null

  const handlePayment = (e) => {
    e.preventDefault()
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setComplete(true)
    }, 2000)
  }

  const handleClose = () => {
    setComplete(false)
    onClose()
    if (complete && onSuccess) {
      onSuccess()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-800 dark:text-white">
              Secure Payment (Demo)
            </h2>
            <button 
              onClick={handleClose}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {complete ? (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Payment Successful!</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mb-6">
                This is a demo. No actual money was charged.
              </p>
              <button
                onClick={handleClose}
                className="bg-prieska-terracotta text-white px-6 py-2.5 rounded-lg font-medium hover:bg-opacity-90 transition w-full"
              >
                Continue
              </button>
            </div>
          ) : (
            <form onSubmit={handlePayment}>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-5">
                <Lock className="w-4 h-4" />
                <span className="text-xs md:text-sm">Payment information is not stored</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 md:w-5 md:h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="4242 4242 4242 4242" 
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-9 md:pl-10 pr-4 py-2.5 text-sm md:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                      defaultValue="4242 4242 4242 4242"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Expiry
                    </label>
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm md:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent" 
                      defaultValue="12/28" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      CVC
                    </label>
                    <input 
                      type="text" 
                      placeholder="123" 
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm md:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent" 
                      defaultValue="123" 
                    />
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={processing}
                className={`w-full mt-6 py-2.5 md:py-3 rounded-lg font-semibold text-white text-sm md:text-base transition ${
                  processing 
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                    : 'bg-prieska-terracotta hover:bg-opacity-90'
                }`}
              >
                {processing ? 'Processing...' : 'Pay Now (Demo)'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default FakePayment