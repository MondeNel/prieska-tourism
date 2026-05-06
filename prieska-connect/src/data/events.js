// src/data/events.js
import { 
  Calendar, 
  Music, 
  Users, 
  ShoppingBag, 
  Church, 
  Trophy,
  Utensils,
  TreePine
} from 'lucide-react'

export const eventCategories = [
  { id: 'all', label: 'All Events', icon: Calendar },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'market', label: 'Markets', icon: ShoppingBag },
  { id: 'church', label: 'Church', icon: Church },
  { id: 'sports', label: 'Sports', icon: Trophy },
  { id: 'music', label: 'Music & Arts', icon: Music },
  { id: 'food', label: 'Food & Drink', icon: Utensils },
  { id: 'outdoor', label: 'Outdoor', icon: TreePine }
]

export const events = [
  {
    id: 1,
    category: 'market',
    title: 'Prieska Farmers Market',
    description: 'Local produce, crafts, and homemade treats. Fresh bread, preserves, and handcrafted goods from local artisans.',
    location: 'Die Bos Nature Reserve',
    date: '2026-05-03',
    startTime: '08:00',
    endTime: '13:00',
    organizer: 'Prieska Tourism',
    contact: '053 353 1000',
    recurring: 'First Saturday monthly',
    image: null
  },
  {
    id: 2,
    category: 'church',
    title: 'NG Kerk Bazaar',
    description: 'Annual church bazaar with food stalls, games for children, and a white elephant sale. Everyone welcome!',
    location: 'NG Kerk Hall, Church Street',
    date: '2026-05-17',
    startTime: '09:00',
    endTime: '15:00',
    organizer: 'NG Kerk Prieska',
    contact: '053 353 1122',
    recurring: null,
    image: null
  },
  {
    id: 3,
    category: 'sports',
    title: 'Prieska Golf Day',
    description: 'Annual golf tournament. 4-ball betterball format. Prizes for winners and longest drive.',
    location: 'Prieska Golf Club',
    date: '2026-05-24',
    startTime: '08:30',
    endTime: '16:00',
    organizer: 'Prieska Golf Club',
    contact: '082 555 7890',
    recurring: 'Last Saturday monthly',
    image: '/golf.jpg'  // Added
  },
  {
    id: 4,
    category: 'community',
    title: 'Town Hall Meeting',
    description: 'Quarterly community meeting with Siyathemba Municipality. Discuss local issues and upcoming projects.',
    location: 'Town Hall, Main Road',
    date: '2026-05-28',
    startTime: '18:00',
    endTime: '20:00',
    organizer: 'Siyathemba Municipality',
    contact: '053 353 2000',
    recurring: 'Quarterly',
    image: null
  },
  {
    id: 5,
    category: 'music',
    title: 'Sundowner Concert',
    description: 'Live music at Die Bos. Bring your picnic basket and enjoy local talent as the sun sets over the Orange River.',
    location: 'Die Bos Nature Reserve',
    date: '2026-06-07',
    startTime: '16:00',
    endTime: '20:00',
    organizer: 'Prieska Arts Council',
    contact: '076 234 5678',
    recurring: null,
    image: null
  },
  {
    id: 6,
    category: 'outdoor',
    title: 'Orange River Canoe Challenge',
    description: 'Annual canoe race from Prieska to the Wonderdraai bend. Categories for all skill levels.',
    location: 'Orange River - Prieska Bridge start',
    date: '2026-06-14',
    startTime: '07:00',
    endTime: '14:00',
    organizer: 'Prieska Canoe Club',
    contact: '083 456 7890',
    recurring: 'Annually in June',
    image: '/karoo_river-rafting.jpg'  // Added
  },
  {
    id: 7,
    category: 'church',
    title: 'Aanddiens met Gaspreker',
    description: 'Evening service with guest speaker from Kimberley. All denominations welcome.',
    location: 'NG Kerk, Church Street',
    date: '2026-05-11',
    startTime: '18:30',
    endTime: '20:00',
    organizer: 'NG Kerk Prieska',
    contact: '053 353 1122',
    recurring: null,
    image: null
  },
  {
    id: 8,
    category: 'community',
    title: 'Senior Citizens Tea',
    description: 'Monthly gathering for senior citizens. Tea, cake, and good company. Transport available on request.',
    location: 'Community Hall, Victoria Street',
    date: '2026-05-14',
    startTime: '10:00',
    endTime: '12:00',
    organizer: 'Prieska Welfare',
    contact: '072 123 4567',
    recurring: 'Second Wednesday monthly',
    image: null
  },
  {
    id: 9,
    category: 'food',
    title: 'Boerewors Competition',
    description: 'Annual boerewors competition. Enter your best boerewors recipe or just come to taste and vote!',
    location: 'Showgrounds, Prieska',
    date: '2026-05-31',
    startTime: '11:00',
    endTime: '16:00',
    organizer: 'Prieska Vleismark',
    contact: '079 876 5432',
    recurring: null,
    image: '/boerewors_competition.jpg'  // Added
  }
]

// Helper functions
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-ZA', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short',
    year: 'numeric'
  })
}

export const formatTime = (timeString) => {
  if (!timeString) return ''
  const [hours, minutes] = timeString.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export const getUpcomingEvents = (limit = 5) => {
  const today = new Date().toISOString().split('T')[0]
  return events
    .filter(e => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit)
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

export const isThisWeekend = (dateString) => {
  const date = new Date(dateString)
  const day = date.getDay()
  return day === 5 || day === 6 || day === 0 // Fri, Sat, Sun
}