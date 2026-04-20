// src/components/sections/Notices.jsx
import { AlertCircle, Calendar, Bell } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'

const notices = [
  {
    id: 1,
    type: 'Community',
    title: 'Prieska Copper Mine Revival Update',
    date: '15 March 2025',
    description: 'Orion Minerals advances plans to restart the historic copper-zinc mine. Public consultation meeting scheduled for April 10 at the Town Hall.',
    icon: <AlertCircle className="text-prieska-terracotta w-4 h-4 md:w-5 md:h-5" />
  },
  {
    id: 2,
    type: 'Event',
    title: 'Prieska Farmers Market',
    date: 'First Saturday monthly',
    description: 'Local produce, crafts, and homemade treats at Die Bos Nature Reserve. 8am - 1pm.',
    icon: <Calendar className="text-prieska-terracotta w-4 h-4 md:w-5 md:h-5" />
  },
  {
    id: 3,
    type: 'Announcement',
    title: 'Prieska Power Reserve Green Hydrogen Project',
    date: 'Ongoing',
    description: 'New renewable energy project receives funding approval, bringing jobs and sustainable development to the region.',
    icon: <Bell className="text-prieska-terracotta w-4 h-4 md:w-5 md:h-5" />
  }
]

const Notices = () => {
  return (
    <section id="notices" className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      <SectionTitle subtitle="STAY INFORMED" title="Town Notices & Updates" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="bg-prieska-sand dark:bg-gray-700 p-1.5 md:p-2 rounded-full">
                {notice.icon}
              </div>
              <span className="text-xs md:text-sm font-semibold text-prieska-terracotta dark:text-prieska-terracotta uppercase tracking-wide">
                {notice.type}
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-serif font-bold mb-1.5 md:mb-2 text-gray-800 dark:text-white">
              {notice.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mb-2 md:mb-3">
              {notice.date}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">
              {notice.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Notices