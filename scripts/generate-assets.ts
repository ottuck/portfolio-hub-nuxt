import { readFile, mkdir, writeFile, readdir } from 'node:fs/promises'
import { resolve, relative, sep } from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import sharp from 'sharp'
import { site } from '../app/content/site'
import { getDictionary } from '../app/i18n/dictionaries'
import { languageAlternates, locales, localePath } from '../app/i18n/locales'
import { getProject, getSlugs } from '../app/lib/projects'

const output = resolve('public')
const placeholders: Record<string, string> = {}
for (const entry of await readdir(resolve(output, 'images'), { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith('.webp')) continue
  const image = resolve(entry.parentPath, entry.name)
  const placeholder = await sharp(image).resize({ width: 10 }).webp({ quality: 20 }).toBuffer()
  placeholders['/' + relative(output, image).split(sep).join('/')] = 'data:image/webp;base64,' + placeholder.toString('base64')
}
await mkdir(resolve('app/generated'), { recursive: true })
await writeFile(resolve('app/generated/image-placeholders.json'), JSON.stringify(placeholders, null, 2) + '\n')
await mkdir(resolve(output, 'og'), { recursive: true })
const [regular, semibold] = await Promise.all(['Geist-Regular.ttf', 'Geist-SemiBold.ttf'].map(name => readFile(resolve('assets/og-fonts', name))))
const fonts = [
  { name: 'Geist', data: regular.buffer.slice(regular.byteOffset, regular.byteOffset + regular.byteLength) as ArrayBuffer, weight: 400 as const, style: 'normal' as const },
  { name: 'Geist', data: semibold.buffer.slice(semibold.byteOffset, semibold.byteOffset + semibold.byteLength) as ArrayBuffer, weight: 600 as const, style: 'normal' as const },
]
type Style = Record<string, string | number>
const el = (style: Style, children: unknown) => ({ type: 'div', key: null, props: { style: { boxSizing: 'border-box', ...style }, children } })
const span = (style: Style, children: string) => ({ type: 'span', key: null, props: { style, children } })

async function image(name: string, eyebrow: string, title: string, body: string, tint: [string, string] = ['#f7f3ec', '#f3ece1'], accent?: string) {
  const tree = el({ width: '100%', height: '100%', display: 'flex', padding: 40, background: `linear-gradient(160deg, ${tint[0]}, ${tint[1]})`, fontFamily: 'Geist' }, [
    el({ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '56px 64px', borderRadius: 40, background: '#fffdf9', border: '2px solid #ebe3d6', color: '#231d18' }, [
      el({ display: 'flex', alignItems: 'center', gap: 18, fontSize: 28, color: '#6b6158' }, [el({ width: 48, height: 48, borderRadius: 12, background: '#c4541f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 26 }, site.shortName[0]), eyebrow]),
      el({ display: 'flex', flexDirection: 'column' }, [
        el({ display: 'flex', flexWrap: 'wrap', fontSize: 76, fontWeight: 600, letterSpacing: -3, lineHeight: 1.05 }, [span({}, title), ...(accent ? [span({ color: '#c4541f', marginLeft: 20 }, accent)] : [])]),
        el({ marginTop: 24, fontSize: 30, lineHeight: 1.4, color: '#6b6158', maxWidth: 940 }, body),
      ]),
    ]),
  ])
  const svg = await satori(tree as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts })
  await writeFile(resolve(output, `og/${name}.png`), new Resvg(svg).render().asPng())
}
const dictionary = getDictionary('en')
const { profile } = dictionary
await image('site', `${site.name} · ${profile.role}, ${profile.location}`, profile.greeting, profile.intro, undefined, profile.greetingName)
for (const slug of getSlugs()) {
  const project = getProject(slug, 'en')!
  await image(slug, `${site.name} · ${dictionary.status[project.status]} · ${project.label}`, project.name, project.tagline, project.cover.tint)
}
const paths = ['/', '/projects', ...getSlugs().map(slug => `/projects/${slug}`), '/about']
const xml = (text: string) => text.replace(/[<>&"']/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character]!)
const absolute = (path: string) => new URL(path, site.url).toString()
const entries = paths.flatMap(path => locales.map(locale => `<url><loc>${xml(absolute(localePath(locale, path)))}</loc><changefreq>${path === '/about' ? 'yearly' : 'monthly'}</changefreq><priority>${path === '/' ? 1 : path === '/about' ? 0.5 : 0.8}</priority>${Object.entries(languageAlternates(path)).map(([language, href]) => `<xhtml:link rel="alternate" hreflang="${language}" href="${xml(absolute(href))}"/>`).join('')}</url>`))
await writeFile(resolve(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('\n')}</urlset>\n`)
await writeFile(resolve(output, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${absolute('/sitemap.xml')}\n`)
console.log(`Generated ${getSlugs().length + 1} OG images and ${entries.length} sitemap entries.`)
