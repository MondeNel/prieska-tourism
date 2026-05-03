// src/components/layout/MobileBottomNav.jsx
import { Home, Newspaper, Briefcase, Calendar, Megaphone } from 'lucide-react'

const MobileBottomNav = ({ switchFeed, activeFeed }) => {
  const navItems = [
    { id: 'feed', icon: Home, label: 'Feed', action: () => switchFeed('feed') },
    { id: 'news', icon: Newspaper, label: 'News', action: () => switchFeed('news') },
    { id: 'vacancies', icon: Briefcase, label: 'Jobs', action: () => switchFeed('vacancies') },
    { id: 'events', icon: Calendar, label: 'Events', action: () => switchFeed('events') },
    { id: 'noticeboard', icon: Megaphone, label: 'Notices', action: () => switchFeed('noticeboard') },
  ]

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 safe-area-bottom">
      <div className="flex items-center justify-around px-1 py-1">
        {navItems.map((item, index) => (
          <button
            key={`${item.id}-${index}`}
            onClick={item.action}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition ${
              activeFeed === item.id
                ? 'text-prieska-terracotta'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[9px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MobileBottomNav