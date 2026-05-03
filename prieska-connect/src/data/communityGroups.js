// src/data/communityGroups.js
import { 
  Church, 
  Users, 
  Heart, 
  Baby, 
  Trophy, 
  Music, 
  Flower2,
  Coffee,
  BookOpen,
  HandHeart
} from 'lucide-react'

export const groupCategories = [
  { id: 'all', label: 'All Groups', icon: Users },
  { id: 'churches', label: 'Churches', icon: Church },
  { id: 'community', label: 'Community Service', icon: HandHeart },
  { id: 'sports', label: 'Sports & Recreation', icon: Trophy },
  { id: 'youth', label: 'Youth & Children', icon: Baby },
  { id: 'seniors', label: 'Seniors', icon: Heart },
  { id: 'arts', label: 'Arts & Culture', icon: Music },
  { id: 'social', label: 'Social Clubs', icon: Coffee }
]

export const communityGroups = [
  // Churches
  {
    id: 1,
    category: 'churches',
    name: 'NG Kerk Prieska',
    description: 'Dutch Reformed Church serving the Prieska community. Sunday services at 9:00 AM.',
    location: 'Church Street, Prieska',
    contact: '053 353 1122',
    contactPerson: 'Ds. Johan van Wyk',
    meetingTimes: 'Sunday 9:00 AM, Wednesday 7:00 PM',
    icon: Church,
    website: null
  },
  {
    id: 2,
    category: 'churches',
    name: 'St. John\'s Anglican Church',
    description: 'Anglican church welcoming all. Holy Communion every Sunday.',
    location: 'Victoria Street, Prieska',
    contact: '053 353 2233',
    contactPerson: 'Rev. Michael Thompson',
    meetingTimes: 'Sunday 8:30 AM, Wednesday 10:00 AM',
    icon: Church,
    website: null
  },
  {
    id: 3,
    category: 'churches',
    name: 'Prieska Methodist Church',
    description: 'Methodist congregation serving Prieska and surrounding areas.',
    location: 'Main Road, Prieska',
    contact: '053 353 3344',
    contactPerson: 'Rev. Sarah Hendricks',
    meetingTimes: 'Sunday 10:00 AM, Thursday 6:00 PM',
    icon: Church,
    website: null
  },
  {
    id: 4,
    category: 'churches',
    name: 'AGS Prieska (Apostolic Faith Mission)',
    description: 'Pentecostal church with vibrant worship and children\'s ministry.',
    location: 'Van Niekerk Street, Prieska',
    contact: '082 555 6677',
    contactPerson: 'Past. David Mokoena',
    meetingTimes: 'Sunday 9:00 AM & 6:00 PM, Tuesday 7:00 PM',
    icon: Church,
    website: null
  },
  {
    id: 5,
    category: 'churches',
    name: 'Roman Catholic Church',
    description: 'Catholic parish serving Prieska. Mass in English and Afrikaans.',
    location: 'Burger Street, Prieska',
    contact: '053 353 4455',
    contactPerson: 'Fr. Patrick O\'Brien',
    meetingTimes: 'Saturday 6:00 PM, Sunday 8:00 AM',
    icon: Church,
    website: null
  },

  // Community Service
  {
    id: 6,
    category: 'community',
    name: 'Prieska Welfare Organization',
    description: 'Providing support to vulnerable community members through food parcels, clothing, and counseling.',
    location: 'Community Hall, Victoria Street',
    contact: '072 123 4567',
    contactPerson: 'Marietjie van der Merwe',
    meetingTimes: 'First Tuesday monthly, 10:00 AM',
    icon: HandHeart,
    website: null
  },
  {
    id: 7,
    category: 'community',
    name: 'Lions Club Prieska',
    description: 'Part of Lions Clubs International. Serving the community through various projects.',
    location: 'Prieska Golf Club',
    contact: '083 456 7890',
    contactPerson: 'Pieter Botha',
    meetingTimes: 'Second Wednesday monthly, 7:00 PM',
    icon: HandHeart,
    website: null
  },
  {
    id: 8,
    category: 'community',
    name: 'Vroue Landbou Unie (VLU)',
    description: 'Women\'s agricultural union focused on community development and traditional crafts.',
    location: 'Showgrounds, Prieska',
    contact: '076 234 5678',
    contactPerson: 'Elsabe Fourie',
    meetingTimes: 'First Thursday monthly, 2:00 PM',
    icon: Flower2,
    website: null
  },

  // Sports & Recreation
  {
    id: 9,
    category: 'sports',
    name: 'Prieska Golf Club',
    description: '9-hole golf course welcoming members and visitors. Clubhouse with bar and restaurant.',
    location: 'Golf Road, Prieska',
    contact: '053 353 1234',
    contactPerson: 'Johan Venter',
    meetingTimes: 'Open daily, competitions on Saturdays',
    icon: Trophy,
    website: null
  },
  {
    id: 10,
    category: 'sports',
    name: 'Prieska Rugby Club',
    description: 'Local rugby club fielding senior and junior teams. New players always welcome.',
    location: 'Sports Grounds, Prieska',
    contact: '082 555 1234',
    contactPerson: 'Hennie Coetzee',
    meetingTimes: 'Practice Tuesdays & Thursdays 5:00 PM',
    icon: Trophy,
    website: null
  },
  {
    id: 11,
    category: 'sports',
    name: 'Prieska Tennis Club',
    description: 'Two courts available for members. Social tennis on Saturday mornings.',
    location: 'Next to Swimming Pool, Prieska',
    contact: '079 876 5432',
    contactPerson: 'Susan Jacobs',
    meetingTimes: 'Saturday mornings 8:00 AM - 12:00 PM',
    icon: Trophy,
    website: null
  },
  {
    id: 12,
    category: 'sports',
    name: 'Prieska Jukskei Club',
    description: 'Traditional Afrikaans sport. All ages welcome. Regular competitions.',
    location: 'Jukskei Courts, Showgrounds',
    contact: '082 345 6789',
    contactPerson: 'Oom Frikkie van Tonder',
    meetingTimes: 'Wednesdays 3:00 PM, Saturdays 2:00 PM',
    icon: Trophy,
    website: null
  },

  // Youth & Children
  {
    id: 13,
    category: 'youth',
    name: 'Voortrekkers Prieska',
    description: 'Youth organization focused on cultural heritage, camping, and life skills.',
    location: 'Voortrekker Hall, Prieska',
    contact: '072 987 6543',
    contactPerson: 'Annelize van Rensburg',
    meetingTimes: 'Fridays 3:00 PM - 5:00 PM',
    icon: Baby,
    website: null
  },
  {
    id: 14,
    category: 'youth',
    name: 'Prieska Scouts',
    description: 'Scouting group for boys and girls aged 7-18. Outdoor adventures and leadership.',
    location: 'Scout Hall, Die Bos area',
    contact: '083 123 4567',
    contactPerson: 'Mark Williams',
    meetingTimes: 'Mondays 4:00 PM - 6:00 PM',
    icon: Baby,
    website: null
  },

  // Seniors
  {
    id: 15,
    category: 'seniors',
    name: 'Prieska Senior Citizens Club',
    description: 'Social club for seniors with weekly activities, outings, and fellowship.',
    location: 'Community Hall, Victoria Street',
    contact: '053 353 1122',
    contactPerson: 'Sannie van der Walt',
    meetingTimes: 'Thursdays 10:00 AM - 1:00 PM',
    icon: Heart,
    website: null
  },

  // Arts & Culture
  {
    id: 16,
    category: 'arts',
    name: 'Prieska Arts Council',
    description: 'Promoting local artists, musicians, and cultural events in Prieska.',
    location: 'Library Hall, Prieska',
    contact: '076 555 1234',
    contactPerson: 'Thabo Ndlovu',
    meetingTimes: 'First Monday monthly, 6:00 PM',
    icon: Music,
    website: null
  },
  {
    id: 17,
    category: 'arts',
    name: 'Prieska Choir',
    description: 'Community choir performing at local events and festivals. New members welcome.',
    location: 'NG Kerk Hall',
    contact: '082 777 8888',
    contactPerson: 'Maria Hendricks',
    meetingTimes: 'Tuesdays 7:00 PM - 8:30 PM',
    icon: Music,
    website: null
  },

  // Social Clubs
  {
    id: 18,
    category: 'social',
    name: 'Prieska Book Club',
    description: 'Monthly book discussions. Alternating between English and Afrikaans titles.',
    location: 'Prieska Library',
    contact: '072 111 2222',
    contactPerson: 'Lizelle de Klerk',
    meetingTimes: 'Last Thursday monthly, 6:00 PM',
    icon: BookOpen,
    website: null
  },
  {
    id: 19,
    category: 'social',
    name: 'Prieska Garden Club',
    description: 'For gardening enthusiasts. Monthly meetings, plant swaps, and garden visits.',
    location: 'Various members\' gardens',
    contact: '083 222 3333',
    contactPerson: 'Ria Huysamen',
    meetingTimes: 'Second Saturday monthly, 10:00 AM',
    icon: Flower2,
    website: null
  }
]

export const getGroupsByCategory = (categoryId) => {
  if (categoryId === 'all') return communityGroups
  return communityGroups.filter(g => g.category === categoryId)
}