// src/pages/Booking.jsx
import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import LeftSidebar from '../components/layout/LeftSidebar'
import RightSidebar from '../components/layout/RightSidebar'
import SectionTitle from '../components/ui/SectionTitle'
import { Clock, Users, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import FakePayment from './FakePayment'
import { getQuickStats } from '../data/activityFeed'
import { Newspaper, Calendar as CalendarIcon, Megaphone } from 'lucide-react'

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

  const stats = getQuickStats()

  const handleSubmit = (e) => {
    e.preventDefault()
    setBookingComplete(true)
    setTimeout(() => setBookingComplete(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <LeftSidebar className="lg:col-span-3" />
          
          {/* Main Content Area */}
          <div id="main-feed" className="lg:col-span-6 overflow-y-auto max-h-[calc(100vh-100px)]">
            {/* Quick Stats */}
            <div className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-950 pb-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{stats.newsThisWeek}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Newspaper className="w-3 h-3 text-blue-500" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">News</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{stats.upcomingEvents}</p>
                  <div className="flex items-center justify-center gap-1">
                    <CalendarIcon className="w-3 h-3 text-green-500" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Events</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm">
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{stats.newNotices}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Megaphone className="w-3 h-3 text-purple-500" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Notices</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Content */}
            <SectionTitle subtitle="RESERVE YOUR SPOT" title="Online Booking" />
            
            <div className="space-y-4">
              {/* Calendar & Time */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                <h3 className="text-sm font-serif font-bold mb-3 text-gray-800 dark:text-white">
                  Select Date & Time
                </h3>
                
                <Calendar 
                  onChange={setDate} 
                  value={date} 
                  className="border-0 w-full calendar-custom text-xs md:text-sm"
                  minDate={new Date()}
                  prevLabel={<ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                  nextLabel={<ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                  prev2Label={null}
                  next2Label={null}
                />
                
                <h4 className="font-semibold mt-4 mb-2 text-gray-800 dark:text-white text-xs">
                  Available Time Slots
                </h4>
                <div className="grid grid-cols-4 gap-1.5">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-1.5 px-2 rounded-lg border text-xs font-medium transition
                        ${selectedTime === time 
                          ? 'bg-prieska-terracotta text-white border-prieska-terracotta' 
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-prieska-terracotta'
                        }`}
                    >
                      <Clock className="w-3 h-3 inline mr-1" />
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Booking Form */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                <h3 className="text-sm font-serif font-bold mb-3 text-gray-800 dark:text-white">
                  Your Details
                </h3>
                
                {bookingComplete ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
                    <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-green-800 dark:text-green-300 mb-1">
                      Booking Confirmed!
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-xs mb-3">
                      Your adventure is booked. A confirmation email has been sent.
                    </p>
                    <button 
                      onClick={() => setShowPaymentModal(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs hover:bg-blue-700 transition"
                    >
                      Proceed to Payment (Demo)
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Select Experience
                      </label>
                      <select 
                        value={service} 
                        onChange={(e) => setService(e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-xs bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                      >
                        <option value="historical-tour">Historical Tour</option>
                        <option value="river-adventure">River Adventure</option>
                        <option value="birdwatching">Birdwatching Safari</option>
                        <option value="stargazing">Stargazing Experience</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input 
                        type="text" required value={name} onChange={(e) => setName(e.target.value)} 
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-xs bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent" 
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} 
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-xs bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent" 
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone
                      </label>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} 
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-xs bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent" 
                        placeholder="+27 82 123 4567"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Number of Guests
                      </label>
                      <select value={guests} onChange={(e) => setGuests(parseInt(e.target.value))} 
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-xs bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                      >
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                      </select>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="font-semibold text-gray-800 dark:text-white text-xs">
                        Booking Summary
                      </p>
                      <p className="text-[10px] text-gray-600 dark:text-gray-300 mt-0.5">
                        {date.toLocaleDateString('en-ZA', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} at {selectedTime || '--:--'} • {guests} guest{guests !== 1 ? 's' : ''}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={!selectedTime}
                      className={`w-full py-2 rounded-lg font-semibold text-xs transition ${
                        selectedTime 
                          ? 'bg-prieska-terracotta text-white hover:bg-opacity-90' 
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Confirm Booking
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <RightSidebar className="lg:col-span-3" />
        </div>
      </div>

      {/* Payment Modal */}
      <FakePayment 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={() => setShowPaymentModal(false)}
      />

      {/* Calendar Styles */}
      <style>{`
        .react-calendar {
          width: 100%;
          border: none;
          font-family: inherit;
          background: transparent !important;
        }
        .react-calendar__navigation button {
          min-width: 28px;
          background: transparent !important;
          font-size: 0.8rem;
          border-radius: 6px;
          color: #374151;
          padding: 3px;
        }
        .dark .react-calendar__navigation button {
          color: #e5e7eb;
        }
        .react-calendar__navigation button:enabled:hover {
          background: #f3f4f6 !important;
        }
        .dark .react-calendar__navigation button:enabled:hover {
          background: #374151 !important;
        }
        .react-calendar__month-view__weekdays {
          font-size: 0.6rem;
          color: #6b7280;
        }
        .dark .react-calendar__month-view__weekdays {
          color: #9ca3af;
        }
        .react-calendar__tile {
          padding: 0.4rem 0.1rem;
          font-size: 0.7rem;
          border-radius: 6px;
          color: #1f2937;
          background: transparent !important;
        }
        .dark .react-calendar__tile {
          color: #e5e7eb;
        }
        .react-calendar__tile:enabled:hover {
          background: #f3f4f6 !important;
        }
        .dark .react-calendar__tile:enabled:hover {
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
        .react-calendar__navigation__label__labelText {
          font-weight: 600;
          color: #1f2937;
          font-size: 0.8rem;
        }
        .dark .react-calendar__navigation__label__labelText {
          color: #e5e7eb;
        }
      `}</style>
    </div>
  )
}

export default Booking