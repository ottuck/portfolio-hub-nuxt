import assert from 'node:assert/strict'
import { readFile, access, readdir } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { load } from 'cheerio'
import sharp from 'sharp'
import routes from '../docs/routes.json'
import baseline from '../docs/baseline.json'
import { locales, localePath } from '../app/i18n/locales'
import { getProject, getSlugs } from '../app/lib/projects'

const output = resolve('.output/public')
const fixtures: Record<string, (typeof baseline)[keyof typeof baseline]> = baseline
const assets = new Set<string>()
const expectedAssetOrigin = new URL(process.env.NUXT_PUBLIC_ASSET_URL || (process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== 'main' ? (process.env.CF_PAGES_URL || 'https://www.portfolio-hub.dev') : 'https://www.portfolio-hub.dev')).origin
const htmlFile = (route: string) => resolve(output, route === '/' ? 'index.html' : route.slice(1) + '.html')
for (const route of routes) {
  const expected = fixtures[route]!
  const $ = load(await readFile(htmlFile(route), 'utf8'))
  assert.equal($('html').attr('lang'), expected.lang, `${route}: html lang`)
  assert.equal($('title').text(), expected.title, `${route}: title`)
  assert.equal($('meta[name="description"]').attr('content'), expected.description, `${route}: description`)
  assert.equal($('link[rel="canonical"]').attr('href'), expected.canonical, `${route}: canonical`)
  assert.deepEqual(Object.fromEntries($('link[hreflang]').map((_, el) => [[$(el).attr('hreflang'), $(el).attr('href')]]).get()), expected.alternates, `${route}: hreflang`)
  for (const [key, value] of Object.entries(expected.og)) {
    assert.equal($(`meta[property="${key}"],meta[name="${key}"]`).attr('content'), value, `${route}: ${key}`)
  }
  assert.deepEqual($('script[type="application/ld+json"]').map((_, el) => JSON.parse($(el).text())).get(), expected.jsonLd, `${route}: structured data`)
  $('main script,main style').remove()
  assert.equal($('main').text().replace(/\s/g, ''), expected.mainText, `${route}: original content`)
  assert.deepEqual($('main a[href]').map((_, el) => $(el).attr('href')).get().sort(), expected.links, `${route}: links`)
  assert.deepEqual($('main img').map((_, el) => $(el).attr('alt')).get(), expected.alts, `${route}: image alt text`)
  $('img[src],script[src],link[rel="stylesheet"][href],link[rel="icon"][href]').each((_, el) => {
    const source = $(el).attr('src') ?? $(el).attr('href')!
    if (source.startsWith('/')) assets.add(new URL(source, 'https://static.invalid').pathname)
  })
  $('img[srcset],link[imagesrcset]').each((_, el) => {
    const srcset = $(el).attr('srcset') ?? $(el).attr('imagesrcset')!
    for (const candidate of srcset.split(',')) {
      const source = candidate.trim().split(/\s+/)[0]!
      if (source.startsWith('/')) assets.add(new URL(source, 'https://static.invalid').pathname)
    }
  })
  for (const name of ['og:image', 'twitter:image']) {
    const source = $(`meta[property="${name}"],meta[name="${name}"]`).attr('content')!
    assert.ok(source, `${route}: ${name}`)
    assert.equal(new URL(source).origin, expectedAssetOrigin, `${route}: ${name} asset origin`)
    assets.add(new URL(source).pathname)
  }
  assert.ok(!$('meta[name="robots"]').attr('content')?.includes('noindex'), `${route}: production HTML must be indexable`)
}
const unlisted = getSlugs().filter(slug => getProject(slug, 'en')!.unlisted).flatMap(slug => locales.map(locale => localePath(locale, `/projects/${slug}`)))
for (const route of unlisted) {
  const $ = load(await readFile(htmlFile(route), 'utf8'))
  assert.match($('meta[name="robots"]').attr('content') ?? '', /noindex/, `${route}: unlisted page must be noindex`)
  assert.ok($('main h1').text(), `${route}: unlisted page content`)
}
for (const asset of assets) await access(resolve(output, '.' + decodeURIComponent(asset)))
const ogFiles = await readdir(resolve(output, 'og'))
for (const file of ogFiles) {
  const metadata = await sharp(resolve(output, 'og', file)).metadata()
  assert.equal(metadata.width, 1200, file)
  assert.equal(metadata.height, 630, file)
  assert.equal(metadata.format, 'png', file)
}
const sitemap = load(await readFile(resolve(output, 'sitemap.xml'), 'utf8'), { xml: true })
assert.deepEqual(sitemap('url > loc').map((_, el) => new URL(sitemap(el).text()).pathname).get().sort(), [...routes].sort(), 'sitemap content URLs')
assert.equal(sitemap('url').length, routes.length)
for (const entry of sitemap('url').toArray()) {
  assert.deepEqual(sitemap(entry).children('[rel="alternate"]').map((_, el) => sitemap(el).attr('hreflang')).get().sort(), ['en', 'ja', 'ko', 'x-default'].sort(), 'sitemap language alternates')
}
assert.match(await readFile(resolve(output, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/www\.portfolio-hub\.dev\/sitemap\.xml/)
for (const locale of ['', 'ja', 'ko']) {
  const $ = load(await readFile(join(output, locale, '404.html'), 'utf8'))
  assert.equal($('html').attr('lang'), locale || 'en')
  assert.match($('meta[name="robots"]').attr('content')!, /noindex/)
  assert.ok($('main h1').text(), '404 content is readable without JavaScript')
  assert.equal($('script[src]').length, 0, 'static 404 must not hydrate as a successful page')
}
for (const forbidden of ['200.html', '_worker.js', 'functions']) {
  await assert.rejects(access(resolve(output, forbidden)), `${forbidden} must not be deployed`)
}
assert.doesNotMatch(await readFile(resolve(output, '_redirects'), 'utf8'), /^\/\*\s+.*\s+200\s*$/m, 'Pages must not rewrite missing paths to the app with 200')
console.log(`Verified ${routes.length} pages against the original build, ${assets.size} referenced assets, ${unlisted.length} unlisted pages, ${ogFiles.length} OG images, sitemap, robots and localized static 404s.`)
