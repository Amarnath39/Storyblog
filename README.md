# Storyblog

A beautiful, responsive personal storytelling website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Immersive Reading Experience**: Elegant typography and calm design for comfortable long-form reading
- **Audio Ambience**: Optional background audio tracks for each story
- **Reading Controls**: Font size adjustment, theme switching (light/sepia/dark), bookmarks
- **Reading Progress**: Progress bar with LocalStorage persistence
- **Client-Side Search**: Search through stories by title, description, genre, and author
- **Genre Filtering**: Filter stories by genre
- **Local Content**: Stories stored as Markdown files with frontmatter
- **No Database**: Uses LocalStorage for reader preferences and bookmarks
- **Responsive Design**: Beautiful on desktop, tablet, and mobile

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
  page.tsx              # Homepage
  stories/
    page.tsx            # Stories listing page
    [slug]/
      page.tsx          # Individual story page
  about/
    page.tsx            # About page
  bookmarks/
    page.tsx            # Bookmarks page

components/
  Header.tsx            # Navigation header
  Footer.tsx            # Site footer
  StoryCard.tsx         # Story card component
  AudioPlayer.tsx       # Audio player component
  ReadingToolbar.tsx    # Reading controls (font, theme, bookmark)
  StoryProgress.tsx     # Reading progress bar

content/
  stories/
    story-one.md        # Story files with frontmatter
    story-two.md

lib/
  stories.ts            # Story content system
  audio.ts              # Audio configuration

public/
  audio/                # Audio files for ambience
  images/               # Story cover images
```

## Adding a New Story

1. Create a new Markdown file in `content/stories/`:
```bash
content/stories/my-new-story.md
```

2. Add frontmatter at the top:
```yaml
---
title: "My New Story"
slug: "my-new-story"
description: "A brief description of the story."
author: "Your Name"
genre: "Fiction"
readingTime: "10 min"
cover: "/images/my-new-story.jpg"
ambience: "rain"
featured: false
---
```

3. Write your story content in Markdown below the frontmatter.

4. The story will automatically appear on the website!

## Adding Audio Tracks

1. Place your audio file in `public/audio/`:
```bash
public/audio/my-track.mp3
```

2. Register it in `lib/audio.ts`:
```typescript
{
  id: "my-track",
  name: "My Track",
  src: "/audio/my-track.mp3"
}
```

3. Use it in a story's frontmatter:
```yaml
ambience: "my-track"
```

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette. The current palette uses:
- Warm ivory and cream backgrounds
- Muted sage greens
- Dusty blues and lavenders
- Warm dark-gray text

### Typography

The site uses:
- **Inter** (sans-serif) for UI elements
- **Georgia/serif** for story content

You can modify fonts in `app/layout.tsx` and component styles.

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

This project is optimized for Vercel deployment. Simply connect your repository and deploy.

## LocalStorage

The website uses LocalStorage to persist:
- Reading progress for each story
- Font size preferences
- Theme preferences (light/sepia/dark)
- Audio volume preferences
- Bookmarked stories

## Notes

- No backend or database required
- Stories are loaded from local Markdown files
- Audio files are served from the public folder
- All data persistence is client-side via LocalStorage

## License

This project is open source and available for personal use.
