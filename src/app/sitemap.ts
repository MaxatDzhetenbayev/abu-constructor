import { MetadataRoute } from 'next';

import { fetchNavigation } from '@/entities/navigation/api/fetchNavigation';


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const DOMAIN = process.env.SITE_URL ?? 'https://abu.edu.kz'

  const navigation = await fetchNavigation();
  const locales = ['ru', 'kz', 'en']

  return navigation?.length ? navigation.flatMap(item =>
    locales.map(locale => {
      const path = item.slug ? `/${locale}/${item.slug}` : `/${locale}`
  
      return {
        url: `${DOMAIN}${path}`,
        lastModified: new Date(item.updatedAt),
      }
    })
  ) : []
}