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

const quickAccessItems = [
  {
    id: 'news',
    title: 'News',
    description: 'Latest updates & stories',
    icon: Newspaper,
    href: '#news',
    color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white',
  },
  {
    id: 'history',
    title: 'History',
    description: 'Ancient origins & heritage',
    icon: Landmark,
    href: '#history',
    color: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white',
  },
  {
    id: 'vacancies',
    title: 'Vacancies',
    description: 'Job opportunities',
    icon: Briefcase,
    href: '#vacancies',
    color: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white',
  },
  {
    id: 'notices',
    title: 'Notices',
    description: 'Announcements & updates',
    icon: Bell,
    href: '#notices',
    color: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white',
  },
  {
    id: 'events',
    title: 'Events',
    description: 'What\'s happening',
    icon: CalendarDays,
    href: '#events',
    color: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 group-hover:bg-green-600 group-hover:text-white',
  },
  {
    id: 'things-to-do',
    title: 'Things to Do',
    description: 'Adventures & sights',
    icon: MapPin,
    href: '#discover',
    color: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white',
  },
  {
    id: 'businesses',
    title: 'Businesses',
    description: 'Shops & services',
    icon: Store,
    href: '#businesses',
    color: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white',
  },
  {
    id: 'guesthouses',
    title: 'Guesthouses',
    description: 'Find your stay',
    icon: Bed,
    href: '#accommodation',
    color: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 group-hover:bg-orange-600 group-hover:text-white',
  },
  {
    id: 'emergency',
    title: 'Emergency',
    description: 'Important numbers',
    icon: Shield,
    href: '#emergency',
    color: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white',
  },
  {
    id: 'weather',
    title: 'Weather',
    description: 'Current conditions',
    icon: Cloud,
    href: '#weather',
    color: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white',
  },
  {
    id: 'fuel',
    title: 'Fuel Prices',
    description: 'Compare stations',
    icon: Fuel,
    href: '#fuel',
    color: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white',
  },
  {
    id: 'map',
    title: 'Map',
    description: 'Interactive map',
    icon: Map,
    href: '#map',
    color: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 group-hover:bg-green-600 group-hover:text-white',
  },
  {
    id: 'faq',
    title: 'FAQ',
    description: 'Common questions',
    icon: Info,
    to: '/faq',
    color: 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-600 group-hover:text-white',
  },
];

const QuickAccess = () => {
  return (
    <section className="py-8 md:py-12 px-4 max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 dark:text-white">
          Quick Access
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1 md:mt-2">
          Everything you need, right at your fingertips.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
        {quickAccessItems.map((item) => {
          const IconComponent = item.icon;
          
          const cardClasses = `group flex flex-col items-center p-3 md:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer text-center`;
          
          const CardContent = () => (
            <>
              <div className={`p-2 md:p-3 rounded-full transition-colors duration-200 ${item.color}`}>
                <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <h3 className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-200 mt-2 group-hover:text-prieska-terracotta dark:group-hover:text-prieska-terracotta transition-colors">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5 hidden sm:block">
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