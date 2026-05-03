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

  useEffect(() => {
    if (preselectedExperience) {
      setFormData(prev => ({ ...prev, experience: preselectedExperience }));
    }
  }, [preselectedExperience]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative max-w-2xl w-full bg-gradient-to-br from-white via-white to-amber-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100">
        
        {/* Decorative Gold Border Top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400"></div>
        
        {/* Header with Gold Accent */}
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-5">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <i className="fas fa-tree text-6xl text-amber-400 absolute top-4 right-4"></i>
          </div>
          <div className="flex justify-between items-center relative z-10">
            <div>
              <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                <i className="fas fa-crown text-amber-400 text-xl"></i>
                Book Your Adventure
              </h2>
              <p className="text-amber-400/80 text-sm mt-1 flex items-center gap-1">
                <i className="fas fa-star text-xs"></i>
                Secure your Karoo experience
                <i className="fas fa-star text-xs"></i>
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-amber-400 transition-all duration-300 hover:rotate-90"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Progress Steps with Gold Theme */}
        <div className="px-6 pt-8 pb-4 bg-gradient-to-b from-amber-50/30 to-transparent dark:from-gray-800/30">
          <div className="flex justify-between max-w-md mx-auto">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 text-center relative">
                <div className={`relative z-10 w-10 h-10 mx-auto rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  s <= step 
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-500/30' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {s < step ? <i className="fas fa-check"></i> : s}
                </div>
                <div className={`text-xs mt-2 font-medium ${
                  s <= step ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400'
                }`}>
                  {s === 1 ? 'Personal Info' : s === 2 ? 'Booking Details' : 'Payment'}
                </div>
                {s < 3 && (
                  <div className={`absolute top-5 left-1/2 w-full h-0.5 -translate-y-1/2 ${
                    s < step ? 'bg-gradient-to-r from-amber-400 to-yellow-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Area with Modern Styling */}
        <div className="px-6 py-6 max-h-[55vh] overflow-y-auto custom-scrollbar">
          {bookingComplete ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                <i className="fas fa-check-circle text-white text-5xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Booking Confirmed!</h3>
              <div className="w-16 h-0.5 bg-amber-400 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Thank you for choosing Karoo Horizons.
              </p>
              <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                A confirmation email has been sent to your inbox.
              </p>
              <div className="mt-6 flex justify-center gap-1 text-amber-400">
                <i className="fas fa-star text-xs"></i>
                <i className="fas fa-star text-xs"></i>
                <i className="fas fa-star text-xs"></i>
                <i className="fas fa-star text-xs"></i>
                <i className="fas fa-star text-xs"></i>
              </div>
            </div>
          ) : step === 1 ? (
            <div className="space-y-5 animate-slide-in">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-amber-400"></div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Personal Information</h3>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"></div>
              </div>
              
              {/* Name Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i className="fas fa-user text-amber-500 mr-2 text-xs"></i>
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 outline-none bg-white dark:bg-gray-800 dark:border-gray-700"
                    placeholder="John Doe"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-400">
                    <i className="fas fa-pen-alt text-xs"></i>
                  </div>
                </div>
              </div>
              
              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i className="fas fa-envelope text-amber-500 mr-2 text-xs"></i>
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 outline-none bg-white dark:bg-gray-800 dark:border-gray-700"
                    placeholder="john@example.com"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <i className="fas fa-envelope text-xs"></i>
                  </div>
                </div>
              </div>
              
              {/* Phone Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i className="fas fa-phone-alt text-amber-500 mr-2 text-xs"></i>
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 outline-none bg-white dark:bg-gray-800 dark:border-gray-700"
                    placeholder="+27 123 456 789"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <i className="fas fa-phone-alt text-xs"></i>
                  </div>
                </div>
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-5 animate-slide-in">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-amber-400"></div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Booking Details</h3>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"></div>
              </div>
              
              {/* Experience Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i className="fas fa-compass text-amber-500 mr-2 text-xs"></i>
                  Select Experience *
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 outline-none bg-white dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                  required
                >
                  <option value="">Choose an experience...</option>
                  {experiences.map((exp, idx) => (
                    <option key={idx} value={exp}>{exp}</option>
                  ))}
                </select>
              </div>
              
              {/* Date Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <i className="fas fa-calendar-alt text-amber-500 mr-2 text-xs"></i>
                    Check-in Date *
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 outline-none bg-white dark:bg-gray-800 dark:border-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <i className="fas fa-calendar-check text-amber-500 mr-2 text-xs"></i>
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 outline-none bg-white dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
              </div>
              
              {/* Guests Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i className="fas fa-users text-amber-500 mr-2 text-xs"></i>
                  Number of Guests *
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 outline-none bg-white dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Adult{num !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              {/* Special Requests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i className="fas fa-comment-dots text-amber-500 mr-2 text-xs"></i>
                  Special Requests
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 outline-none bg-white dark:bg-gray-800 dark:border-gray-700 resize-none"
                  placeholder="Dietary requirements, accessibility needs, etc."
                />
              </div>
              
              {/* Price Summary Card */}
              {formData.experience && (
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-800 p-5 rounded-xl border border-amber-200 dark:border-amber-800 mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <i className="fas fa-receipt text-amber-600"></i>
                    <span className="font-semibold text-gray-800 dark:text-white">Price Summary</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Price per person:</span>
                      <span className="font-semibold text-gray-800 dark:text-white">{formData.experience.split('-')[1]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Number of guests:</span>
                      <span className="font-semibold text-gray-800 dark:text-white">{formData.guests}</span>
                    </div>
                    <div className="border-t border-amber-200 dark:border-amber-800 pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span className="text-gray-800 dark:text-white">Total Amount:</span>
                        <span className="text-amber-600 dark:text-amber-400 text-lg">ZAR {calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-5 animate-slide-in">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-amber-400"></div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Payment Information</h3>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"></div>
              </div>
              
              {/* Secure Payment Badge */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-lock text-blue-600 text-lg"></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Secure Payment</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Demo Mode - No real charges will be made</p>
                  </div>
                </div>
              </div>
              
              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i className="fas fa-credit-card text-amber-500 mr-2 text-xs"></i>
                  Card Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength="16"
                    className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 outline-none bg-white dark:bg-gray-800 dark:border-gray-700"
                    placeholder="4242 4242 4242 4242"
                    required
                  />
                  <i className="fas fa-credit-card absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                </div>
              </div>
              
              {/* Cardholder Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i className="fas fa-user-circle text-amber-500 mr-2 text-xs"></i>
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 outline-none bg-white dark:bg-gray-800 dark:border-gray-700"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <i className="fas fa-calendar-week text-amber-500 mr-2 text-xs"></i>
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    maxLength="5"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 outline-none bg-white dark:bg-gray-800 dark:border-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <i className="fas fa-shield-alt text-amber-500 mr-2 text-xs"></i>
                    CVV *
                  </label>
                  <input
                    type="password"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 outline-none bg-white dark:bg-gray-800 dark:border-gray-700"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              
              {/* Total Amount */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-800 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Total to Pay:</span>
                  <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">ZAR {calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons with Gold Theme */}
        <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-amber-50/30 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          {step > 1 && !bookingComplete && (
            <button
              onClick={handlePreviousStep}
              className="px-6 py-2.5 border-2 border-gray-300 rounded-xl text-gray-700 hover:border-amber-400 hover:text-amber-600 transition-all duration-300 font-medium flex items-center gap-2"
            >
              <i className="fas fa-arrow-left"></i>
              Back
            </button>
          )}
          {step < 3 && !bookingComplete && (
            <button
              onClick={handleNextStep}
              className="px-8 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 font-semibold flex items-center gap-2 shadow-lg shadow-amber-500/30 ml-auto"
            >
              Continue
              <i className="fas fa-arrow-right"></i>
            </button>
          )}
          {step === 3 && !bookingComplete && (
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`px-8 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-green-500/30 transition-all duration-300 ml-auto ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-600 hover:to-emerald-700'
              }`}
            >
              {isProcessing ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-check-circle"></i>
                  Confirm Payment
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f59e0b;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d97706;
        }
      `}</style>
    </div>
  );
};

export default BookingModal;