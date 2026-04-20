// src/data/vacancies.js
import { Briefcase, Wrench, Users, Truck, Shield, Coffee } from 'lucide-react'

export const vacancies = [
  {
    id: 1,
    title: "Diesel Mechanic",
    company: "GWK Fuel Station",
    location: "Main Road, Prieska",
    type: "Full-time",
    description: "Experienced diesel mechanic needed for fleet maintenance and repairs. Must have relevant qualifications and at least 3 years experience.",
    postedDate: "2025-04-10",
    icon: Wrench,
    contactPhone: "053 353 1234",
    contactEmail: "jobs@gwkprieska.co.za"
  },
  {
    id: 2,
    title: "Retail Sales Assistant",
    company: "Foschini",
    location: "Tieroog Mall, Prieska",
    type: "Part-time",
    description: "Customer-focused sales assistant for ladies' fashion store. Retail experience preferred. Must be available weekends.",
    postedDate: "2025-04-12",
    icon: Users,
    contactPhone: "053 353 5678",
    contactEmail: "careers@foschini.co.za"
  },
  {
    id: 3,
    title: "Security Officer",
    company: "ADT Security Prieska",
    location: "Voortrekker Street, Prieska",
    type: "Full-time",
    description: "Grade C registered security officer needed for patrol and response duties. Valid driver's license and clean criminal record required.",
    postedDate: "2025-04-08",
    icon: Shield,
    contactPhone: "053 353 9876",
    contactEmail: "hr@adtprieska.co.za"
  },
  {
    id: 4,
    title: "General Worker",
    company: "Prieska Electrical",
    location: "Church Street, Prieska",
    type: "Contract",
    description: "General assistance with electrical installations and site cleanup. No experience necessary, training provided.",
    postedDate: "2025-04-15",
    icon: Briefcase,
    contactPhone: "053 353 2468",
    contactEmail: "info@prieskaelectrical.co.za"
  },
  {
    id: 5,
    title: "Delivery Driver",
    company: "Spar Tieroog Mall",
    location: "Hoof Street, Prieska",
    type: "Full-time",
    description: "Valid Code 10 driver's license with PDP required. Responsible for local deliveries and stock handling.",
    postedDate: "2025-04-14",
    icon: Truck,
    contactPhone: "053 353 1357",
    contactEmail: "hr@sparprieska.co.za"
  },
  {
    id: 6,
    title: "Kitchen Staff",
    company: "KFC Prieska",
    location: "Main Road, Prieska",
    type: "Part-time",
    description: "Food preparation and kitchen hygiene. Fast-paced environment, training provided. Must be reliable.",
    postedDate: "2025-04-11",
    icon: Coffee,
    contactPhone: "053 353 4321",
    contactEmail: "jobs@kfcprieska.co.za"
  }
]

// Helper to format relative time (e.g., "2 days ago")
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