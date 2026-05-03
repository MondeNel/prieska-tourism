// src/data/municipalUpdates.js
import { 
  AlertTriangle, 
  Droplet, 
  Zap, 
  Calendar, 
  Megaphone, 
  Info,
  Construction,
  FileText,
  Trash2,
  Wrench
} from 'lucide-react'

export const updateCategories = [
  { id: 'all', label: 'All Updates', icon: Megaphone },
  { id: 'water', label: 'Water', icon: Droplet },
  { id: 'electricity', label: 'Electricity', icon: Zap },
  { id: 'roads', label: 'Roads', icon: Construction },
  { id: 'refuse', label: 'Refuse', icon: Trash2 },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'notices', label: 'General', icon: Info }
]

export const municipalUpdates = [
  {
    id: 1,
    category: 'water',
    title: 'Planned Water Interruption - Main Road Area',
    description: 'Water supply will be interrupted on Wednesday, 23 April 2026, from 08:00 to 16:00 due to pipeline maintenance in the Main Road area. Affected streets: Main Road, Church Street, and Victoria Street. Residents are advised to store sufficient water for this period.',
    location: 'Main Road, Church Street, Victoria Street',
    date: '2026-04-23',
    time: '08:00 - 16:00',
    priority: 'high',
    icon: Droplet,
    contactPerson: 'Water Department',
    contactNumber: '053 353 2011'
  },
  {
    id: 2,
    category: 'electricity',
    title: 'Load Shedding Schedule - April 2026',
    description: 'Eskom has announced the load shedding schedule for Prieska. Stage 2 load shedding is currently in effect. Prieska is in Block 3. Please check the municipal website for detailed schedules. Remember to switch off appliances during outages.',
    location: 'All areas',
    date: '2026-04-20',
    priority: 'high',
    icon: Zap,
    contactPerson: 'Electrical Department',
    contactNumber: '053 353 2022'
  },
  {
    id: 3,
    category: 'refuse',
    title: 'Refuse Collection - Public Holiday Schedule',
    description: 'Due to the upcoming public holiday (Freedom Day, 27 April), refuse collection will be one day later than usual for all areas. Monday collection moves to Tuesday, Tuesday to Wednesday, etc. Normal schedule resumes 5 May.',
    location: 'All areas',
    date: '2026-04-27',
    priority: 'medium',
    icon: Trash2,
    contactPerson: 'Waste Management',
    contactNumber: '053 353 2033'
  },
  {
    id: 4,
    category: 'roads',
    title: 'Road Repairs - N10 Highway',
    description: 'Road repair work will commence on the N10 highway between Prieska and Groblershoop from 28 April to 5 May 2026. Stop-and-go traffic controls will be in place. Motorists should expect delays of up to 20 minutes and are advised to plan accordingly.',
    location: 'N10 Highway (Prieska to Groblershoop)',
    date: '2026-04-28',
    time: '07:00 - 18:00',
    priority: 'medium',
    icon: Construction,
    contactPerson: 'Roads Department',
    contactNumber: '053 353 2044'
  },
  {
    id: 5,
    category: 'events',
    title: 'Public Meeting: IDP and Budget 2026/27',
    description: 'Siyathemba Municipality invites all residents to a public meeting to discuss the Integrated Development Plan (IDP) and Budget for the 2026/27 financial year. Your input is valuable. Light refreshments will be served.',
    location: 'Town Hall, Main Road, Prieska',
    date: '2026-05-05',
    time: '18:00 - 20:00',
    priority: 'high',
    icon: Calendar,
    contactPerson: 'Office of the Municipal Manager',
    contactNumber: '053 353 2000'
  },
  {
    id: 6,
    category: 'notices',
    title: 'Municipal Offices - Early Closure',
    description: 'Please note that all municipal offices will close at 13:00 on Friday, 25 April 2026, for staff training. Emergency services will continue to operate as normal. Normal office hours resume Monday, 28 April.',
    location: 'All municipal offices',
    date: '2026-04-25',
    priority: 'medium',
    icon: Info,
    contactPerson: 'Human Resources',
    contactNumber: '053 353 2000'
  },
  {
    id: 7,
    category: 'water',
    title: 'Water Restrictions - Level 1',
    description: 'Level 1 water restrictions are now in effect. Residents are requested to use water sparingly. No watering of gardens between 10:00 and 16:00. No washing of paved areas with hosepipes.',
    location: 'All areas',
    date: '2026-04-15',
    priority: 'high',
    icon: Droplet,
    contactPerson: 'Water Department',
    contactNumber: '053 353 2011'
  },
  {
    id: 8,
    category: 'notices',
    title: 'Community Clean-Up Day',
    description: 'Join us for the monthly community clean-up day. Meet at the Town Hall at 08:00. Bags and gloves will be provided. Let\'s keep Prieska beautiful!',
    location: 'Town Hall (meeting point)',
    date: '2026-05-10',
    time: '08:00 - 12:00',
    priority: 'low',
    icon: Megaphone,
    contactPerson: 'Community Services',
    contactNumber: '053 353 2055'
  },
  {
    id: 9,
    category: 'electricity',
    title: 'Meter Reading Schedule - May 2026',
    description: 'Municipal meter readers will be visiting all properties from 5 May to 9 May 2026. Please ensure clear access to meters. Readers will carry official identification.',
    location: 'All areas',
    date: '2026-05-05',
    priority: 'low',
    icon: Zap,
    contactPerson: 'Revenue Department',
    contactNumber: '053 353 2066'
  }
]

export const getPriorityColor = (priority) => {
  switch(priority) {
    case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20'
    case 'medium': return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
    case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20'
    default: return 'border-gray-500 bg-gray-50 dark:bg-gray-800'
  }
}

export const getPriorityLabel = (priority) => {
  switch(priority) {
    case 'high': return 'High Priority'
    case 'medium': return 'Medium Priority'
    case 'low': return 'Low Priority'
    default: return 'Notice'
  }
}

export const getUpcomingUpdates = (limit = 5) => {
  const today = new Date().toISOString().split('T')[0]
  return municipalUpdates
    .filter(u => u.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit)
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-ZA', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short'
  })
}

export const isToday = (dateString) => {
  const today = new Date().toISOString().split('T')[0]
  return dateString === today
}

export const isTomorrow = (dateString) => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return dateString === tomorrow.toISOString().split('T')[0]
}