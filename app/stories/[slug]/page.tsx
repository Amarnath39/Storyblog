import { getStoryBySlug, getAllStories } from '@/lib/stories'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StoryProgress from '@/components/StoryProgress'
import ReadingToolbarClient from '@/components/ReadingToolbarClient'
import StoryAudioManager from '@/components/StoryAudioManager'
import StoryContent from '@/components/StoryContent'
import { Clock, User, Headphones } from 'lucide-react'

interface StoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const stories = getAllStories()
  return stories.map((story) => ({
    slug: story.slug,
  }))
}

export async function generateMetadata({ params }: StoryPageProps) {
  const { slug } = await params
  const story = getStoryBySlug(slug)
  
  if (!story) {
    return {
      title: 'Story Not Found',
    }
  }

  return {
    title: story.title,
    description: story.description,
    openGraph: {
      title: story.title,
      description: story.description,
      images: [story.cover],
    },
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params
  const story = getStoryBySlug(slug)

  if (!story) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <StoryProgress storySlug={story.slug} />
      <Header />
      
      <main className="flex-1">
        <StoryAudioManager storyAmbience={story.ambience} />
        <ReadingToolbarClient storySlug={story.slug} />
        
        {/* Story Header */}
        <section className="bg-ivory-100 dark:bg-warm-gray-800 border-b border-warm-gray-200 dark:border-warm-gray-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                {story.cover && (
                  <div className="aspect-[3/2] overflow-hidden rounded-lg bg-warm-gray-200 dark:bg-warm-gray-700 mb-8">
                    <img
                      src={story.cover}
                      alt={story.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-warm-gray-600 dark:text-warm-gray-400">
                    <span className="rounded-full bg-sage-100 px-3 py-1 text-sage-700 dark:bg-sage-900 dark:text-sage-300">
                      {story.genre}
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {story.readingTime}
                    </span>
                    {story.ambience && (
                      <span className="flex items-center" title="Has ambience">
                        <Headphones className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-warm-gray-900 dark:text-ivory-100">
                    {story.title}
                  </h1>
                  
                  <p className="text-xl text-warm-gray-600 dark:text-warm-gray-300">
                    {story.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-warm-gray-500 dark:text-warm-gray-400">
                    <User className="mr-2 h-4 w-4" />
                    <span>by {story.author}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Content */}
        <section className="bg-ivory-50 dark:bg-warm-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <article className="max-w-2xl mx-auto lg:max-w-[740px]">
              <StoryContent content={story.content} />
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
