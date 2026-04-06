import { MetadataRoute } from 'next'

import { fetchNavigation } from '@/entities/navigation/api/fetchNavigation'


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const DOMAIN = process.env.SITE_URL ?? 'https://abu.edu.kz'
  const navigation = await fetchNavigation()
  const locales = ['ru', 'kz', 'en']

  return navigation?.length
    ? navigation.flatMap(item =>
        locales.map(locale => {
          const slug = item.slug ? escapeXml(item.slug) : ''
          const path = slug ? `/${locale}/${slug}` : `/${locale}`

          return {
            url: `${DOMAIN}${path}`,
            lastModified: new Date(item.updatedAt),
          }
        })
      )
    : []
}

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}