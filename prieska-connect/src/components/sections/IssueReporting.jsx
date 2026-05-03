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

  const getCategoryLabel = (categoryId) => {
    const category = issueCategories.find(c => c.id === categoryId)
    return category?.label || categoryId
  }

  const getCategoryIcon = (categoryId) => {
    const category = issueCategories.find(c => c.id === categoryId)
    return category?.icon || AlertCircle
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
      {/* Report Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Report potholes, water leaks, and other municipal issues
        </p>
        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center gap-1.5 bg-prieska-terracotta text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-opacity-90 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Report Issue
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-yellow-200 dark:border-yellow-800">
          <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
            {mockReports.filter(r => r.status === 'reported').length}
          </p>
          <p className="text-[10px] text-yellow-700 dark:text-yellow-300">Reported</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-blue-200 dark:border-blue-800">
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {mockReports.filter(r => r.status === 'in-progress').length}
          </p>
          <p className="text-[10px] text-blue-700 dark:text-blue-300">In Progress</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-green-200 dark:border-green-800">
          <p className="text-xl font-bold text-green-600 dark:text-green-400">
            {mockReports.filter(r => r.status === 'resolved').length}
          </p>
          <p className="text-[10px] text-green-700 dark:text-green-300">Resolved</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              selectedCategory === 'all'
                ? 'bg-prieska-terracotta text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-prieska-terracotta'
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-prieska-terracotta text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-prieska-terracotta'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            )
          })}
        </div>

        <div className="flex gap-1.5 overflow-x-auto">
          {statuses.map(status => (
            <button
              key={status.id}
              onClick={() => setSelectedStatus(status.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                selectedStatus === status.id
                  ? 'bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-800'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
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
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <CategoryIcon className="w-4 h-4 text-prieska-terracotta" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                      {report.title}
                    </h4>
                    <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[report.status]}`}>
                      {getStatusIcon(report.status)}
                      {statusLabels[report.status]}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-xs mb-2">
                    {report.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-gray-500 dark:text-gray-400">
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