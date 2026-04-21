// src/data/issueReporting.js
import { 
  AlertTriangle, 
  Droplet, 
  Zap, 
  Trash2, 
  Construction,  // Replace Road with Construction
  Lightbulb,
  TreePine,
  Wrench
} from 'lucide-react'

export const issueCategories = [
  { id: 'pothole', label: 'Pothole/Road Damage', icon: Construction, color: 'bg-amber-500' },
  { id: 'water', label: 'Water Leak/Pipe Burst', icon: Droplet, color: 'bg-blue-500' },
  { id: 'electricity', label: 'Power Outage', icon: Zap, color: 'bg-yellow-500' },
  { id: 'streetlight', label: 'Streetlight Not Working', icon: Lightbulb, color: 'bg-purple-500' },
  { id: 'sewage', label: 'Sewage/Blocked Drain', icon: AlertTriangle, color: 'bg-red-500' },
  { id: 'refuse', label: 'Refuse Collection', icon: Trash2, color: 'bg-green-500' },
  { id: 'tree', label: 'Overgrown Trees/Veld', icon: TreePine, color: 'bg-emerald-500' },
  { id: 'other', label: 'Other Municipal Issue', icon: Wrench, color: 'bg-gray-500' }
]

export const mockReports = [
  {
    id: 1,
    category: 'pothole',
    title: 'Large pothole on Main Road',
    description: 'Deep pothole forming near the Spar entrance. Dangerous for vehicles.',
    location: 'Main Road, outside Spar',
    status: 'reported',
    reportedBy: 'Johan V.',
    reportedDate: '2026-04-18',
    referenceNumber: 'PRK-2026-001'
  },
  {
    id: 2,
    category: 'streetlight',
    title: 'Streetlight out on Church Street',
    description: 'The streetlight at the corner of Church and Victoria has been out for a week.',
    location: 'Corner Church Street & Victoria Street',
    status: 'in-progress',
    reportedBy: 'Elsabe M.',
    reportedDate: '2026-04-15',
    referenceNumber: 'PRK-2026-002'
  },
  {
    id: 3,
    category: 'water',
    title: 'Water leak near school',
    description: 'Water running down the street from a burst pipe near Prieska Primary.',
    location: 'Andries Pretoruis Street, near school',
    status: 'resolved',
    reportedBy: 'Pieter K.',
    reportedDate: '2026-04-10',
    referenceNumber: 'PRK-2026-003'
  }
]

export const statusColors = {
  'reported': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'resolved': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
}

export const statusLabels = {
  'reported': 'Reported',
  'in-progress': 'In Progress',
  'resolved': 'Resolved'
}