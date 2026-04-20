import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import SectionTitle from '../components/ui/SectionTitle'
import { Clock, Users, CheckCircle } from 'lucide-react'

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
    <div className="py-16 px-4 max-w-6xl mx-auto">
      <SectionTitle subtitle="RESERVE YOUR SPOT" title="Online Booking" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Calendar & Time */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-serif font-bold mb-4">Select Date & Time</h3>
          <Calendar 
            onChange={setDate} 
            value={date} 
            className="mb-6 border-0 w-full"
            minDate={new Date()}
            tileClassName="hover:bg-prieska-sand rounded-lg"
          />
          
          <h4 className="font-semibold mb-3">Available Time Slots</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 px-3 rounded-lg border text-sm font-medium transition
                  ${selectedTime === time 
                    ? 'bg-prieska-terracotta text-white border-prieska-terracotta' 
                    : 'border-gray-300 hover:border-prieska-terracotta'}`}
              >
                <Clock size={14} className="inline mr-1" />
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Booking Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-serif font-bold mb-4">Your Details</h3>
          
          {bookingComplete ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <CheckCircle size={48} className="text-green-600 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-green-800 mb-2">Booking Confirmed!</h4>
              <p className="text-gray-600 mb-4">Your adventure in Prieska is booked. A confirmation email has been sent.</p>
              <button 
                onClick={() => window.location.href = '/fake-payment'}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Proceed to Payment (Demo)
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Experience</label>
                <select 
                  value={service} 
                  onChange={(e) => setService(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="historical-tour">Historical Tour</option>
                  <option value="river-adventure">River Adventure</option>
                  <option value="birdwatching">Birdwatching Safari</option>
                  <option value="stargazing">Stargazing Experience</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                <select value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2">
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Booking Summary</p>
                <p className="text-sm text-gray-600">
                  {date.toDateString()} at {selectedTime || '--:--'} • {guests} guest(s)
                </p>
              </div>

              <button
                type="submit"
                disabled={!selectedTime}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  selectedTime 
                    ? 'bg-prieska-terracotta text-white hover:bg-opacity-90' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Confirm Booking
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Booking