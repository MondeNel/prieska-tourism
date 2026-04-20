import { useState } from 'react'
import { CreditCard, Lock } from 'lucide-react'

const FakePayment = () => {
  const [processing, setProcessing] = useState(false)
  const [complete, setComplete] = useState(false)

  const handlePayment = (e) => {
    e.preventDefault()
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setComplete(true)
    }, 2000)
  }

  return (
    <div className="py-16 px-4 max-w-md mx-auto">
      <h2 className="text-2xl font-serif font-bold text-center mb-8">Secure Payment (Demo)</h2>
      
      {complete ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-4">This is a demo. No actual money was charged.</p>
          <a href="/" className="text-prieska-terracotta font-medium">Return Home →</a>
        </div>
      ) : (
        <form onSubmit={handlePayment} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 text-gray-500 mb-6">
            <Lock size={16} />
            <span className="text-sm">Payment information is not stored</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <div className="relative">
                <CreditCard size={18} className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="4242 4242 4242 4242" 
                  className="w-full border rounded-lg pl-10 pr-4 py-2"
                  defaultValue="4242 4242 4242 4242"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Expiry</label>
                <input type="text" placeholder="MM/YY" className="w-full border rounded-lg px-4 py-2" defaultValue="12/28" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CVC</label>
                <input type="text" placeholder="123" className="w-full border rounded-lg px-4 py-2" defaultValue="123" />
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={processing}
            className={`w-full mt-6 py-3 rounded-lg font-semibold text-white transition ${
              processing ? 'bg-gray-400' : 'bg-prieska-terracotta hover:bg-opacity-90'
            }`}
          >
            {processing ? 'Processing...' : 'Pay Now (Demo)'}
          </button>
        </form>
      )}
    </div>
  )
}

export default FakePayment