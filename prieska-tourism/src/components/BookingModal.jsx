import { useState, useEffect } from 'react';

const BookingModal = ({ isOpen, onClose, preselectedExperience = null }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', experience: preselectedExperience || '',
    checkIn: '', checkOut: '', guests: 2, timeSlot: '', specialRequests: '',
    cardNumber: '', cardName: '', expiry: '', cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  // Merged baseline system prices covering all experiences and accommodation variants
  const prices = {
    "Karoo Safari - ZAR 1,250": 1250,
    "Orange River Rafting - ZAR 950": 950,
    "San Rock Art Tours - ZAR 600": 600,
    "Wild Animal Hunting - ZAR 2,500": 2500,
    "Prieska Heritage - ZAR 380": 380,
    "Prieska Town - ZAR 250": 250,
    "Riverview Lodge - R850pn": 850,
    "Gariep Country Lodge - R650pn": 650,
    "BoKáro Boutique Guesthouse - R750pn": 750
  };

  const optionsList = Object.keys(prices);

  const experienceTimeSlots = {
    "Karoo Safari - ZAR 1,250": ["07:00 AM (3-4 hrs)", "11:00 AM", "03:00 PM"],
    "Orange River Rafting - ZAR 950": ["07:00 AM (Full Day)", "09:00 AM"],
    "San Rock Art Tours - ZAR 600": ["08:00 AM", "01:00 PM"],
    "Wild Animal Hunting - ZAR 2,500": ["05:00 AM", "02:00 PM"],
    "Prieska Heritage - ZAR 380": ["09:00 AM", "02:00 PM"],
    "Prieska Town - ZAR 250": ["09:00 AM", "01:00 PM"],
    // Accommodations standard check-in slot fallback
    "Riverview Lodge - R850pn": ["14:00 PM (Standard Check-in)"],
    "Gariep Country Lodge - R650pn": ["14:00 PM (Standard Check-in)"],
    "BoKáro Boutique Guesthouse - R750pn": ["14:00 PM (Standard Check-in)"]
  };

  useEffect(() => {
    if (preselectedExperience) {
      // Find matching string variant if partial key string passes through
      const matched = optionsList.find(opt => opt.toLowerCase().includes(preselectedExperience.toLowerCase())) || preselectedExperience;
      setFormData(prev => ({ ...prev, experience: matched }));
    }
  }, [preselectedExperience, isOpen]);

  useEffect(() => {
    if (formData.experience && experienceTimeSlots[formData.experience]) {
      setAvailableTimeSlots(experienceTimeSlots[formData.experience]);
      setFormData(prev => ({ ...prev, timeSlot: experienceTimeSlots[formData.experience][0] }));
    } else {
      setAvailableTimeSlots([]);
    }
  }, [formData.experience]);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setBookingComplete(false);
      setFormData({
        name: '', email: '', phone: '', experience: '', checkIn: '', checkOut: '',
        guests: 2, timeSlot: '', specialRequests: '', cardNumber: '', cardName: '', expiry: '', cvv: ''
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    const basePrice = prices[formData.experience] || 0;
    
    // Calculate days if booking accommodation
    if (formData.experience.includes('pn') && formData.checkIn && formData.checkOut) {
      const days = Math.max(1, Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)));
      return basePrice * days;
    }
    return basePrice * formData.guests;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) return alert("Please fill in all required fields");
      setStep(2);
    } else if (step === 2) {
      if (!formData.experience || !formData.checkIn) return alert("Please select an item and check-in date");
      setStep(3);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!formData.cardNumber || !formData.cardName || !formData.expiry || !formData.cvv) return alert("Please fill in all payment details");
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingComplete(true);
      setTimeout(() => onClose(), 2500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative max-w-[95%] md:max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Section */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8A020]"></span>
              Secure Reservation Hub
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition cursor-pointer">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Form Steps Row */}
        <div className="px-6 py-3 bg-gray-50/50 border-b border-gray-100 flex justify-center gap-8 text-xs font-semibold text-gray-400">
          <span className={step === 1 ? 'text-[#E8A020]' : step > 1 ? 'text-gray-900' : ''}>1. Info</span>
          <span className={step === 2 ? 'text-[#E8A020]' : step > 2 ? 'text-gray-900' : ''}>2. Details</span>
          <span className={step === 3 ? 'text-[#E8A020]' : ''}>3. Payment</span>
        </div>

        {/* Form Fields Canvas */}
        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {bookingComplete ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                ✓
              </div>
              <h3 className="text-base font-bold text-gray-900">Reservation Completed Successfully!</h3>
              <p className="text-xs text-gray-400 mt-1">Check your inbox for booking code details.</p>
            </div>
          ) : step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50/50" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50/50" placeholder="you@domain.com" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Mobile Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50/50" placeholder="+27" />
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Selected Item</label>
                <select name="experience" value={formData.experience} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                  <option value="">Select Option...</option>
                  {optionsList.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Start / Check-in</label>
                  <input type="date" name="checkIn" value={formData.checkIn} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">End / Check-out</label>
                  <input type="date" name="checkOut" value={formData.checkOut} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Party Size</label>
                  <input type="number" min="1" max="10" name="guests" value={formData.guests} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white" />
                </div>
                {availableTimeSlots.length > 0 && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Arrival Window</label>
                    <select name="timeSlot" value={formData.timeSlot} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                      {availableTimeSlots.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Cardholder Name</label>
                <input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Card Number</label>
                <input type="text" name="cardNumber" maxLength="16" value={formData.cardNumber} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" placeholder="4242 4242 4242" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Expiry</label>
                  <input type="text" placeholder="MM/YY" maxLength="5" name="expiry" value={formData.expiry} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Security CVV</label>
                  <input type="password" maxLength="3" placeholder="***" name="cvv" value={formData.cvv} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          {step > 1 && !bookingComplete && (
            <button onClick={() => setStep(step - 1)} className="text-xs font-bold text-gray-500 hover:text-gray-900 cursor-pointer">
              ← Back
            </button>
          )}
          
          {!bookingComplete && (
            <div className="ml-auto flex items-center gap-4">
              {formData.experience && (
                <span className="text-xs font-black text-gray-900">
                  Total: <span className="text-[#E8A020]">ZAR {calculateTotal().toLocaleString()}</span>
                </span>
              )}
              {step < 3 ? (
                <button onClick={handleNextStep} className="bg-gray-900 hover:bg-[#E8A020] text-white font-black text-[10px] tracking-widest uppercase px-6 py-3 rounded-md transition-all cursor-pointer">
                  Next Step →
                </button>
              ) : (
                <button onClick={handlePayment} disabled={isProcessing} className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] tracking-widest uppercase px-6 py-3 rounded-md transition-all cursor-pointer disabled:opacity-40">
                  {isProcessing ? 'Validating...' : 'Confirm Secure Booking'}
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BookingModal;