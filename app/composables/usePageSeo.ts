import type { MaybeRefOrGetter } from 'vue'
import { site } from '~/content/site'
import { getDictionary } from '~/i18n/dictionaries'
import { languageAlternates, localePath, ogLocales, type Locale } from '~/i18n/locales'

export function usePageSeo(locale: MaybeRefOrGetter<Locale>, path: MaybeRefOrGetter<string>, page: MaybeRefOrGetter<{ title?: string; description?: string; type?: 'website' | 'article' }> = {}) {
  useHead(() => {
    const language = toValue(locale)
    const profile = getDictionary(language).profile
    const data = toValue(page)
    const title = data.title ? `${data.title} — ${site.name}` : `${site.name} — ${profile.role}`
    const description = data.description ?? profile.description
    const absolute = (value: string) => new URL(value, site.url).toString()
    const url = absolute(localePath(language, toValue(path)))
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
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
    }
  })
}

export function useStructuredData(data: MaybeRefOrGetter<Record<string, unknown>>) {
  useHead(() => ({ script: [{ key: 'structured-data', type: 'application/ld+json', innerHTML: JSON.stringify(toValue(data)).replace(/</g, '\\u003c') }] }))
}
