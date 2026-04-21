// src/data/localNews.js
import { 
  Newspaper, 
  Trophy, 
  Building2, 
  Users, 
  Heart,
  GraduationCap,
  Landmark,
  Calendar
} from 'lucide-react'

export const newsCategories = [
  { id: 'all', label: 'All News', icon: Newspaper },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'sports', label: 'Sports', icon: Trophy },
  { id: 'business', label: 'Business', icon: Building2 },
  { id: 'schools', label: 'Schools', icon: GraduationCap },
  { id: 'municipal', label: 'Municipal', icon: Landmark },
  { id: 'events', label: 'Events', icon: Calendar }
]

export const newsArticles = [
  {
    id: 1,
    category: 'sports',
    title: 'Hoërskool Prieska Cricket Team Reaches SA20 Schools Final',
    excerpt: 'The local high school cricket team has made the town proud by reaching the finals of the Northern Cape Switch Schools SA20 competition, showcasing young talent from the region.',
    content: 'In a thrilling semi-final match played in Kimberley, Hoërskool Prieska defeated their opponents by 23 runs. Captain Janco Venter led from the front with a magnificent 67 not out. The team now advances to the provincial finals to be held next month. "This is a massive achievement for our small town," said coach Pieter van der Merwe. "The boys have worked incredibly hard and deserve this moment." The community is rallying behind the team with local businesses offering sponsorships for travel and equipment.',
    location: 'Prieska',
    author: 'Sport Desk',
    publishedDate: '2026-04-20',
    readTime: '3 min read',
    image: null,
    featured: true,
    tags: ['cricket', 'schools', 'youth']
  },
  {
    id: 2,
    category: 'business',
    title: 'New Coffee Shop Opens on Main Road',
    excerpt: 'Prieska welcomes "Die Koffiekan," a charming new coffee shop offering artisanal brews and homemade treats in the heart of town.',
    content: 'After months of renovation, the historic building on Main Road has been transformed into Die Koffiekan, Prieska\'s newest gathering spot. Owner Marietjie van Wyk, who returned to her hometown after 15 years in Cape Town, says she wanted to bring a taste of city coffee culture to the Karoo. "We source our beans from a local roaster in Kimberley and our pastries are baked fresh daily," she explains. The shop employs four local staff members and has already become a popular meeting spot for community groups. Opening hours are Monday to Saturday, 7am to 5pm.',
    location: 'Main Road, Prieska',
    author: 'Business Reporter',
    publishedDate: '2026-04-18',
    readTime: '2 min read',
    image: null,
    featured: false,
    tags: ['business', 'food', 'local']
  },
  {
    id: 3,
    category: 'municipal',
    title: 'Siyathemba Municipality Announces Water Infrastructure Upgrade',
    excerpt: 'A major water infrastructure project is set to begin next month, promising improved water supply reliability for Prieska residents.',
    content: 'The Siyathemba Municipality has secured funding for a R12 million water infrastructure upgrade project. The work will include replacing aging pipelines, upgrading the water treatment facility, and installing new bulk water meters. Municipal spokesperson Thabo Mokoena confirmed that construction will begin in May and is expected to take approximately eight months. "Residents may experience temporary water interruptions during the upgrade, but we will provide notice of planned outages," Mokoena said. The project is part of the municipality\'s long-term service delivery improvement plan.',
    location: 'Prieska',
    author: 'Municipal Correspondent',
    publishedDate: '2026-04-15',
    readTime: '4 min read',
    image: null,
    featured: true,
    tags: ['municipality', 'water', 'infrastructure']
  },
  {
    id: 4,
    category: 'community',
    title: 'Prieska Senior Citizens Enjoy Annual Spring Tea',
    excerpt: 'Over 50 senior citizens gathered at the community hall for the annual spring tea, an event filled with laughter, music, and fellowship.',
    content: 'The Prieska Welfare Organization hosted its beloved annual spring tea on Saturday, welcoming seniors from across the district. Guests were treated to an array of homemade cakes, sandwiches, and tea served by volunteers from the local high school. Entertainment was provided by the Prieska Primary School choir, who performed traditional Afrikaans folk songs. "This event is the highlight of our year," said attendee Ouma Sannie, 78. "It\'s wonderful to see old friends and meet new people." The welfare organization thanked all sponsors who made the event possible, including Spar Tieroog Mall and OK Foods.',
    location: 'Community Hall, Victoria Street',
    author: 'Community Reporter',
    publishedDate: '2026-04-12',
    readTime: '2 min read',
    image: null,
    featured: false,
    tags: ['community', 'seniors', 'events']
  },
  {
    id: 5,
    category: 'schools',
    title: 'Gariep High School Launches Computer Literacy Programme',
    excerpt: 'Gariep High School has introduced a new computer literacy programme aimed at equipping learners with essential digital skills.',
    content: 'In response to the growing demand for digital skills in the workplace, Gariep High School has launched a computer literacy programme for Grade 10 and 11 learners. The programme, developed in partnership with a national education NGO, provides hands-on training in Microsoft Office, basic coding, and internet safety. Principal Mrs. Jacobs expressed her excitement: "This initiative will give our learners a competitive edge when they enter the job market or pursue further studies. We are grateful for the donation of 20 computers from a private donor in Kimberley." The programme runs every Tuesday and Thursday afternoon.',
    location: 'Gariep High School',
    author: 'Education Reporter',
    publishedDate: '2026-04-10',
    readTime: '3 min read',
    image: null,
    featured: false,
    tags: ['schools', 'education', 'technology']
  },
  {
    id: 6,
    category: 'community',
    title: 'Local Artist Donates Mural to Prieska Library',
    excerpt: 'A vibrant new mural celebrating Prieska\'s heritage now adorns the entrance of the Prieska Public Library.',
    content: 'Local artist Thabo Ndlovu has donated a stunning mural to the Prieska Public Library, depicting scenes from the town\'s history and natural beauty. The 4-metre wide artwork features the Orange River, the Tiger\'s Eye Fort, and indigenous aloes in full bloom. "I wanted to create something that would inspire young people and remind everyone of our rich heritage," Ndlovu explained at the unveiling ceremony. The project took three weeks to complete and was funded through donations from community members. Library manager Susan Hendricks expressed her gratitude: "This beautiful artwork transforms our entrance and welcomes visitors with a true sense of place."',
    location: 'Prieska Library',
    author: 'Arts & Culture Reporter',
    publishedDate: '2026-04-05',
    readTime: '3 min read',
    image: null,
    featured: true,
    tags: ['arts', 'community', 'heritage']
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

export const getFeaturedArticles = (limit = 3) => {
  return newsArticles
    .filter(a => a.featured)
    .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
    .slice(0, limit)
}

export const getLatestArticles = (limit = 6) => {
  return [...newsArticles]
    .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
    .slice(0, limit)
}