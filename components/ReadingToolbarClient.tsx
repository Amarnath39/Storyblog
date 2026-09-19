'use client'

import { useState, useEffect } from 'react'
import { Plus, Minus, RotateCcw, Bookmark, Share2, Sun, Moon, Palette } from 'lucide-react'

interface ReadingToolbarClientProps {
  storySlug: string
}

export default function ReadingToolbarClient({ storySlug }: ReadingToolbarClientProps) {
  const [fontSize, setFontSize] = useState(18)
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>('light')
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize')
    const savedTheme = localStorage.getItem('readingTheme')
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    
    if (savedFontSize) setFontSize(parseInt(savedFontSize))
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark' | 'sepia')
      document.documentElement.classList.remove('dark', 'sepia')
      if (savedTheme === 'dark') document.documentElement.classList.add('dark')
      if (savedTheme === 'sepia') document.documentElement.classList.add('sepia')
    }
    setIsBookmarked(bookmarks.includes(storySlug))
  }, [storySlug])

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 2, 28)
    setFontSize(newSize)
    localStorage.setItem('fontSize', newSize.toString())
    document.documentElement.style.setProperty('--reading-font-size', `${newSize}px`)
  }

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 2, 14)
    setFontSize(newSize)
    localStorage.setItem('fontSize', newSize.toString())
    document.documentElement.style.setProperty('--reading-font-size', `${newSize}px`)
  }

  const resetFontSize = () => {
    setFontSize(18)
    localStorage.setItem('fontSize', '18')
    document.documentElement.style.setProperty('--reading-font-size', '18px')
  }

  const setThemeMode = (newTheme: 'light' | 'dark' | 'sepia') => {
    setTheme(newTheme)
    localStorage.setItem('readingTheme', newTheme)
    document.documentElement.classList.remove('dark', 'sepia')
    if (newTheme === 'dark') document.documentElement.classList.add('dark')
    if (newTheme === 'sepia') document.documentElement.classList.add('sepia')
  }

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    if (isBookmarked) {
      const newBookmarks = bookmarks.filter((slug: string) => slug !== storySlug)
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks))
      setIsBookmarked(false)
    } else {
      bookmarks.push(storySlug)
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
      setIsBookmarked(true)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Share failed:', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="sticky top-16 z-40 bg-ivory-50/95 backdrop-blur border-b border-warm-gray-200 dark:bg-warm-gray-900/95 dark:border-warm-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={decreaseFontSize}
              className="p-2 rounded-lg hover:bg-warm-gray-200 dark:hover:bg-warm-gray-800 transition-colors"
              aria-label="Decrease font size"
              title="Decrease font size"
            >
              <Minus className="w-4 h-4 text-warm-gray-600 dark:text-warm-gray-300" />
            </button>
            <span className="text-sm text-warm-gray-600 dark:text-warm-gray-400 w-8 text-center">
              {fontSize}
            </span>
            <button
              onClick={increaseFontSize}
              className="p-2 rounded-lg hover:bg-warm-gray-200 dark:hover:bg-warm-gray-800 transition-colors"
              aria-label="Increase font size"
              title="Increase font size"
            >
              <Plus className="w-4 h-4 text-warm-gray-600 dark:text-warm-gray-300" />
            </button>
            <button
              onClick={resetFontSize}
              className="p-2 rounded-lg hover:bg-warm-gray-200 dark:hover:bg-warm-gray-800 transition-colors"
              aria-label="Reset font size"
              title="Reset font size"
            >
              <RotateCcw className="w-4 h-4 text-warm-gray-600 dark:text-warm-gray-300" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setThemeMode('light')}
              className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'bg-sage-100 text-sage-700 dark:bg-sage-900 dark:text-sage-300' : 'hover:bg-warm-gray-200 dark:hover:bg-warm-gray-800 text-warm-gray-600 dark:text-warm-gray-300'}`}
              aria-label="Light theme"
              title="Light theme"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setThemeMode('sepia')}
              className={`p-2 rounded-lg transition-colors ${theme === 'sepia' ? 'bg-sage-100 text-sage-700 dark:bg-sage-900 dark:text-sage-300' : 'hover:bg-warm-gray-200 dark:hover:bg-warm-gray-800 text-warm-gray-600 dark:text-warm-gray-300'}`}
              aria-label="Sepia theme"
              title="Sepia theme"
            >
              <Palette className="w-4 h-4" />
            </button>
            <button
              onClick={() => setThemeMode('dark')}
              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-sage-100 text-sage-700 dark:bg-sage-900 dark:text-sage-300' : 'hover:bg-warm-gray-200 dark:hover:bg-warm-gray-800 text-warm-gray-600 dark:text-warm-gray-300'}`}
              aria-label="Dark theme"
              title="Dark theme"
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'bg-sage-100 text-sage-700 dark:bg-sage-900 dark:text-sage-300' : 'hover:bg-warm-gray-200 dark:hover:bg-warm-gray-800 text-warm-gray-600 dark:text-warm-gray-300'}`}
              aria-label="Bookmark"
              title="Bookmark"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-warm-gray-200 dark:hover:bg-warm-gray-800 transition-colors"
              aria-label="Share"
              title="Share"
            >
              <Share2 className="w-4 h-4 text-warm-gray-600 dark:text-warm-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
