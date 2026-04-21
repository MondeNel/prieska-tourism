// src/components/ui/WithLoading.jsx
import { useState, useEffect } from 'react'

const WithLoading = ({ children, skeleton: SkeletonComponent, delay = 0 }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (isLoading) {
    return <SkeletonComponent />
  }

  return children
}

export default WithLoading