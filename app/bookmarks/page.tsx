'use client'

import { useState, useEffect } from 'react'
import StoryCard from '@/components/StoryCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Bookmark as BookmarkIcon } from 'lucide-react'

interface Story {
  slug: string
  title: string
  description: string
  author: string
  genre: string
  readingTime: string
  cover: string
  ambience: string | null
  featured: boolean
  content: string
}

export default function BookmarksPage() {
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([])
  const [allStories, setAllStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('bookmarks')
    if (saved) {
      setBookmarkedSlugs(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    async function fetchStories() {
      try {
        const response = await fetch('/api/stories')
        const stories = await response.json()
        setAllStories(stories)
      } catch (error) {
        console.error('Failed to fetch stories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStories()
  }, [])

  const bookmarkedStories = allStories.filter(story =>
    bookmarkedSlugs.includes(story.slug)
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-ivory-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-warm-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <BookmarkIcon className="w-8 h-8 mr-3 text-sage-600" />
                Your Bookmarks
              </h1>
              <p className="text-lg text-warm-gray-600 dark:text-gray-400">
                Stories you've saved for later
              </p>
            </div>

            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-600 mx-auto"></div>
                <p className="mt-4 text-warm-gray-600 dark:text-gray-400">Loading your bookmarks...</p>
              </div>
            ) : bookmarkedStories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bookmarkedStories.map((story) => (
                  <StoryCard key={story.slug} story={story} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-sage-100 dark:bg-sage-900/50 mx-auto mb-6 flex items-center justify-center">
                  <BookmarkIcon className="w-10 h-10 text-sage-400" />
                </div>
                <h2 className="text-2xl font-serif font-semibold text-warm-gray-900 dark:text-gray-100 mb-4">
                  No bookmarks yet
                </h2>
                <p className="text-warm-gray-600 dark:text-gray-400 mb-8">
                  Start bookmarking stories you love to build your personal collection.
                </p>
                <a
                  href="/stories"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-sage-600 text-white hover:bg-sage-700 transition-colors font-medium"
                >
                  Browse Stories
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
