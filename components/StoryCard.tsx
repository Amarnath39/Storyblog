import Link from 'next/link'
import Image from 'next/image'
import { Clock, Headphones } from 'lucide-react'
import { Story } from '@/lib/stories'

interface StoryCardProps {
  story: Story
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Link href={`/stories/${story.slug}`} className="group">
      <article className="overflow-hidden rounded-lg border border-warm-gray-200 bg-ivory-100 shadow-sm transition-all hover:shadow-md dark:border-warm-gray-700 dark:bg-warm-gray-800">
        <div className="aspect-[3/2] overflow-hidden bg-warm-gray-200 dark:bg-warm-gray-700">
          {story.cover ? (
            <Image
              src={story.cover}
              alt={story.title}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-sage-100 dark:bg-sage-900">
              <span className="text-4xl">📖</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="mb-3 flex items-center space-x-2 text-xs text-warm-gray-500 dark:text-warm-gray-400">
            <span className="rounded-full bg-sage-100 px-2 py-1 text-sage-700 dark:bg-sage-900 dark:text-sage-300">
              {story.genre}
            </span>
            <span className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {story.readingTime}
            </span>
            {story.ambience && (
              <span className="flex items-center" title="Has ambience">
                <Headphones className="h-3 w-3" />
              </span>
            )}
          </div>
          <h3 className="mb-2 text-xl font-serif font-semibold text-warm-gray-900 dark:text-ivory-100 group-hover:text-sage-600 dark:group-hover:text-sage-400 transition-colors">
            {story.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-warm-gray-600 dark:text-warm-gray-300">
            {story.description}
          </p>
          <p className="text-xs text-warm-gray-500 dark:text-warm-gray-400">
            by {story.author}
          </p>
        </div>
      </article>
    </Link>
  )
}
