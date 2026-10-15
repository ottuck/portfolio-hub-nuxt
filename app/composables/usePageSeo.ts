import type { MaybeRefOrGetter } from 'vue'
import { site } from '~/content/site'
import { getDictionary } from '~/i18n/dictionaries'
import { languageAlternates, localePath, ogLocales, type Locale } from '~/i18n/locales'

export function usePageSeo(locale: MaybeRefOrGetter<Locale>, path: MaybeRefOrGetter<string>, page: MaybeRefOrGetter<{ title?: string; description?: string; type?: 'website' | 'article' }> = {}) {
  const config = useRuntimeConfig()
  useHead(() => {
    const language = toValue(locale)
    const profile = getDictionary(language).profile
    const data = toValue(page)
    const title = data.title ? `${data.title} — ${site.name}` : `${site.name} — ${profile.role}`
    const description = data.description ?? profile.description
    const absolute = (value: string) => new URL(value, site.url).toString().replace(/\/$/, '')
    const url = absolute(localePath(language, toValue(path)))
    const slug = toValue(path).match(/^\/projects\/([a-z0-9-]+)$/)?.[1]
    const image = new URL(`/og/${slug ?? 'site'}.png`, config.public.assetUrl).toString()
    const imageAlt = slug ? 'Project overview' : `${site.name} — ${getDictionary('en').profile.role}`
    return {
      title,
      htmlAttrs: { lang: language },
      link: [
        { rel: 'canonical', href: url },
        ...Object.entries(languageAlternates(toValue(path))).map(([hreflang, href]) => ({ rel: 'alternate' as const, type: 'text/html', hreflang, href: absolute(href) })),
      ],
      meta: [
        { name: 'description', content: description },
        { name: 'author', content: site.name },
        { property: 'og:title', content: data.title ?? `${site.name} — ${profile.role}` },
        { property: 'og:description', content: description },
        { property: 'og:type', content: data.type ?? 'website' },
        { property: 'og:site_name', content: site.name },
        { property: 'og:locale', content: ogLocales[language] },
        { property: 'og:url', content: url },
        { property: 'og:image', content: image },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: imageAlt },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: data.title ?? `${site.name} — ${profile.role}` },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image },
        { name: 'twitter:image:alt', content: imageAlt },
        { name: 'twitter:image:type', content: 'image/png' },
        { name: 'twitter:image:width', content: '1200' },
        { name: 'twitter:image:height', content: '630' },
      ],
    }
  })
}

export function useStructuredData(data: MaybeRefOrGetter<Record<string, unknown>>) {
  useHead(() => ({ script: [{ key: 'structured-data', type: 'application/ld+json', innerHTML: JSON.stringify(toValue(data)).replace(/</g, '\\u003c') }] }))
}
