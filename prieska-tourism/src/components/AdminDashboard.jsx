const AdminDashboard = ({ user, onLogout }) => {
  // Mock data for dashboard
  const bookings = JSON.parse(localStorage.getItem('demo_bookings') || '[]');
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif font-bold text-white">Admin Dashboard</h2>
            <p className="text-amber-100 text-sm">Welcome, {user.name || user.email}</p>
          </div>
          <button onClick={onLogout} className="text-white hover:text-amber-200 transition"><i className="fas fa-sign-out-alt text-xl"></i></button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <i className="fas fa-calendar-check text-2xl text-[#B87333] mb-2 block"></i>
              <p className="text-2xl font-bold text-[#2C3E2F]">{bookings.length}</p>
              <p className="text-xs text-gray-500">Total Bookings</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <i className="fas fa-users text-2xl text-[#B87333] mb-2 block"></i>
              <p className="text-2xl font-bold text-[#2C3E2F]">3</p>
              <p className="text-xs text-gray-500">Active Guests</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <i className="fas fa-chart-line text-2xl text-[#B87333] mb-2 block"></i>
              <p className="text-2xl font-bold text-[#2C3E2F]">ZAR 12,450</p>
              <p className="text-xs text-gray-500">Revenue (Demo)</p>
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-3">Recent Bookings (Demo)</h3>
          <div className="space-y-2">
            {bookings.length === 0 && <p className="text-gray-500 text-sm">No bookings yet. Make a booking from the website to see it here.</p>}
            {bookings.slice(0, 5).map((booking, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center text-sm">
                <div><span className="font-medium">{booking.name}</span><span className="text-gray-500 text-xs ml-2">{booking.experience || booking.guesthouse}</span></div>
                <span className="text-[#B87333] font-semibold">ZAR {booking.total}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-xs text-gray-600">This is a demo admin panel. In production, data would be stored in a database.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;