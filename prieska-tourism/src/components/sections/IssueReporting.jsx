// src/components/sections/IssueReporting.jsx
import { useState } from 'react'
import { mockReports, issueCategories, statusColors, statusLabels } from '../../data/issueReporting'
import { MapPin, Clock, User, Hash, Plus, CheckCircle2, Clock3, AlertCircle } from 'lucide-react'
import ReportIssueModal from '../ui/ReportIssueModal'

const IssueReporting = () => {
  const [showReportModal, setShowReportModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredReports = mockReports.filter(report => {
    const categoryMatch = selectedCategory === 'all' || report.category === selectedCategory
    const statusMatch = selectedStatus === 'all' || report.status === selectedStatus
    return categoryMatch && statusMatch
  })

  const getCategoryIcon = (categoryId) => {
    const category = issueCategories.find(c => c.id === categoryId)
    return category?.icon || AlertCircle
  }

  const getCategoryLabel = (categoryId) => {
    const category = issueCategories.find(c => c.id === categoryId)
    return category?.label || categoryId
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'reported': return <Clock3 className="w-3.5 h-3.5" />
      case 'in-progress': return <AlertCircle className="w-3.5 h-3.5" />
      case 'resolved': return <CheckCircle2 className="w-3.5 h-3.5" />
      default: return <Clock3 className="w-3.5 h-3.5" />
    }
  }

  const statuses = [
    { id: 'all', label: 'All Status' },
    { id: 'reported', label: 'Reported' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'resolved', label: 'Resolved' }
  ]

  return (
    <div className="space-y-4">
      {/* Header with Report Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Report potholes, water leaks, and other municipal issues
        </p>
        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center gap-1.5 bg-prieska-terracotta text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition"
        >
          <Plus className="w-4 h-4" />
          Report Issue
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {mockReports.filter(r => r.status === 'reported').length}
          </p>
          <p className="text-[10px] text-yellow-700 dark:text-yellow-300">Reported</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {mockReports.filter(r => r.status === 'in-progress').length}
          </p>
          <p className="text-[10px] text-blue-700 dark:text-blue-300">In Progress</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {mockReports.filter(r => r.status === 'resolved').length}
          </p>
          <p className="text-[10px] text-green-700 dark:text-green-300">Resolved</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
              selectedCategory === 'all'
                ? 'bg-prieska-terracotta text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All Categories
          </button>
          {issueCategories.slice(0, 4).map(cat => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  selectedCategory === cat.id
                    ? 'bg-prieska-terracotta text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-1.5">
          {statuses.map(status => (
            <button
              key={status.id}
              onClick={() => setSelectedStatus(status.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                selectedStatus === status.id
                  ? 'bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-800'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {filteredReports.map(report => {
          const CategoryIcon = getCategoryIcon(report.category)
          
          return (
            <div 
              key={report.id} 
              className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                  <CategoryIcon className="w-4 h-4 text-prieska-terracotta" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                      {report.title}
                    </h4>
                    <span className={`flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusColors[report.status]}`}>
                      {getStatusIcon(report.status)}
                      {statusLabels[report.status]}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-xs mt-1 line-clamp-2">
                    {report.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[10px] text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {report.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {report.reportedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {report.reportedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      {report.referenceNumber}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredReports.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
          No reports match your filters.
        </p>
      )}

      {/* Report Issue Modal */}
      <ReportIssueModal 
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </div>
  )
}

export default IssueReporting