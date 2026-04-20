// src/components/sections/QuickAccess.jsx
import { Link } from 'react-router-dom';
import { 
  Newspaper, 
  Landmark, 
  Bell, 
  CalendarDays, 
  MapPin, 
  Store, 
  Bed, 
  Info,
  Briefcase,
  Shield,
  Cloud,
  Fuel,
  Map
} from 'lucide-react';

// Data for Quick Access Cards
const quickAccessItems = [
  {
    id: 'news',
    title: 'News',
    description: 'Latest updates & stories from Prieska',
    icon: Newspaper,
    href: '#news',
    color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 group-hover:text-white dark:group-hover:text-white',
  },
  {
    id: 'history',
    title: 'History',
    description: 'Ancient origins & heritage',
    icon: Landmark,
    href: '#history',
    color: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 dark:group-hover:bg-amber-600 group-hover:text-white dark:group-hover:text-white',
  },
  {
    id: 'vacancies',
    title: 'Vacancies',
    description: 'Find job opportunities in Prieska',
    icon: Briefcase,
    href: '#vacancies',
    color: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:text-white',
  },
  {
    id: 'notices',
    title: 'Notices',
    description: 'Important announcements & updates',
    icon: Bell,
    href: '#notices',
    color: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 group-hover:bg-red-600 dark:group-hover:bg-red-600 group-hover:text-white dark:group-hover:text-white',
  },
  {
    id: 'events',
    title: 'Events',
    description: 'What\'s happening in and around town',
    icon: CalendarDays,
    href: '#events',
    color: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 group-hover:bg-green-600 dark:group-hover:bg-green-600 group-hover:text-white dark:group-hover:text-white',
  },
  {
    id: 'things-to-do',
    title: 'Things to Do',
    description: 'Adventures, sights & experiences',
    icon: MapPin,
    href: '#discover',
    color: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 dark:group-hover:bg-purple-600 group-hover:text-white dark:group-hover:text-white',
  },
  {
    id: 'businesses',
    title: 'Local Businesses',
    description: 'Shops, services & amenities',
    icon: Store,
    href: '#businesses',
    color: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:text-white',
  },
  {
    id: 'guesthouses',
    title: 'Guesthouses',
    description: 'Find your perfect stay',
    icon: Bed,
    href: '#accommodation',
    color: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 group-hover:bg-orange-600 dark:group-hover:bg-orange-600 group-hover:text-white dark:group-hover:text-white',
  },
  {
    id: 'emergency',
    title: 'Emergency',
    description: 'Important contact numbers',
    icon: Shield,
    href: '#emergency',
    color: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 group-hover:bg-red-600 dark:group-hover:bg-red-600 group-hover:text-white dark:group-hover:text-white',
  },
  {
    id: 'weather',
    title: 'Weather',
    description: 'Current conditions',
    icon: Cloud,
    href: '#weather',
    color: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-600 dark:group-hover:bg-cyan-600 group-hover:text-white dark:group-hover:text-white',
  },
  {
    id: 'fuel',
    title: 'Fuel Prices',
    description: 'Compare local stations',
    icon: Fuel,
    href: '#fuel',
    color: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 dark:group-hover:bg-amber-600 group-hover:text-white dark:group-hover:text-white',
  },
  {
    id: 'map',
    title: 'Map',
    description: 'Interactive area map',
    icon: Map,
    href: '#map',
    color: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 group-hover:bg-green-600 dark:group-hover:bg-green-600 group-hover:text-white dark:group-hover:text-white',
  },
  {
    id: 'faq',
    title: 'FAQ',
    description: 'Answers to common questions',
    icon: Info,
    to: '/faq',
    color: 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-600 dark:group-hover:bg-gray-700 group-hover:text-white dark:group-hover:text-gray-200',
  },
];

const QuickAccess = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-gray-800 dark:text-white">
          Quick Access
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Everything you need, right at your fingertips.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {quickAccessItems.map((item) => {
          const IconComponent = item.icon;
          const isAnchor = item.href;
          
          const cardClasses = `group flex flex-col items-center p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/30 transition-all duration-200 cursor-pointer text-center`;
          
          const CardContent = () => (
            <>
              <div className={`p-3 rounded-full transition-colors duration-200 ${item.color}`}>
                <IconComponent size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mt-3 group-hover:text-prieska-terracotta dark:group-hover:text-prieska-terracotta transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 hidden sm:block">
                {item.description}
              </p>
            </>
          );

          if (item.to) {
            return (
              <Link key={item.id} to={item.to} className={cardClasses}>
                <CardContent />
              </Link>
            );
          } else {
            return (
              <a key={item.id} href={item.href} className={cardClasses}>
                <CardContent />
              </a>
            );
          }
        })}
      </div>
    </section>
  );
};

export default QuickAccess;