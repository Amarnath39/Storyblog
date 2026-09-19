'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface StoryContentProps {
  content: string
}

export default function StoryContent({ content }: StoryContentProps) {
  return (
    <div className="story-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
