import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { writing } from '@/data/writing';
import { SITE } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/playground`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    ...projects.map((p) => ({
      url: `${SITE.url}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: p.tier === 'featured' ? 0.9 : 0.6,
    })),
    ...writing
      .filter((p) => !p.externalUrl)
      .map((p) => ({
        url: `${SITE.url}/blog/${p.slug}`,
        lastModified: new Date(p.date),
        changeFrequency: 'yearly' as const,
        priority: 0.5,
      })),
  ];
}
