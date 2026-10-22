import assert from 'node:assert/strict'
import { load } from 'cheerio'
import routes from '../docs/routes.json'
import baseline from '../docs/baseline.json'

const base = process.argv[2] || 'http://127.0.0.1:4173'
const fixtures: Record<string, (typeof baseline)[keyof typeof baseline]> = baseline
for (const route of routes) {
  const response = await fetch(new URL(route, base))
  assert.equal(response.status, 200, `${route}: response`)
  const $ = load(await response.text())
  assert.equal($('html').attr('lang'), fixtures[route]!.lang, `${route}: locale`)
  assert.equal($('title').text(), fixtures[route]!.title, `${route}: title`)
  assert.equal($('link[rel="canonical"]').attr('href'), fixtures[route]!.canonical, `${route}: canonical`)
  const image = $('meta[property="og:image"]').attr('content')!
  assert.equal((await fetch(new URL(new URL(image).pathname, base))).status, 200, `${route}: OG`)
}
for (const [source, target] of [
  ['/projects/buddy-chat', '/projects/puny-chat'],
  ['/projects/buddy-chat/example', '/projects/puny-chat/example'],
  ['/projects/trading-bot', '/projects/quant-lab'],
  ['/projects/trading-bot/example', '/projects/quant-lab/example'],
]) {
  for (const query of ['', '?utm_source=migration']) {
    const response = await fetch(new URL(source + query, base), { redirect: 'manual' })
    assert.equal(response.status, 308, source)
    const location = new URL(response.headers.get('location')!, base)
    assert.equal(location.pathname, target, source)
    assert.equal(location.search, query, `${source}: query preservation`)
  }
}
for (const path of ['/not-a-page', '/ko/not-a-page', '/ja/not-a-page', '/projects/not-a-project', '/ko/projects/not-a-project', '/ja/projects/not-a-project', '/fr']) {
  const response = await fetch(new URL(path, base))
  assert.equal(response.status, 404, `${path}: real 404`)
  const $ = load(await response.text())
  assert.ok($('main h1').text(), `${path}: 404 body`)
  assert.match($('meta[name="robots"]').attr('content')!, /noindex/, `${path}: 404 noindex`)
}
for (const fixture of Object.values(fixtures)) {
  if (!('oldOgImage' in fixture)) continue
  const path = new URL(fixture.oldOgImage).pathname
  const response = await fetch(new URL(path, base), { redirect: 'manual' })
  assert.equal(response.status, 308, `${path}: old OG redirect`)
  const image = await fetch(new URL(response.headers.get('location')!, base))
  assert.equal(image.status, 200, `${path}: image response`)
  assert.match(image.headers.get('content-type')!, /image\/png/)
}
console.log(`HTTP checks passed at ${base}: ${routes.length} routes and OG images, redirects and query preservation, 7 missing paths, and all legacy OG URLs.`)
