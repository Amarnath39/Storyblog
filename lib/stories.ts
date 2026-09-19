import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const storiesDirectory = path.join(process.cwd(), 'content/stories')

export interface Story {
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

export function getAllStories(): Story[] {
  if (!fs.existsSync(storiesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(storiesDirectory)
  const allStoriesData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(storiesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        author: data.author || '',
        genre: data.genre || '',
        readingTime: data.readingTime || '',
        cover: data.cover || '',
        ambience: data.ambience || null,
        featured: data.featured || false,
        content,
      } as Story
    })

  return allStoriesData
}

export function getStoryBySlug(slug: string): Story | null {
  try {
    const fullPath = path.join(storiesDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      author: data.author || '',
      genre: data.genre || '',
      readingTime: data.readingTime || '',
      cover: data.cover || '',
      ambience: data.ambience || null,
      featured: data.featured || false,
      content,
    } as Story
  } catch (error) {
    return null
  }
}

export function getFeaturedStories(): Story[] {
  return getAllStories().filter((story) => story.featured)
}

export function getStoriesByGenre(genre: string): Story[] {
  return getAllStories().filter((story) => 
    story.genre.toLowerCase() === genre.toLowerCase()
  )
}

export function searchStories(query: string): Story[] {
  const lowerQuery = query.toLowerCase()
  return getAllStories().filter((story) => 
    story.title.toLowerCase().includes(lowerQuery) ||
    story.description.toLowerCase().includes(lowerQuery) ||
    story.genre.toLowerCase().includes(lowerQuery) ||
    story.author.toLowerCase().includes(lowerQuery)
  )
}

export function getStoriesWithAmbience(): Story[] {
  return getAllStories().filter((story) => story.ambience)
}

export function getAllGenres(): string[] {
  const genres = new Set(getAllStories().map((story) => story.genre))
  return Array.from(genres).sort()
}
