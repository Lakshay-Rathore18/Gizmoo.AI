import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://gizmoo.me', lastModified: new Date() },
    { url: 'https://gizmoo.me/privacy', lastModified: new Date() },
    { url: 'https://gizmoo.me/terms', lastModified: new Date() },
  ]
}
