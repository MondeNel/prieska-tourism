import { useState, useEffect } from 'react';

const BookingModal = ({ isOpen, onClose, preselectedExperience = null }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: preselectedExperience || '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    specialRequests: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Update form when preselectedExperience changes
  useEffect(() => {
    if (preselectedExperience) {
      setFormData(prev => ({ ...prev, experience: preselectedExperience }));
    }
  }, [preselectedExperience]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setBookingComplete(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          experience: '',
          checkIn: '',
          checkOut: '',
          guests: 2,
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

  const experiences = [
    "Karoo Safari & Game Drives - ZAR 1,250",
    "Orange River Rafting - ZAR 950",
    "San Rock Art Tours - ZAR 600",
    "Dark Sky Observatory - ZAR 450",
    "Diamond Fields Heritage - ZAR 380",
    "Namaqualand Wildflowers - ZAR 520"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    const prices = {
      "Karoo Safari & Game Drives - ZAR 1,250": 1250,
      "Orange River Rafting - ZAR 950": 950,
      "San Rock Art Tours - ZAR 600": 600,
      "Dark Sky Observatory - ZAR 450": 450,
      "Diamond Fields Heritage - ZAR 380": 380,
      "Namaqualand Wildflowers - ZAR 520": 520
    };
    const basePrice = prices[formData.experience] || 0;
    return basePrice * formData.guests;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        alert("Please fill in all required fields");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.experience || !formData.checkIn) {
        alert("Please select an experience and check-in date");
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
      
      console.log("Booking confirmed:", {
        ...formData,
        total: calculateTotal(),
        bookingReference: "KAROO-" + Math.random().toString(36).substr(2, 8).toUpperCase()
      });
      
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-serif font-bold text-white">Book Your Adventure</h2>
              <p className="text-orange-100 text-sm mt-1">Secure your Karoo experience</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-orange-200 transition"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-6 pt-6">
          <div className="flex justify-between mb-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 relative">
                <div className={`text-center ${s <= step ? 'text-orange-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${
                    s <= step ? 'border-orange-600 bg-orange-50' : 'border-gray-300'
                  }`}>
                    {s < step ? <i className="fas fa-check text-orange-600"></i> : s}
                  </div>
                  <div className="text-xs mt-1 font-medium">
                    {s === 1 ? 'Personal Info' : s === 2 ? 'Booking Details' : 'Payment'}
                  </div>
                </div>
                {s < 3 && (
                  <div className={`absolute top-4 left-1/2 w-full h-0.5 ${
                    s < step ? 'bg-orange-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          {bookingComplete ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check-circle text-green-600 text-4xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Thank you for booking with Karoo Horizons. A confirmation has been sent to your email.
              </p>
              <p className="text-sm text-gray-500">Redirecting to home page...</p>
            </div>
          ) : step === 1 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="john@example.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="+27 123 456 789" required />
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Booking Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Experience *</label>
                <select name="experience" value={formData.experience} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required>
                  <option value="">Choose an experience...</option>
                  {experiences.map((exp, idx) => (<option key={idx} value={exp}>{exp}</option>))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Check-in Date *</label>
                  <input type="date" name="checkIn" value={formData.checkIn} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Check-out Date</label>
                  <input type="date" name="checkOut" value={formData.checkOut} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Guests *</label>
                <select name="guests" value={formData.guests} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  {[1,2,3,4,5,6].map(num => (<option key={num} value={num}>{num} Adult{num !== 1 ? 's' : ''}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Special Requests (Optional)</label>
                <textarea name="specialRequests" value={formData.specialRequests} onChange={handleInputChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="Dietary requirements, accessibility needs, etc." />
              </div>
              {formData.experience && (
                <div className="bg-orange-50 p-4 rounded-lg mt-4">
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Price per person:</span><span className="font-semibold">{formData.experience.split('-')[1]}</span></div>
                  <div className="flex justify-between text-sm mt-2"><span className="text-gray-600">Number of guests:</span><span className="font-semibold">{formData.guests}</span></div>
                  <div className="flex justify-between font-bold text-lg mt-3 pt-2 border-t border-orange-200"><span>Total Amount:</span><span className="text-orange-600">ZAR {calculateTotal().toLocaleString()}</span></div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Payment Information</h3>
              <div className="bg-blue-50 p-4 rounded-lg mb-4"><div className="flex items-center gap-2 text-sm text-blue-800"><i className="fas fa-lock"></i><span>Secure payment powered by Karoo Horizons (Demo Mode)</span></div></div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Number *</label><input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} maxLength="16" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="4242 4242 4242 4242" required /></div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cardholder Name *</label><input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="John Doe" required /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry Date *</label><input type="text" name="expiry" value={formData.expiry} onChange={handleInputChange} maxLength="5" placeholder="MM/YY" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required /></div>
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVV *</label><input type="password" name="cvv" value={formData.cvv} onChange={handleInputChange} maxLength="4" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="123" required /></div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mt-4"><div className="flex justify-between font-bold text-lg"><span>Total to Pay:</span><span className="text-orange-600">ZAR {calculateTotal().toLocaleString()}</span></div></div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          {step > 1 && !bookingComplete && (<button onClick={handlePreviousStep} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">Back</button>)}
          {step < 3 && !bookingComplete && (<button onClick={handleNextStep} className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition ml-auto">Continue</button>)}
          {step === 3 && !bookingComplete && (<button onClick={handlePayment} disabled={isProcessing} className={`px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition ml-auto ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>{isProcessing ? (<><i className="fas fa-spinner fa-spin mr-2"></i>Processing...</>) : (<><i className="fas fa-credit-card mr-2"></i>Pay ZAR {calculateTotal().toLocaleString()}</>)}</button>)}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;