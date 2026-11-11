/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'wikimedia.org', 'upload.wikimedia.org'],
    unoptimized: true
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  },
  async rewrites() {
    return [
      {
        source: '/bhagavad-gita/chapter-:chapterNumber/verse-:verseNumber',
        destination: '/bhagavad-gita/chapter/:chapterNumber/verse/:verseNumber',
      },
      {
        source: '/bhagavad-gita/chapter-:chapterNumber',
        destination: '/bhagavad-gita/chapter/:chapterNumber',
      },
      {
        source: '/:lang(hi|en|sa|bn|ta|te|mr|gu|kn|ml|pa|fr|de|es|ar|ja)/bhagavad-gita/chapter-:chapterNumber/verse-:verseNumber',
        destination: '/bhagavad-gita/chapter/:chapterNumber/verse/:verseNumber?lang=:lang',
      },
    ];
  }
}

module.exports = nextConfig
