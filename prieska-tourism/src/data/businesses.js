// src/data/businesses.js
import { 
  Fuel, 
  ShoppingBag, 
  Shirt, 
  Pizza, 
  Zap, 
  Shield, 
  Landmark, 
  Wrench 
} from 'lucide-react'

export const businesses = [
  // Fuel Stations
  {
    id: 1,
    name: "GWK Fuel Station",
    category: "Fuel",
    description: "Diesel and petrol available 24/7 with convenience store and clean restrooms.",
    icon: Fuel,
    location: "Main Road, Prieska"
  },
  {
    id: 2,
    name: "Engen Prieska",
    category: "Fuel",
    description: "Fuel, QuickShop, and ATM. Open daily 6am-9pm.",
    icon: Fuel,
    location: "N10 Highway"
  },

  // Retail & Shopping
  {
    id: 3,
    name: "Spar (Tieroog Mall)",
    category: "Retail",
    description: "Full-service supermarket with bakery, deli, and fresh produce.",
    icon: ShoppingBag,
    location: "Tieroog Mall, Hoof Street"
  },
  {
    id: 4,
    name: "OK Foods",
    category: "Retail",
    description: "Convenient grocery shopping with friendly local service.",
    icon: ShoppingBag,
    location: "Victoria Street"
  },
  {
    id: 5,
    name: "Usave",
    category: "Retail",
    description: "Budget-friendly groceries and household essentials.",
    icon: ShoppingBag,
    location: "Market Street"
  },
  {
    id: 6,
    name: "Foschini",
    category: "Fashion",
    description: "Ladies' fashion, accessories, and beauty products.",
    icon: Shirt,
    location: "Tieroog Mall"
  },
  {
    id: 7,
    name: "Studio 88",
    category: "Fashion",
    description: "Trendy sneakers and urban streetwear for men and women.",
    icon: Shirt,
    location: "Tieroog Mall"
  },

  // Food & Dining
  {
    id: 8,
    name: "KFC",
    category: "Food",
    description: "The Colonel's famous fried chicken, burgers, and sides.",
    icon: Pizza,
    location: "Main Road"
  },

  // Services & Security
  {
    id: 9,
    name: "Prieska Electrical",
    category: "Services",
    description: "Electrical supplies, repairs, and solar installations.",
    icon: Zap,
    location: "Church Street"
  },
  {
    id: 10,
    name: "ADT Security Prieska",
    category: "Security",
    description: "24/7 armed response, alarm monitoring, and CCTV solutions.",
    icon: Shield,
    location: "Voortrekker Street"
  },
  {
    id: 11,
    name: "Prieska Auto Repairs",
    category: "Services",
    description: "Vehicle servicing, tyre repairs, and breakdown assistance.",
    icon: Wrench,
    location: "Industrial Area"
  },
  {
    id: 12,
    name: "Standard Bank",
    category: "Finance",
    description: "ATM, deposits, and full banking services.",
    icon: Landmark,
    location: "Main Road"
  }
]

// Category colors for badges
export const categoryColors = {
  "Fuel": "bg-yellow-100 text-yellow-800",
  "Retail": "bg-blue-100 text-blue-800",
  "Fashion": "bg-pink-100 text-pink-800",
  "Food": "bg-red-100 text-red-800",
  "Services": "bg-purple-100 text-purple-800",
  "Security": "bg-green-100 text-green-800",
  "Finance": "bg-indigo-100 text-indigo-800"
}