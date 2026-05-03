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
    timeSlot: '',
    specialRequests: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const experienceTimeSlots = {
    "Karoo Safari - ZAR 1,250": [
      "07:00 AM (3-4 hrs)", "08:00 AM (3-4 hrs)", "09:00 AM (3-4 hrs)",
      "10:00 AM (3-4 hrs)", "11:00 AM (3-4 hrs)", "12:00 PM (3-4 hrs)",
      "01:00 PM (3-4 hrs)", "02:00 PM (3-4 hrs)", "03:00 PM (3-4 hrs)"
    ],
    "Orange River Rafting - ZAR 950": [
      "07:00 AM (1-2 hrs)", "08:00 AM (1-2 hrs)", "09:00 AM (1-2 hrs)",
      "10:00 AM (1-2 hrs)", "11:00 AM (1-2 hrs)", "12:00 PM (1-2 hrs)",
      "01:00 PM (1-2 hrs)", "02:00 PM (1-2 hrs)", "03:00 PM (1-2 hrs)"
    ],
    "San Rock Art Tours - ZAR 600": [
      "07:00 AM (2-4 hrs)", "08:00 AM (2-4 hrs)", "09:00 AM (2-4 hrs)",
      "10:00 AM (2-4 hrs)", "11:00 AM (2-4 hrs)", "12:00 PM (2-4 hrs)",
      "01:00 PM (2-4 hrs)", "02:00 PM (2-4 hrs)", "03:00 PM (2-4 hrs)"
    ],
    "Wild Animal Hunting - ZAR 2,500": [
      "05:00 AM (3-5 hrs)", "06:00 AM (3-5 hrs)", "07:00 AM (3-5 hrs)",
      "08:00 AM (3-5 hrs)", "09:00 AM (3-5 hrs)", "10:00 AM (3-5 hrs)",
      "02:00 PM (3-5 hrs)", "03:00 PM (3-5 hrs)", "04:00 PM (3-5 hrs)"
    ],
    "Prieska Heritage - ZAR 380": [
      "05:00 AM (2-4 hrs)", "06:00 AM (2-4 hrs)", "07:00 AM (2-4 hrs)",
      "08:00 AM (2-4 hrs)", "09:00 AM (2-4 hrs)", "10:00 AM (2-4 hrs)",
      "02:00 PM (2-4 hrs)", "03:00 PM (2-4 hrs)", "04:00 PM (2-4 hrs)"
    ],
    "Prieska Town - ZAR 250": [
      "09:00 AM (1-2 hrs)", "10:00 AM (1-2 hrs)", "11:00 AM (1-2 hrs)",
      "12:00 PM (1-2 hrs)", "01:00 PM (1-2 hrs)", "02:00 PM (1-2 hrs)",
      "03:00 PM (1-2 hrs)", "04:00 PM (1-2 hrs)"
    ]
  };

  useEffect(() => {
    if (preselectedExperience) {
      setFormData(prev => ({ ...prev, experience: preselectedExperience }));
    }
  }, [preselectedExperience]);

  useEffect(() => {
    if (formData.experience && experienceTimeSlots[formData.experience]) {
      setAvailableTimeSlots(experienceTimeSlots[formData.experience]);
      if (!availableTimeSlots.includes(formData.timeSlot)) {
        setFormData(prev => ({ ...prev, timeSlot: '' }));
      }
    } else {
      setAvailableTimeSlots([]);
    }
  }, [formData.experience]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setBookingComplete(false);
        setFormData({
          name: '', email: '', phone: '', experience: '', checkIn: '', checkOut: '',
          guests: 2, timeSlot: '', specialRequests: '', cardNumber: '', cardName: '',
          expiry: '', cvv: ''
        });
        setAvailableTimeSlots([]);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const experiences = [
    "Karoo Safari - ZAR 1,250", "Orange River Rafting - ZAR 950",
    "San Rock Art Tours - ZAR 600", "Wild Animal Hunting - ZAR 2,500",
    "Prieska Heritage - ZAR 380", "Prieska Town - ZAR 250"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    const prices = {
      "Karoo Safari - ZAR 1,250": 1250, "Orange River Rafting - ZAR 950": 950,
      "San Rock Art Tours - ZAR 600": 600, "Wild Animal Hunting - ZAR 2,500": 2500,
      "Prieska Heritage - ZAR 380": 380, "Prieska Town - ZAR 250": 250
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
      if (!formData.timeSlot) {
        alert("Please select a time slot");
        return;
      }
      setStep(3);
    }
  };

  const handlePreviousStep = () => setStep(step - 1);

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
      setTimeout(() => onClose(), 3000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-[95%] md:max-w-2xl w-full bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#2C3E2F] flex items-center gap-2">
                <i className="fas fa-crown text-[#B87333] text-lg md:text-xl"></i>
                Book Your Adventure
              </h2>
              <p className="text-[#B87333] text-xs md:text-sm mt-1 flex items-center gap-1">
                <i className="fas fa-star text-[10px]"></i> Secure your Karoo experience <i className="fas fa-star text-[10px]"></i>
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-[#B87333] transition">
              <i className="fas fa-times text-xl md:text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-4 md:px-6 pt-4 md:pt-6 pb-3 md:pb-4 bg-gray-50/50">
          <div className="flex justify-between max-w-md mx-auto">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 text-center relative">
                <div className={`relative z-10 w-8 h-8 md:w-10 md:h-10 mx-auto rounded-full flex items-center justify-center font-semibold text-xs md:text-sm transition-all duration-300 ${
                  s <= step ? 'bg-[#B87333] text-white shadow-md shadow-[#B87333]/30' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s < step ? <i className="fas fa-check text-xs md:text-sm"></i> : s}
                </div>
                <div className={`text-[10px] md:text-xs mt-1 md:mt-2 font-medium ${s <= step ? 'text-[#B87333]' : 'text-gray-400'}`}>
                  {s === 1 ? 'Personal Info' : s === 2 ? 'Booking Details' : 'Payment'}
                </div>
                {s < 3 && (
                  <div className={`absolute top-4 md:top-5 left-1/2 w-full h-0.5 -translate-y-1/2 ${s < step ? 'bg-[#B87333]' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="px-4 md:px-6 py-4 md:py-6 max-h-[60vh] md:max-h-[55vh] overflow-y-auto custom-scrollbar">
          {bookingComplete ? (
            <div className="text-center py-8 md:py-12">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <i className="fas fa-check-circle text-green-600 text-3xl md:text-5xl"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#2C3E2F] mb-2 md:mb-3">Booking Confirmed!</h3>
              <div className="w-12 h-0.5 bg-[#B87333] mx-auto mb-3 md:mb-4"></div>
              <p className="text-gray-600 text-sm md:text-base mb-2">Thank you for choosing Karoo Horizons.</p>
              <p className="text-xs md:text-sm text-[#B87333] font-medium">A confirmation email has been sent.</p>
              <div className="mt-4 md:mt-6 flex justify-center gap-1 text-[#B87333]">
                {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star text-[10px] md:text-xs"></i>)}
              </div>
            </div>
          ) : step === 1 ? (
            <div className="space-y-4 md:space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-0.5 bg-[#B87333]"></div>
                <h3 className="text-base md:text-lg font-semibold text-[#2C3E2F]">Personal Information</h3>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-[#B87333] to-transparent"></div>
              </div>
              <div className="group">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  <i className="fas fa-user text-[#B87333] mr-1 text-xs"></i>Full Name *
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 outline-none bg-white text-sm md:text-base"
                  placeholder="John Doe" required />
              </div>
              <div className="group">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  <i className="fas fa-envelope text-[#B87333] mr-1 text-xs"></i>Email Address *
                </label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 outline-none bg-white text-sm md:text-base"
                  placeholder="john@example.com" required />
              </div>
              <div className="group">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  <i className="fas fa-phone-alt text-[#B87333] mr-1 text-xs"></i>Phone Number *
                </label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-[#B87333] focus:ring-4 focus:ring-[#B87333]/20 outline-none bg-white text-sm md:text-base"
                  placeholder="+27 123 456 789" required />
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-4 md:space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-0.5 bg-[#B87333]"></div>
                <h3 className="text-base md:text-lg font-semibold text-[#2C3E2F]">Booking Details</h3>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-[#B87333] to-transparent"></div>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  <i className="fas fa-compass text-[#B87333] mr-1 text-xs"></i>Select Experience *
                </label>
                <select name="experience" value={formData.experience} onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-[#B87333] outline-none bg-white text-sm md:text-base">
                  <option value="">Choose an experience...</option>
                  {experiences.map((exp, idx) => <option key={idx} value={exp}>{exp}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    <i className="fas fa-calendar-alt text-[#B87333] mr-1 text-xs"></i>Check-in *
                  </label>
                  <input type="date" name="checkIn" value={formData.checkIn} onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-[#B87333] outline-none text-sm md:text-base" required />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    <i className="fas fa-calendar-check text-[#B87333] mr-1 text-xs"></i>Check-out
                  </label>
                  <input type="date" name="checkOut" value={formData.checkOut} onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-[#B87333] outline-none text-sm md:text-base" />
                </div>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  <i className="fas fa-users text-[#B87333] mr-1 text-xs"></i>Number of Guests *
                </label>
                <select name="guests" value={formData.guests} onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-[#B87333] outline-none text-sm md:text-base">
                  {[1,2,3,4,5,6].map(num => <option key={num} value={num}>{num} Adult{num !== 1 ? 's' : ''}</option>)}
                </select>
              </div>
              {formData.experience && availableTimeSlots.length > 0 && (
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    <i className="fas fa-clock text-[#B87333] mr-1 text-xs"></i>Preferred Time Slot *
                  </label>
                  <select name="timeSlot" value={formData.timeSlot} onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-[#B87333] outline-none bg-white text-sm md:text-base">
                    <option value="">Select a time slot</option>
                    {availableTimeSlots.map((slot, idx) => <option key={idx} value={slot}>{slot}</option>)}
                  </select>
                  <p className="text-[10px] text-gray-400 mt-1">Duration varies by activity</p>
                </div>
              )}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  <i className="fas fa-comment-dots text-[#B87333] mr-1 text-xs"></i>Special Requests
                </label>
                <textarea name="specialRequests" value={formData.specialRequests} onChange={handleInputChange}
                  rows="2" className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-[#B87333] outline-none resize-none text-sm"
                  placeholder="Dietary requirements, accessibility needs, etc." />
              </div>
              {formData.experience && (
                <div className="bg-amber-50 p-3 md:p-5 rounded-lg md:rounded-xl border border-amber-200 mt-2 md:mt-4">
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <i className="fas fa-receipt text-[#B87333] text-sm md:text-base"></i>
                    <span className="font-semibold text-[#2C3E2F] text-sm md:text-base">Price Summary</span>
                  </div>
                  <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                    <div className="flex justify-between"><span className="text-gray-600">Price per person:</span><span className="font-semibold">{formData.experience.split('-')[1]}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Number of guests:</span><span className="font-semibold">{formData.guests}</span></div>
                    <div className="border-t border-amber-200 pt-1 md:pt-2 mt-1 md:mt-2">
                      <div className="flex justify-between font-bold"><span>Total Amount:</span><span className="text-[#B87333] text-sm md:text-lg">ZAR {calculateTotal().toLocaleString()}</span></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 md:space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-0.5 bg-[#B87333]"></div>
                <h3 className="text-base md:text-lg font-semibold text-[#2C3E2F]">Payment Information</h3>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-[#B87333] to-transparent"></div>
              </div>
              <div className="bg-blue-50 p-3 md:p-4 rounded-lg md:rounded-xl border border-blue-200 flex items-center gap-2 md:gap-3">
                <i className="fas fa-lock text-blue-600 text-base md:text-xl"></i>
                <div><p className="text-xs md:text-sm font-semibold text-blue-800">Secure Payment</p><p className="text-[10px] md:text-xs text-blue-600">Demo Mode - No real charges</p></div>
              </div>
              <div><label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Card Number *</label>
                <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} maxLength="16"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border-2 rounded-lg md:rounded-xl focus:border-[#B87333] outline-none text-sm md:text-base" placeholder="4242 4242 4242 4242" required />
              </div>
              <div><label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Cardholder Name *</label>
                <input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border-2 rounded-lg md:rounded-xl focus:border-[#B87333] outline-none text-sm md:text-base" placeholder="John Doe" required />
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div><label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Expiry Date *</label>
                  <input type="text" name="expiry" value={formData.expiry} onChange={handleInputChange} maxLength="5" placeholder="MM/YY"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border-2 rounded-lg md:rounded-xl focus:border-[#B87333] outline-none text-sm md:text-base" required />
                </div>
                <div><label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">CVV *</label>
                  <input type="password" name="cvv" value={formData.cvv} onChange={handleInputChange} maxLength="4"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border-2 rounded-lg md:rounded-xl focus:border-[#B87333] outline-none text-sm md:text-base" placeholder="123" required />
                </div>
              </div>
              <div className="bg-gray-50 p-3 md:p-5 rounded-lg md:rounded-xl">
                <div className="flex justify-between items-center"><span className="font-medium text-sm md:text-base">Total to pay:</span><span className="text-xl md:text-2xl font-bold text-[#B87333]">ZAR {calculateTotal().toLocaleString()}</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="px-4 md:px-6 py-3 md:py-5 bg-gray-50 border-t border-gray-200 flex justify-between">
          {step > 1 && !bookingComplete && (
            <button onClick={handlePreviousStep}
              className="px-3 md:px-6 py-1.5 md:py-2.5 border-2 border-gray-300 rounded-lg md:rounded-xl text-gray-700 hover:border-[#B87333] hover:text-[#B87333] transition text-sm md:text-base flex items-center gap-1 md:gap-2">
              <i className="fas fa-arrow-left text-xs md:text-sm"></i>Back
            </button>
          )}
          {step < 3 && !bookingComplete && (
            <button onClick={handleNextStep}
              className="px-4 md:px-8 py-1.5 md:py-2.5 bg-[#B87333] text-white rounded-lg md:rounded-xl hover:bg-[#B87333]/80 transition font-semibold flex items-center gap-1 md:gap-2 shadow-md ml-auto text-sm md:text-base">
              Continue<i className="fas fa-arrow-right text-xs md:text-sm"></i>
            </button>
          )}
          {step === 3 && !bookingComplete && (
            <button onClick={handlePayment} disabled={isProcessing}
              className={`px-4 md:px-8 py-1.5 md:py-2.5 bg-green-600 text-white rounded-lg md:rounded-xl font-semibold flex items-center gap-1 md:gap-2 ml-auto text-sm md:text-base ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
              }`}>
              {isProcessing ? <><i className="fas fa-spinner fa-spin"></i>Processing...</> : <><i className="fas fa-check-circle"></i>Confirm Payment</>}
            </button>
          )}
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar{width:4px}
        .custom-scrollbar::-webkit-scrollbar-track{background:#f1f1f1;border-radius:10px}
        .custom-scrollbar::-webkit-scrollbar-thumb{background:#B87333;border-radius:10px}
      `}</style>
    </div>
  );
};

export default BookingModal;