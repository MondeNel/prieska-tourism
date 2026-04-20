import { AlertCircle, Calendar, Bell } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'

const notices = [
  {
    id: 1,
    type: 'Community',
    title: 'Prieska Copper Mine Revival Update',
    date: '15 March 2025',
    description: 'Orion Minerals advances plans to restart the historic copper-zinc mine. Public consultation meeting scheduled for April 10 at the Town Hall.',
    icon: <AlertCircle className="text-prieska-terracotta" size={20} />
  },
  {
    id: 2,
    type: 'Event',
    title: 'Prieska Farmers Market',
    date: 'First Saturday monthly',
    description: 'Local produce, crafts, and homemade treats at Die Bos Nature Reserve. 8am - 1pm.',
    icon: <Calendar className="text-prieska-terracotta" size={20} />
  },
  {
    id: 3,
    type: 'Announcement',
    title: 'Prieska Power Reserve Green Hydrogen Project',
    date: 'Ongoing',
    description: 'New renewable energy project receives funding approval, bringing jobs and sustainable development to the region.',
    icon: <Bell className="text-prieska-terracotta" size={20} />
  }
]

const Notices = () => {
  return (
    <section id="notices" className="py-16 px-4 max-w-7xl mx-auto">
      <SectionTitle subtitle="STAY INFORMED" title="Town Notices & Updates" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-prieska-sand p-2 rounded-full">
                {notice.icon}
              </div>
              <span className="text-sm font-semibold text-prieska-terracotta uppercase tracking-wide">
                {notice.type}
              </span>
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">{notice.title}</h3>
            <p className="text-gray-500 text-sm mb-3">{notice.date}</p>
            <p className="text-gray-600">{notice.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Notices