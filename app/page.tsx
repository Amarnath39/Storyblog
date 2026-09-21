import Link from 'next/link'
import { getFeaturedStories, getAllStories } from '@/lib/stories'
import StoryCard from '@/components/StoryCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { BookOpen, Sparkles } from 'lucide-react'

export default function Home() {
  const featuredStories = getFeaturedStories()
  const allStories = getAllStories()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-ivory-100 to-ivory-50 dark:from-gray-900 dark:to-gray-950 py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-full bg-sage-100 dark:bg-sage-900/50">
                  <Sparkles className="w-8 h-8 text-sage-600 dark:text-sage-400" />
                </div>
              </div>
              <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-warm-gray-900 dark:text-gray-100 leading-tight">
                Stories worth getting lost in.
              </h1>
              <p className="mb-8 text-lg sm:text-xl text-warm-gray-700 dark:text-gray-300">
                A quiet place for stories, imagination, and words.
              </p>
              <Link
                href="/stories"
                className="inline-flex items-center space-x-2 px-8 py-3 rounded-full bg-sage-600 text-white hover:bg-sage-700 transition-colors font-medium"
              >
                <BookOpen className="w-5 h-5" />
                <span>Explore Stories</span>
              </Link>
            </div>
          </div>

          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')]"></div>
          </div>
        </section>

        {/* Featured Stories */}
        {featuredStories.length > 0 && (
          <section className="py-16 sm:py-24 bg-ivory-50 dark:bg-gray-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-warm-gray-900 dark:text-gray-100 mb-4">
                  Featured Stories
                </h2>
                <p className="text-warm-gray-700 dark:text-gray-400">
                  Hand-picked tales to begin your journey
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredStories.map((story) => (
                  <StoryCard key={story.slug} story={story} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Stories Preview */}
        {allStories.length > 0 && (
          <section className="py-16 sm:py-24 bg-ivory-100 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12 flex justify-between items-end">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-warm-gray-900 dark:text-gray-100 mb-4">
                    All Stories
                  </h2>
                  <p className="text-warm-gray-700 dark:text-gray-400">
                    Browse the complete collection
                  </p>
                </div>
                <Link
                  href="/stories"
                  className="hidden sm:inline-flex items-center text-sage-600 hover:text-sage-700 dark:text-sage-400 dark:hover:text-sage-300 font-medium transition-colors"
                >
                  View all stories →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allStories.slice(0, 6).map((story) => (
                  <StoryCard key={story.slug} story={story} />
                ))}
              </div>

              <div className="mt-12 text-center sm:hidden">
                <Link
                  href="/stories"
                  className="inline-flex items-center text-sage-600 hover:text-sage-700 dark:text-sage-400 dark:hover:text-sage-300 font-medium transition-colors"
                >
                  View all stories →
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
