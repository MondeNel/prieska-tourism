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
  Briefcase 
} from 'lucide-react';

// Data for Quick Access Cards
// Each card can link to an external page (via 'to') or an anchor on the home page (via 'href')
const quickAccessItems = [
  {
    id: 'news',
    title: 'News',
    description: 'Latest updates & stories from Prieska',
    icon: Newspaper,
    href: '#news', // Changed to anchor link
    color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
  },
  {
    id: 'history',
    title: 'History',
    description: 'Ancient origins & heritage',
    icon: Landmark,
    href: '#history',
    color: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
  },
  {
    id: 'vacancies',
    title: 'Vacancies',
    description: 'Find job opportunities in Prieska',
    icon: Briefcase,
    href: '#vacancies',
    color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
  },
  {
    id: 'notices',
    title: 'Notices',
    description: 'Important announcements & updates',
    icon: Bell,
    href: '#notices',
    color: 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white',
  },
  {
    id: 'events',
    title: 'Events',
    description: 'What\'s happening in and around town',
    icon: CalendarDays,
    href: '#events',
    color: 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white',
  },
  {
    id: 'things-to-do',
    title: 'Things to Do',
    description: 'Adventures, sights & experiences',
    icon: MapPin,
    href: '#discover',
    color: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
  },
  {
    id: 'businesses',
    title: 'Local Businesses',
    description: 'Shops, services & amenities',
    icon: Store,
    href: '#businesses',
    color: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
  },
  {
    id: 'guesthouses',
    title: 'Guesthouses',
    description: 'Find your perfect stay',
    icon: Bed,
    href: '#accommodation',
    color: 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white',
  },
  {
    id: 'faq',
    title: 'FAQ',
    description: 'Answers to common questions',
    icon: Info,
    to: '/faq',
    color: 'bg-gray-50 text-gray-600 group-hover:bg-gray-600 group-hover:text-white',
  },
];

const QuickAccess = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-gray-800">Quick Access</h2>
        <p className="text-gray-600 mt-2">Everything you need, right at your fingertips.</p>
      </div>

      {/* Responsive Grid: 1 col on mobile, up to 4 on large screens */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {quickAccessItems.map((item) => {
          const IconComponent = item.icon;
          // Determine if this is an internal anchor or a React Router link
          const isAnchor = item.href;
          
          // Base card classes
          const cardClasses = `group flex flex-col items-center p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer text-center ${isAnchor ? '' : ''}`;
          
          const CardContent = () => (
            <>
              <div className={`p-3 rounded-full transition-colors duration-200 ${item.color}`}>
                <IconComponent size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mt-3 group-hover:text-prieska-terracotta transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1 hidden sm:block">
                {item.description}
              </p>
            </>
          );

          // Render as a link (either React Router Link or anchor)
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