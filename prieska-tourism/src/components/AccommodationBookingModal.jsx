import { useState, useEffect } from 'react';

const AccommodationBookingModal = ({ isOpen, onClose, guesthouse }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    rooms: 1,
    specialRequests: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setBookingComplete(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          checkIn: '',
          checkOut: '',
          adults: 2,
          children: 0,
          rooms: 1,
          specialRequests: '',
          cardNumber: '',
          cardName: '',
          expiry: '',
          cvv: ''
        });
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    // Simulate pricing: base price per room per night
    const pricePerNight = 850; // placeholder – you can adjust based on guesthouse priceRange
    const nights = formData.checkIn && formData.checkOut
      ? Math.max(1, (new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24))
      : 1;
    return pricePerNight * formData.rooms * nights;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        alert("Please fill in all required fields");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.checkIn || !formData.checkOut) {
        alert("Please select check-in and check-out dates");
        return;
      }
      setStep(3);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!formData.cardNumber || !formData.cardName || !formData.expiry || !formData.cvv) {
      alert("Please fill in all payment details");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingComplete(true);
      console.log("Accommodation booking confirmed:", {
        guesthouse: guesthouse?.name,
        ...formData,
        total: calculateTotal(),
        bookingReference: "ACC-" + Math.random().toString(36).substr(2, 8).toUpperCase()
      });
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#2C3E2F] flex items-center gap-2">
                <i className="fas fa-bed text-[#B87333] text-xl"></i>
                Book {guesthouse?.name}
              </h2>
              <p className="text-[#B87333] text-sm mt-1">Secure your room</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-[#B87333] transition-all duration-300 hover:rotate-90"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-6 pt-6 pb-4 bg-gray-50/50">
          <div className="flex justify-between max-w-md mx-auto">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 text-center relative">
                <div className={`relative z-10 w-10 h-10 mx-auto rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  s <= step 
                    ? 'bg-[#B87333] text-white shadow-md shadow-[#B87333]/30' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {s < step ? <i className="fas fa-check"></i> : s}
                </div>
                <div className={`text-xs mt-2 font-medium ${
                  s <= step ? 'text-[#B87333]' : 'text-gray-400'
                }`}>
                  {s === 1 ? 'Guest Info' : s === 2 ? 'Room Details' : 'Payment'}
                </div>
                {s < 3 && (
                  <div className={`absolute top-5 left-1/2 w-full h-0.5 -translate-y-1/2 ${
                    s < step ? 'bg-[#B87333]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 max-h-[55vh] overflow-y-auto custom-scrollbar">
          {bookingComplete ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check-circle text-green-600 text-5xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#2C3E2F] mb-3">Booking Confirmed!</h3>
              <div className="w-16 h-0.5 bg-[#B87333] mx-auto mb-4"></div>
              <p className="text-gray-600 mb-2">Thank you for choosing {guesthouse?.name}.</p>
              <p className="text-sm text-[#B87333] font-medium">A confirmation email has been sent to your inbox.</p>
            </div>
          ) : step === 1 ? (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-[#B87333]"></div>
                <h3 className="text-lg font-semibold text-[#2C3E2F]">Guest Information</h3>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-[#B87333] to-transparent"></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-user text-[#B87333] mr-2 text-xs"></i>Full Name *
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 outline-none bg-white" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-envelope text-[#B87333] mr-2 text-xs"></i>Email Address *
                </label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 outline-none bg-white" placeholder="john@example.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-phone-alt text-[#B87333] mr-2 text-xs"></i>Phone Number *
                </label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 outline-none bg-white" placeholder="+27 123 456 789" required />
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-[#B87333]"></div>
                <h3 className="text-lg font-semibold text-[#2C3E2F]">Room Details</h3>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-[#B87333] to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-calendar-alt text-[#B87333] mr-2 text-xs"></i>Check-in *
                  </label>
                  <input type="date" name="checkIn" value={formData.checkIn} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-calendar-check text-[#B87333] mr-2 text-xs"></i>Check-out *
                  </label>
                  <input type="date" name="checkOut" value={formData.checkOut} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] outline-none" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-user-friends text-[#B87333] mr-2 text-xs"></i>Adults (18+) *
                </label>
                <select name="adults" value={formData.adults} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] outline-none">
                  {[1,2,3,4,5,6].map(num => <option key={num} value={num}>{num}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-child text-[#B87333] mr-2 text-xs"></i>Children (0-17)
                </label>
                <select name="children" value={formData.children} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] outline-none">
                  {[0,1,2,3,4,5].map(num => <option key={num} value={num}>{num}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-door-open text-[#B87333] mr-2 text-xs"></i>Number of Rooms *
                </label>
                <select name="rooms" value={formData.rooms} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] outline-none">
                  {[1,2,3,4,5].map(num => <option key={num} value={num}>{num}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-comment-dots text-[#B87333] mr-2 text-xs"></i>Special Requests
                </label>
                <textarea name="specialRequests" value={formData.specialRequests} onChange={handleInputChange} rows="3" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] outline-none" placeholder="Any special requests? (e.g., extra bed, dietary needs)"></textarea>
              </div>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                <div className="flex justify-between text-sm mb-2">
                  <span>Price per room / night:</span>
                  <span className="font-semibold">ZAR 850</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Number of rooms:</span>
                  <span>{formData.rooms}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-amber-200">
                  <span>Total:</span>
                  <span className="text-[#B87333]">ZAR {calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-[#B87333]"></div>
                <h3 className="text-lg font-semibold text-[#2C3E2F]">Payment Information</h3>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-[#B87333] to-transparent"></div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 flex items-center gap-3">
                <i className="fas fa-lock text-blue-600 text-xl"></i>
                <div><p className="text-sm font-semibold text-blue-800">Secure Payment</p><p className="text-xs text-blue-600">Demo Mode - No real charges</p></div>
              </div>
              <div><label className="block text-sm font-medium mb-2">Card Number *</label><input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} maxLength="16" className="w-full px-4 py-3 border-2 rounded-xl focus:border-[#B87333] outline-none" placeholder="4242 4242 4242 4242" required /></div>
              <div><label className="block text-sm font-medium mb-2">Cardholder Name *</label><input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange} className="w-full px-4 py-3 border-2 rounded-xl focus:border-[#B87333] outline-none" placeholder="John Doe" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-2">Expiry Date *</label><input type="text" name="expiry" value={formData.expiry} onChange={handleInputChange} maxLength="5" placeholder="MM/YY" className="w-full px-4 py-3 border-2 rounded-xl focus:border-[#B87333] outline-none" required /></div>
                <div><label className="block text-sm font-medium mb-2">CVV *</label><input type="password" name="cvv" value={formData.cvv} onChange={handleInputChange} maxLength="4" className="w-full px-4 py-3 border-2 rounded-xl focus:border-[#B87333] outline-none" placeholder="123" required /></div>
              </div>
              <div className="bg-gray-50 p-5 rounded-xl"><div className="flex justify-between items-center"><span className="font-medium">Total to pay:</span><span className="text-2xl font-bold text-[#B87333]">ZAR {calculateTotal().toLocaleString()}</span></div></div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-5 bg-gray-50 border-t border-gray-200 flex justify-between">
          {step > 1 && !bookingComplete && (
            <button onClick={handlePreviousStep} className="px-6 py-2.5 border-2 border-gray-300 rounded-xl text-gray-700 hover:border-[#B87333] hover:text-[#B87333] transition flex items-center gap-2"><i className="fas fa-arrow-left"></i>Back</button>
          )}
          {step < 3 && !bookingComplete && (
            <button onClick={handleNextStep} className="px-8 py-2.5 bg-[#B87333] text-white rounded-xl hover:bg-[#B87333]/80 transition font-semibold flex items-center gap-2 shadow-md ml-auto">Continue<i className="fas fa-arrow-right"></i></button>
          )}
          {step === 3 && !bookingComplete && (
            <button onClick={handlePayment} disabled={isProcessing} className={`px-8 py-2.5 bg-green-600 text-white rounded-xl font-semibold flex items-center gap-2 ml-auto ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}>
              {isProcessing ? <><i className="fas fa-spinner fa-spin"></i>Processing...</> : <><i className="fas fa-check-circle"></i>Confirm Payment</>}
            </button>
          )}
        </div>
      </div>
      <style jsx>{`.custom-scrollbar::-webkit-scrollbar{width:6px}.custom-scrollbar::-webkit-scrollbar-track{background:#f1f1f1;border-radius:10px}.custom-scrollbar::-webkit-scrollbar-thumb{background:#B87333;border-radius:10px}`}</style>
    </div>
  );
};

export default AccommodationBookingModal;