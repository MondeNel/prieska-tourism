// src/components/ui/skeletons/NewsSkeleton.jsx
import Skeleton from '../Skeleton'

export const FeaturedNewsSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
      <Skeleton className="w-full h-44 md:h-56 lg:h-64" />
      <div className="p-4 md:p-6">
        <Skeleton className="h-3 w-20 mb-3" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  )
}

export const SideNewsSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden flex flex-col sm:flex-row lg:flex-col">
      <Skeleton className="w-full sm:w-1/3 lg:w-full h-24 md:h-32" />
      <div className="p-3 md:p-4">
        <Skeleton className="h-3 w-16 mb-2" />
        <Skeleton className="h-5 w-full mb-1" />
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}

const NewsSkeleton = () => {
  return (
    <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      <div className="mb-8 md:mb-12 text-center">
        <Skeleton className="h-4 w-32 mx-auto mb-2" />
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-1 w-16 mx-auto mt-3" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <FeaturedNewsSkeleton />
        </div>
        <div className="space-y-4 md:space-y-6">
          <SideNewsSkeleton />
          <SideNewsSkeleton />
        </div>
      </div>
    </section>
  )
}

export default NewsSkeleton