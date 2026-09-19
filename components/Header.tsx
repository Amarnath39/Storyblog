'use client'

import Link from 'next/link'
import { Search, BookOpen, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-warm-gray-200 bg-ivory-50/95 backdrop-blur supports-[backdrop-filter]:bg-ivory-50/60 dark:bg-warm-gray-900/95 dark:border-warm-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-serif font-semibold text-warm-gray-900 dark:text-ivory-100">
              Storyblog
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                href="/" 
                className="text-sm text-warm-gray-600 hover:text-warm-gray-900 dark:text-warm-gray-300 dark:hover:text-ivory-100 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/stories" 
                className="text-sm text-warm-gray-600 hover:text-warm-gray-900 dark:text-warm-gray-300 dark:hover:text-ivory-100 transition-colors"
              >
                Stories
              </Link>
              <Link 
                href="/about" 
                className="text-sm text-warm-gray-600 hover:text-warm-gray-900 dark:text-warm-gray-300 dark:hover:text-ivory-100 transition-colors"
              >
                About
              </Link>
              <Link 
                href="/bookmarks" 
                className="text-sm text-warm-gray-600 hover:text-warm-gray-900 dark:text-warm-gray-300 dark:hover:text-ivory-100 transition-colors"
              >
                Bookmarks
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/stories" 
              className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full bg-sage-100 text-sage-700 hover:bg-sage-200 transition-colors text-sm font-medium"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Stories</span>
            </Link>
            <button className="p-2 rounded-full hover:bg-warm-gray-100 dark:hover:bg-warm-gray-800 transition-colors">
              <Search className="w-5 h-5 text-warm-gray-600 dark:text-warm-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
