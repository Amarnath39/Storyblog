import { getAllStories, getAllGenres } from '@/lib/stories'
import StoriesFilter from '@/components/StoriesFilter'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function StoriesPage() {
  const allStories = getAllStories()
  const genres = getAllGenres()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-ivory-50 dark:bg-warm-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-warm-gray-900 dark:text-ivory-100 mb-4">
              All Stories
            </h1>
            <p className="text-lg text-warm-gray-600 dark:text-warm-gray-400">
              Discover tales across every genre
            </p>
          </div>

          <StoriesFilter stories={allStories} genres={genres} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
