import { Phone, Shield, Flame, Heart, Truck, Wrench, Droplet } from 'lucide-react'

export const emergencyCategories = [
  {
    id: 'emergency',
    title: 'Emergency Services',
    icon: Shield,
    color: 'bg-red-500',
    numbers: [
      { name: 'Police (SAPS)', number: '10111', description: 'National emergency response' },
      { name: 'Ambulance', number: '10177', description: 'Medical emergencies' },
      { name: 'Fire Department', number: '053 353 5555', description: 'Prieska Fire Station' },
      { name: 'Crime Stop', number: '08600 10111', description: 'Anonymous tip-off' }
    ]
  },
  {
    id: 'medical',
    title: 'Medical & Health',
    icon: Heart,
    color: 'bg-pink-500',
    numbers: [
      { name: 'Prieska Hospital', number: '053 353 1111', description: '24-hour emergency' },
      { name: 'Ambulance (Private)', number: '082 911 2222', description: 'ER24 Prieska' },
      { name: 'Poison Information', number: '0861 555 777', description: '24/7 helpline' }
    ]
  },
  {
    id: 'municipal',
    title: 'Municipal Services',
    icon: Droplet,
    color: 'bg-blue-500',
    numbers: [
      { name: 'Municipality (Siyathemba)', number: '053 353 2000', description: 'General enquiries' },
      { name: 'Water & Sanitation', number: '053 353 2011', description: 'Report leaks/issues' },
      { name: 'Electricity Faults', number: '053 353 2022', description: 'Power outages' },
      { name: 'Roads & Stormwater', number: '053 353 2033', description: 'Report potholes' }
    ]
  },
  {
    id: 'roadside',
    title: 'Roadside Assistance',
    icon: Truck,
    color: 'bg-orange-500',
    numbers: [
      { name: 'AA Emergency', number: '0861 000 122', description: 'Breakdown assistance' },
      { name: 'GWK Fuel Station', number: '053 353 1234', description: 'Towing & tyre repair' },
      { name: 'Prieska Auto Repairs', number: '053 353 8765', description: '24/7 breakdown' }
    ]
  },
  {
    id: 'other',
    title: 'Other Important',
    icon: Phone,
    color: 'bg-gray-500',
    numbers: [
      { name: 'Childline', number: '116', description: 'Child protection' },
      { name: 'Gender-Based Violence', number: '0800 428 428', description: 'Command Centre' },
      { name: 'Tourism Information', number: '053 353 1000', description: 'Visit Prieska office' }
    ]
  }
]