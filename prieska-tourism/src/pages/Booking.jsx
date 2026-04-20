// src/pages/Booking.jsx
import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import SectionTitle from '../components/ui/SectionTitle'
import { Clock, Users, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import FakePayment from './FakePayment'

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'
]

const Booking = () => {
  const [date, setDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState(null)
  const [guests, setGuests] = useState(2)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('historical-tour')
  const [bookingComplete, setBookingComplete] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setBookingComplete(true)
    setTimeout(() => setBookingComplete(false), 3000)
  }

  return (
    <div className="py-8 md:py-16 px-4 max-w-6xl mx-auto min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <SectionTitle subtitle="RESERVE YOUR SPOT" title="Online Booking" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Left Column - Calendar & Time */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6 transition-colors duration-200">
          <h3 className="text-lg md:text-xl font-serif font-bold mb-4 text-gray-800 dark:text-white">
            Select Date & Time
          </h3>
          
          <Calendar 
            onChange={setDate} 
            value={date} 
            className="border-0 w-full calendar-custom text-sm md:text-base"
            minDate={new Date()}
            prevLabel={<ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />}
            nextLabel={<ChevronRight className="w-4 h-4 md:w-5 md:h-5" />}
            prev2Label={null}
            next2Label={null}
          />
          
          <h4 className="font-semibold mt-5 md:mt-6 mb-3 text-gray-800 dark:text-white text-base md:text-lg">
            Available Time Slots
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-1.5 md:py-2 px-2 md:px-3 rounded-lg border text-xs md:text-sm font-medium transition-all
                  ${selectedTime === time 
                    ? 'bg-prieska-terracotta text-white border-prieska-terracotta shadow-md' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-prieska-terracotta dark:hover:border-prieska-terracotta hover:shadow-sm'
                  }`}
              >
                <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 inline mr-1" />
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Booking Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6 transition-colors duration-200">
          <h3 className="text-lg md:text-xl font-serif font-bold mb-4 text-gray-800 dark:text-white">
            Your Details
          </h3>
          
          {bookingComplete ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 md:p-6 text-center">
              <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
              <h4 className="text-lg md:text-xl font-bold text-green-800 dark:text-green-300 mb-2">
                Booking Confirmed!
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mb-4">
                Your adventure in Prieska is booked. A confirmation email has been sent.
              </p>
              <button 
                onClick={() => setShowPaymentModal(true)}
                className="bg-blue-600 text-white px-5 md:px-6 py-2 rounded-lg text-sm md:text-base hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition"
              >
                Proceed to Payment (Demo)
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Experience
                </label>
                <select 
                  value={service} 
                  onChange={(e) => setService(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent transition"
                >
                  <option value="historical-tour">Historical Tour</option>
                  <option value="river-adventure">River Adventure</option>
                  <option value="birdwatching">Birdwatching Safari</option>
                  <option value="stargazing">Stargazing Experience</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent transition" 
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent transition" 
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent transition" 
                  placeholder="+27 82 123 4567"
                />
              </div>
              
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number of Guests
                </label>
                <div className="relative">
                  <select 
                    value={guests} 
                    onChange={(e) => setGuests(parseInt(e.target.value))} 
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent appearance-none transition"
                  >
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                  <Users className="w-4 h-4 md:w-5 md:h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-3 md:p-4 rounded-lg">
                <p className="font-semibold text-gray-800 dark:text-white flex items-center gap-2 text-sm md:text-base">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-prieska-terracotta" />
                  Booking Summary
                </p>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {date.toLocaleDateString('en-ZA', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} at {selectedTime || '--:--'} • {guests} guest{guests !== 1 ? 's' : ''}
                </p>
              </div>

              <button
                type="submit"
                disabled={!selectedTime}
                className={`w-full py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-all ${
                  selectedTime 
                    ? 'bg-prieska-terracotta text-white hover:bg-opacity-90 dark:hover:bg-opacity-80 shadow-md hover:shadow-lg' 
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                Confirm Booking
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <FakePayment 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={() => {
          setShowPaymentModal(false)
        }}
      />

      {/* Global Calendar Overrides */}
      <style jsx global>{`
        .react-calendar {
          width: 100%;
          border: none;
          font-family: inherit;
          background: transparent !important;
          line-height: 1.5;
        }
        
        .react-calendar__navigation {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        
        .react-calendar__navigation button {
          min-width: 32px;
          background: transparent !important;
          font-size: 0.875rem;
          border-radius: 8px;
          color: #374151;
          padding: 4px;
        }
        
        @media (min-width: 768px) {
          .react-calendar__navigation button {
            min-width: 36px;
            font-size: 1rem;
            padding: 6px;
          }
        }
        
        .dark .react-calendar__navigation button {
          color: #e5e7eb;
        }
        
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background: #f3f4f6 !important;
        }
        
        .dark .react-calendar__navigation button:enabled:hover,
        .dark .react-calendar__navigation button:enabled:focus {
          background: #374151 !important;
        }
        
        .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 0.65rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }
        
        @media (min-width: 768px) {
          .react-calendar__month-view__weekdays {
            font-size: 0.75rem;
            margin-bottom: 0.5rem;
          }
        }
        
        .dark .react-calendar__month-view__weekdays {
          color: #9ca3af;
        }
        
        .react-calendar__month-view__weekdays__weekday {
          padding: 0.25rem 0;
        }
        
        @media (min-width: 768px) {
          .react-calendar__month-view__weekdays__weekday {
            padding: 0.5rem 0;
          }
        }
        
        .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none;
        }
        
        .react-calendar__tile {
          padding: 0.5rem 0.125rem;
          border-radius: 6px;
          font-size: 0.75rem;
          color: #1f2937;
          background: transparent !important;
        }
        
        @media (min-width: 768px) {
          .react-calendar__tile {
            padding: 0.75rem 0.25rem;
            font-size: 0.875rem;
            border-radius: 8px;
          }
        }
        
        .dark .react-calendar__tile {
          color: #e5e7eb;
          background: transparent !important;
        }
        
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background: #f3f4f6 !important;
        }
        
        .dark .react-calendar__tile:enabled:hover,
        .dark .react-calendar__tile:enabled:focus {
          background: #374151 !important;
        }
        
        .react-calendar__tile--active {
          background: #C86A45 !important;
          color: white !important;
        }
        
        .react-calendar__tile--now {
          background: #2B5B84 !important;
          color: white !important;
        }
        
        .react-calendar__month-view__days__day--weekend {
          color: #ef4444 !important;
        }
        
        .dark .react-calendar__month-view__days__day--weekend {
          color: #f87171 !important;
        }
        
        .react-calendar__month-view__days__day--neighboringMonth {
          color: #9ca3af !important;
        }
        
        .dark .react-calendar__month-view__days__day--neighboringMonth {
          color: #4b5563 !important;
        }
        
        .react-calendar__navigation__label__labelText {
          font-weight: 600;
          color: #1f2937;
          font-size: 0.875rem;
        }
        
        @media (min-width: 768px) {
          .react-calendar__navigation__label__labelText {
            font-size: 1rem;
          }
        }
        
        .dark .react-calendar__navigation__label__labelText {
          color: #e5e7eb;
        }
        
        .react-calendar__navigation__arrow {
          flex-grow: 0.2;
        }
        
        .react-calendar__viewContainer,
        .react-calendar__month-view,
        .react-calendar__month-view > div {
          background: transparent !important;
        }
      `}</style>
    </div>
  )
}

export default Booking