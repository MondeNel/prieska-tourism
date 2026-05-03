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
    "Karoo Safari - ZAR 1,250",
    "Orange River Rafting - ZAR 950",
    "San Rock Art Tours - ZAR 600",
    "Wild Animal Hunting - ZAR 2,500",
    "Prieska Heritage - ZAR 380",
    "Prieska Town - ZAR 250"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    const prices = {
      "Karoo Safari - ZAR 1,250": 1250,
      "Orange River Rafting - ZAR 950": 950,
      "San Rock Art Tours - ZAR 600": 600,
      "Wild Animal Hunting - ZAR 2,500": 2500,
      "Prieska Heritage - ZAR 380": 380,
      "Prieska Town - ZAR 250": 250
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
      <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Light Header with Gold Accent */}
        <div className="bg-white border-b border-gray-200 px-6 py-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#2C3E2F] flex items-center gap-2">
                <i className="fas fa-crown text-[#B87333] text-xl"></i>
                Book Your Adventure
              </h2>
              <p className="text-[#B87333] text-sm mt-1 flex items-center gap-1">
                <i className="fas fa-star text-xs"></i>
                Secure your Karoo experience
                <i className="fas fa-star text-xs"></i>
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-[#B87333] transition-all duration-300 hover:rotate-90"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Progress Steps with Gold Theme */}
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
                  {s === 1 ? 'Personal Info' : s === 2 ? 'Booking Details' : 'Payment'}
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

        {/* Content Area - Light theme */}
        <div className="px-6 py-6 max-h-[55vh] overflow-y-auto custom-scrollbar">
          {bookingComplete ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check-circle text-green-600 text-5xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#2C3E2F] mb-3">Booking Confirmed!</h3>
              <div className="w-16 h-0.5 bg-[#B87333] mx-auto mb-4"></div>
              <p className="text-gray-600 mb-2">
                Thank you for choosing Karoo Horizons.
              </p>
              <p className="text-sm text-[#B87333] font-medium">
                A confirmation email has been sent to your inbox.
              </p>
              <div className="mt-6 flex justify-center gap-1 text-[#B87333]">
                <i className="fas fa-star text-xs"></i>
                <i className="fas fa-star text-xs"></i>
                <i className="fas fa-star text-xs"></i>
                <i className="fas fa-star text-xs"></i>
                <i className="fas fa-star text-xs"></i>
              </div>
            </div>
          ) : step === 1 ? (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-[#B87333]"></div>
                <h3 className="text-lg font-semibold text-[#2C3E2F]">Personal Information</h3>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-[#B87333] to-transparent"></div>
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-user text-[#B87333] mr-2 text-xs"></i>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 transition-all duration-300 outline-none bg-white"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-envelope text-[#B87333] mr-2 text-xs"></i>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 transition-all duration-300 outline-none bg-white"
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-phone-alt text-[#B87333] mr-2 text-xs"></i>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 transition-all duration-300 outline-none bg-white"
                  placeholder="+27 123 456 789"
                  required
                />
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-[#B87333]"></div>
                <h3 className="text-lg font-semibold text-[#2C3E2F]">Booking Details</h3>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-[#B87333] to-transparent"></div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-compass text-[#B87333] mr-2 text-xs"></i>
                  Select Experience *
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 transition-all duration-300 outline-none bg-white cursor-pointer"
                  required
                >
                  <option value="">Choose an experience...</option>
                  {experiences.map((exp, idx) => (
                    <option key={idx} value={exp}>{exp}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-calendar-alt text-[#B87333] mr-2 text-xs"></i>
                    Check-in Date *
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 transition-all duration-300 outline-none bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-calendar-check text-[#B87333] mr-2 text-xs"></i>
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 transition-all duration-300 outline-none bg-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-users text-[#B87333] mr-2 text-xs"></i>
                  Number of Guests *
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 transition-all duration-300 outline-none bg-white cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Adult{num !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-comment-dots text-[#B87333] mr-2 text-xs"></i>
                  Special Requests
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 transition-all duration-300 outline-none bg-white resize-none"
                  placeholder="Dietary requirements, accessibility needs, etc."
                />
              </div>
              
              {formData.experience && (
                <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <i className="fas fa-receipt text-[#B87333]"></i>
                    <span className="font-semibold text-[#2C3E2F]">Price Summary</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per person:</span>
                      <span className="font-semibold text-gray-800">{formData.experience.split('-')[1]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Number of guests:</span>
                      <span className="font-semibold text-gray-800">{formData.guests}</span>
                    </div>
                    <div className="border-t border-amber-200 pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span className="text-gray-800">Total Amount:</span>
                        <span className="text-[#B87333] text-lg">ZAR {calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-[#B87333]"></div>
                <h3 className="text-lg font-semibold text-[#2C3E2F]">Payment Information</h3>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-[#B87333] to-transparent"></div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-lock text-blue-600 text-lg"></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-800">Secure Payment</p>
                    <p className="text-xs text-blue-600">Demo Mode - No real charges will be made</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-credit-card text-[#B87333] mr-2 text-xs"></i>
                  Card Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength="16"
                    className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 transition-all duration-300 outline-none bg-white"
                    placeholder="4242 4242 4242 4242"
                    required
                  />
                  <i className="fas fa-credit-card absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-user-circle text-[#B87333] mr-2 text-xs"></i>
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 transition-all duration-300 outline-none bg-white"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-calendar-week text-[#B87333] mr-2 text-xs"></i>
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    maxLength="5"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 transition-all duration-300 outline-none bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-shield-alt text-[#B87333] mr-2 text-xs"></i>
                    CVV *
                  </label>
                  <input
                    type="password"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 transition-all duration-300 outline-none bg-white"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total to Pay:</span>
                  <span className="text-2xl font-bold text-[#B87333]">ZAR {calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons - Light theme */}
        <div className="px-6 py-5 bg-gray-50 border-t border-gray-200 flex justify-between">
          {step > 1 && !bookingComplete && (
            <button
              onClick={handlePreviousStep}
              className="px-6 py-2.5 border-2 border-gray-300 rounded-xl text-gray-700 hover:border-[#B87333] hover:text-[#B87333] transition-all duration-300 font-medium flex items-center gap-2"
            >
              <i className="fas fa-arrow-left"></i>
              Back
            </button>
          )}
          {step < 3 && !bookingComplete && (
            <button
              onClick={handleNextStep}
              className="px-8 py-2.5 bg-[#B87333] text-white rounded-xl hover:bg-[#B87333]/80 transition-all duration-300 font-semibold flex items-center gap-2 shadow-md ml-auto"
            >
              Continue
              <i className="fas fa-arrow-right"></i>
            </button>
          )}
          {step === 3 && !bookingComplete && (
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`px-8 py-2.5 bg-green-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-md transition-all duration-300 ml-auto ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
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
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #B87333;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9e5e2a;
        }
      `}</style>
    </div>
  );
};

export default BookingModal;