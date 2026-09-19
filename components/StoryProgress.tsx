'use client'

import { useState, useEffect } from 'react'

interface StoryProgressProps {
  storySlug: string
}

export default function StoryProgress({ storySlug }: StoryProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(Math.min(scrollPercent, 100))
      
      localStorage.setItem(`progress-${storySlug}`, scrollPercent.toString())
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [storySlug])

  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress-${storySlug}`)
    if (savedProgress) {
      const progressValue = parseFloat(savedProgress)
      setProgress(progressValue)
      
      if (progressValue > 0 && progressValue < 100) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPosition = (progressValue / 100) * docHeight
        window.scrollTo(0, scrollPosition)
      }
    }
  }, [storySlug])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-warm-gray-200 dark:bg-warm-gray-700">
      <div 
        className="h-full bg-sage-600 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
