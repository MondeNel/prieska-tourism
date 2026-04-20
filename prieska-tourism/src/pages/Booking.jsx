import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import SectionTitle from '../components/ui/SectionTitle'
import { Clock, Users, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setBookingComplete(true)
    setTimeout(() => setBookingComplete(false), 3000)
  }

  return (
    <div className="py-16 px-4 max-w-6xl mx-auto min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <SectionTitle subtitle="RESERVE YOUR SPOT" title="Online Booking" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Calendar & Time */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-200">
          <h3 className="text-xl font-serif font-bold mb-4 text-gray-800 dark:text-white">
            Select Date & Time
          </h3>
          
          <Calendar 
            onChange={setDate} 
            value={date} 
            className="border-0 w-full calendar-custom"
            minDate={new Date()}
            prevLabel={<ChevronLeft size={18} />}
            nextLabel={<ChevronRight size={18} />}
            prev2Label={null}
            next2Label={null}
          />
          
          <h4 className="font-semibold mt-6 mb-3 text-gray-800 dark:text-white">
            Available Time Slots
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all
                  ${selectedTime === time 
                    ? 'bg-prieska-terracotta text-white border-prieska-terracotta shadow-md' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-prieska-terracotta dark:hover:border-prieska-terracotta hover:shadow-sm'
                  }`}
              >
                <Clock size={14} className="inline mr-1" />
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Booking Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-200">
          <h3 className="text-xl font-serif font-bold mb-4 text-gray-800 dark:text-white">
            Your Details
          </h3>
          
          {bookingComplete ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
              <CheckCircle size={48} className="text-green-600 dark:text-green-400 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
                Booking Confirmed!
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your adventure in Prieska is booked. A confirmation email has been sent.
              </p>
              <button 
                onClick={() => window.location.href = '/fake-payment'}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition"
              >
                Proceed to Payment (Demo)
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Experience
                </label>
                <select 
                  value={service} 
                  onChange={(e) => setService(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent transition"
                >
                  <option value="historical-tour">Historical Tour</option>
                  <option value="river-adventure">River Adventure</option>
                  <option value="birdwatching">Birdwatching Safari</option>
                  <option value="stargazing">Stargazing Experience</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent transition" 
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent transition" 
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent transition" 
                  placeholder="+27 82 123 4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number of Guests
                </label>
                <div className="relative">
                  <select 
                    value={guests} 
                    onChange={(e) => setGuests(parseInt(e.target.value))} 
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent appearance-none transition"
                  >
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                  <Users size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <Clock size={16} className="text-prieska-terracotta" />
                  Booking Summary
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {date.toLocaleDateString('en-ZA', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} at {selectedTime || '--:--'} • {guests} guest{guests !== 1 ? 's' : ''}
                </p>
              </div>

              <button
                type="submit"
                disabled={!selectedTime}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
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

      {/* Global Calendar Overrides - Fixed White Blocks */}
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
          margin-bottom: 1rem;
        }
        
        .react-calendar__navigation button {
          min-width: 36px;
          background: transparent !important;
          font-size: 1rem;
          border-radius: 8px;
          color: #374151;
          padding: 6px;
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
          font-size: 0.75rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }
        
        .dark .react-calendar__month-view__weekdays {
          color: #9ca3af;
        }
        
        .react-calendar__month-view__weekdays__weekday {
          padding: 0.5rem 0;
        }
        
        .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none;
        }
        
        /* Critical fix: Remove white background from tiles */
        .react-calendar__tile {
          padding: 0.75rem 0.25rem;
          border-radius: 8px;
          font-size: 0.875rem;
          color: #1f2937;
          background: transparent !important;
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
        }
        
        .dark .react-calendar__navigation__label__labelText {
          color: #e5e7eb;
        }
        
        .react-calendar__navigation__arrow {
          flex-grow: 0.2;
        }
        
        /* Remove any default white backgrounds from calendar container */
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