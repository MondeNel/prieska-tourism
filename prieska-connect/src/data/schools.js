// src/data/schools.js
import { School, GraduationCap, Phone, Mail } from 'lucide-react'

export const primarySchools = [
  {
    id: 1,
    name: "Prieska Primêre Skool",
    category: "Primary School",
    description: "Public primary school serving the Prieska community.",
    icon: School,
    location: "Andries Pretoruis Street, Prieska, 8940",
    phone: "053 353 1651",
    email: null,
    website: null
  },
  {
    id: 2,
    name: "R.D. Williams Primary School",
    category: "Primary School",
    description: "Public primary school offering quality education.",
    icon: School,
    location: "Burger Street, Prieska, 8940",
    phone: "053 353 1087",
    email: null,
    website: null
  },
  {
    id: 3,
    name: "JJ Dreyer Primêre Skool",
    category: "Primary School",
    description: "Public primary school located in Mans Street, Prieska.",
    icon: School,
    location: "Mans Street, Prieska, 8940",
    phone: "053 353 1438",
    email: null,
    website: null
  }
]

export const highSchools = [
  {
    id: 4,
    name: "Gariep High School",
    category: "High School",
    description: "Public secondary school offering Grades 8-12.",
    icon: GraduationCap,
    location: "Burger Street, Prieska, 8940",
    phone: "053 353 1293",
    email: null,
    website: null
  },
  {
    id: 5,
    name: "Hoërskool Prieska",
    category: "High School",
    description: "Combined school providing quality education in Prieska.",
    icon: GraduationCap,
    location: "347 Van Niekerk Street, Prieska, 8940",
    phone: "053 353 3245",
    phoneAlt: "053 353 3507",
    whatsapp: "053 353 1167",
    email: null,
    website: null
  }
]

export const allSchools = [...primarySchools, ...highSchools]