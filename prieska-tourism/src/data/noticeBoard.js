// src/data/noticeBoard.js
import { Package, Dog, Home, Users, Megaphone } from 'lucide-react'

export const noticeCategories = [
  { id: 'all', label: 'All Notices', icon: Megaphone },
  { id: 'forsale', label: 'For Sale', icon: Package },
  { id: 'lostfound', label: 'Lost & Found', icon: Dog },
  { id: 'housing', label: 'Housing', icon: Home },
  { id: 'community', label: 'Community', icon: Users }
]

export const notices = [
  {
    id: 1,
    category: 'forsale',
    title: 'Couch for Sale',
    description: '3-seater brown leather couch. Good condition. R1,500 or nearest offer.',
    location: 'Van Niekerk Street',
    postedBy: 'Marietjie',
    postedDate: '2026-04-18',
    contact: '082 555 1234',
    image: null
  },
  {
    id: 2,
    category: 'lostfound',
    title: 'Lost: Small brown dog',
    description: 'Our Jack Russell, "Max", went missing near Die Bos on Saturday. He has a blue collar. Reward offered.',
    location: 'Die Bos area',
    postedBy: 'Johan',
    postedDate: '2026-04-20',
    contact: '072 123 9876',
    image: null
  },
  {
    id: 3,
    category: 'housing',
    title: 'Flat to Rent',
    description: '1 bedroom garden flat available from 1 May. Water included. Prepaid electricity. R2,800 pm.',
    location: 'Church Street',
    postedBy: 'Elsabe',
    postedDate: '2026-04-19',
    contact: '083 456 7890',
    image: null
  },
  {
    id: 4,
    category: 'forsale',
    title: 'Bicycle - Nearly New',
    description: 'Avalanche mountain bike, 21-speed, used twice. R2,200.',
    location: 'Main Road',
    postedBy: 'Pieter',
    postedDate: '2026-04-17',
    contact: '076 234 5678',
    image: null
  },
  {
    id: 5,
    category: 'community',
    title: 'Free Computer Lessons',
    description: 'Basic computer skills class starting next month at the library. Tuesdays 2-4pm. All ages welcome.',
    location: 'Prieska Library',
    postedBy: 'Library Staff',
    postedDate: '2026-04-15',
    contact: '053 353 1122',
    image: null
  },
  {
    id: 6,
    category: 'lostfound',
    title: 'Found: Set of keys',
    description: 'Found near OK Foods on Victoria Street. Describe to claim.',
    location: 'Victoria Street',
    postedBy: 'Thandi',
    postedDate: '2026-04-21',
    contact: '079 876 5432',
    image: null
  }
]

export const getRelativeTime = (dateString) => {
  const posted = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - posted)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}