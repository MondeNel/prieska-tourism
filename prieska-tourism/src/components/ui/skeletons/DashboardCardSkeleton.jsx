// src/components/ui/skeletons/DashboardCardSkeleton.jsx
import Skeleton from '../Skeleton'

const DashboardCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <Skeleton className="w-10 h-10 rounded-xl mb-3" />
      <Skeleton className="h-4 w-24 mb-1" />
      <Skeleton className="h-3 w-32" />
    </div>
  )
}

export default DashboardCardSkeleton