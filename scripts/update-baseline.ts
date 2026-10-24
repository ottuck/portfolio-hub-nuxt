// Rewrites docs/baseline.json from the pages `pnpm generate` wrote to .output/public.
// When content changes on purpose, run `pnpm generate` (it stops at the check against the old
// baseline), then `pnpm baseline`, then read `git diff docs/baseline.json` to be sure every change
// is the one you meant. Run `pnpm generate` again to confirm.
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { load } from 'cheerio'
import routes from '../docs/routes.json'

type Entry = Record<string, unknown>
const previous: Record<string, Entry> = JSON.parse(await readFile('docs/baseline.json', 'utf8'))
const defaultOgKeys = Object.keys((Object.values(previous)[0]?.og as Entry | undefined) ?? {})
const next: Record<string, Entry> = {}
const added: string[] = []
const changed: string[] = []

for (const route of routes) {
  const html = await readFile(resolve('.output/public', route === '/' ? 'index.html' : `${route.slice(1)}.html`), 'utf8')
  const $ = load(html)
  const old = previous[route]
  const ogKeys = old ? Object.keys(old.og as Entry) : defaultOgKeys
  const entry: Entry = {
    title: $('head > title').text(),
    lang: $('html').attr('lang'),
    description: $('meta[name="description"]').attr('content'),
    canonical: $('link[rel="canonical"]').attr('href'),
    alternates: Object.fromEntries($('link[hreflang]').toArray().map((el) => [$(el).attr('hreflang'), $(el).attr('href')])),
    og: Object.fromEntries(ogKeys.map((key) => [key, $(`meta[property="${key}"],meta[name="${key}"]`).attr('content')])),
    ...(old?.oldOgImage ? { oldOgImage: old.oldOgImage } : {}),
    jsonLd: $('script[type="application/ld+json"]').toArray().map((el) => JSON.parse($(el).text()) as unknown),
  }
  $('main script,main style').remove()
  entry.mainText = $('main').text().replace(/\s/g, '')
  entry.links = $('main a[href]').toArray().map((el) => $(el).attr('href')).sort()
  entry.alts = $('main img').toArray().map((el) => $(el).attr('alt'))

  if (!old) {
    added.push(route)
    next[route] = entry
    continue
  }
  const merged = Object.fromEntries(Object.keys(old).map((key) => [key, entry[key]]))
  if (JSON.stringify(merged) !== JSON.stringify(old)) changed.push(route)
  next[route] = merged
}

await writeFile('docs/baseline.json', `${JSON.stringify(next, null, 2)}\n`)
console.log(`Baseline rewritten for ${routes.length} routes. Added: ${added.length ? added.join(', ') : 'none'}. Changed: ${changed.length ? changed.join(', ') : 'none'}.`)
