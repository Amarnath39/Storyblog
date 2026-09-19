'use client'

import { useState, useMemo } from 'react'
import StoryCard from '@/components/StoryCard'
import { Search, Filter, Headphones } from 'lucide-react'

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

interface StoriesFilterProps {
  stories: Story[]
  genres: string[]
}

export default function StoriesFilter({ stories, genres }: StoriesFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const [filter, setFilter] = useState<'all' | 'featured' | 'ambience'>('all')

  const filteredStories = useMemo(() => {
    let filtered = stories

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase()
      filtered = filtered.filter(story => 
        story.title.toLowerCase().includes(lowerQuery) ||
        story.description.toLowerCase().includes(lowerQuery) ||
        story.genre.toLowerCase().includes(lowerQuery) ||
        story.author.toLowerCase().includes(lowerQuery)
      )
    }

    if (selectedGenre !== 'all') {
      filtered = filtered.filter(story => 
        story.genre.toLowerCase() === selectedGenre.toLowerCase()
      )
    }

    if (filter === 'featured') {
      filtered = filtered.filter(story => story.featured)
    } else if (filter === 'ambience') {
      filtered = filtered.filter(story => story.ambience)
    }

    return filtered
  }, [searchQuery, selectedGenre, filter, stories])

  return (
    <>
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-gray-400" />
          <input
            type="text"
            placeholder="Search stories by title, description, genre, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-warm-gray-200 bg-ivory-100 text-warm-gray-900 placeholder-warm-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-500 dark:border-warm-gray-700 dark:bg-warm-gray-800 dark:text-ivory-100 dark:placeholder-warm-gray-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Genre Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-warm-gray-500" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-2 rounded-lg border border-warm-gray-200 bg-ivory-100 text-warm-gray-900 focus:outline-none focus:ring-2 focus:ring-sage-500 dark:border-warm-gray-700 dark:bg-warm-gray-800 dark:text-ivory-100"
            >
              <option value="all">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Filters */}
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-sage-600 text-ivory-100'
                : 'bg-ivory-100 text-warm-gray-700 hover:bg-warm-gray-200 dark:bg-warm-gray-800 dark:text-warm-gray-300 dark:hover:bg-warm-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'featured'
                ? 'bg-sage-600 text-ivory-100'
                : 'bg-ivory-100 text-warm-gray-700 hover:bg-warm-gray-200 dark:bg-warm-gray-800 dark:text-warm-gray-300 dark:hover:bg-warm-gray-700'
            }`}
          >
            Featured
          </button>
          <button
            onClick={() => setFilter('ambience')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              filter === 'ambience'
                ? 'bg-sage-600 text-ivory-100'
                : 'bg-ivory-100 text-warm-gray-700 hover:bg-warm-gray-200 dark:bg-warm-gray-800 dark:text-warm-gray-300 dark:hover:bg-warm-gray-700'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>With Ambience</span>
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm text-warm-gray-600 dark:text-warm-gray-400">
        {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
      </div>

      {/* Stories Grid */}
      {filteredStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-warm-gray-600 dark:text-warm-gray-400">
            No stories found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedGenre('all')
              setFilter('all')
            }}
            className="mt-4 text-sage-600 hover:text-sage-700 dark:text-sage-400 dark:hover:text-sage-300 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </>
  )
}
