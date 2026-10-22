// Writes each project's architecture diagram to docs/architecture as a standalone SVG and a
// 2x PNG, in the light colors of the project page. Run with `pnpm diagrams`.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import { DIAGRAM_TEXT, layoutDiagram } from '../app/lib/diagram'
import { getProject, getSlugs } from '../app/lib/projects'
import type { Diagram } from '../app/lib/types'

// The same palette as ProjectDiagram.vue (light).
const color = {
  background: '#fdfdfb',
  group: { fill: '#faf7f1', stroke: '#ebe3d6', title: '#71675e' },
  main: { fill: '#edf5ee', stroke: '#c8d8cb', title: '#344c3b', note: '#5e6f5c' },
  accent: { fill: '#fbf4e6', stroke: '#ddcfb4', title: '#6f5a39', note: '#806a47' },
  outside: { fill: '#f3ece1', stroke: '#e0d6c6', title: '#231d18', note: '#6b6158' },
  solid: { line: '#8c9c90', fill: '#f5f9f5', stroke: '#d8e4d9', text: '#4c6050' },
  dashed: { line: '#b49b72', fill: '#fbf7ef', stroke: '#e5d9c4', text: '#7d6643' },
}
const xml = (text: string) => text.replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]!)

function svg(name: string, d: Diagram) {
  const { boxes, edges } = layoutDiagram(d)
  // Separate start and end heads: resvg doesn't support orient="auto-start-reverse".
  const marker = (id: string, stroke: string) =>
    [['', 'M1 1 L7 4 L1 7', 7], ['-start', 'M7 1 L1 4 L7 7', 1]].map(([suffix, d, refX]) =>
      `<marker id="${id}${suffix}" viewBox="0 0 8 8" refX="${refX}" refY="4" markerWidth="7" markerHeight="7" orient="auto" overflow="visible"><path d="${d}" fill="none" stroke="${stroke}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></marker>`).join('')
  const groups = (d.groups ?? []).map((g) =>
    `<rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" rx="18" fill="${color.group.fill}" stroke="${color.group.stroke}" stroke-dasharray="5 5"/><text x="${g.x + 14}" y="${g.y + 20}" font-size="12" fill="${color.group.title}">${xml(g.title)}</text>`)
  const lines = edges.map((e) => {
    const kind = e.dashed ? 'dashed' : 'solid'
    return `<path d="${e.d}" fill="none" stroke="${color[kind].line}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"${e.dashed ? ' stroke-dasharray="4 5"' : ''} marker-end="url(#${kind})"${e.both ? ` marker-start="url(#${kind}-start)"` : ''}/>`
  })
  const nodes = boxes.map((b) => {
    const c = color[b.tone ?? 'main']
    return [
      `<rect x="${b.x0}" y="${b.y0}" width="${b.w}" height="${b.h}" rx="16" fill="${c.fill}" stroke="${c.stroke}"/>`,
      `<text x="${b.x}" y="${b.note ? b.y - 5 : b.y + 5}" font-size="${DIAGRAM_TEXT.title}" font-weight="600" fill="${c.title}">${xml(b.title)}</text>`,
      b.note ? `<text x="${b.x}" y="${b.y + 16}" font-size="${DIAGRAM_TEXT.note}" fill="${c.note}">${xml(b.note)}</text>` : '',
    ].join('')
  })
  const labels = edges.flatMap((e) => {
    if (!e.label) return []
    const c = color[e.dashed ? 'dashed' : 'solid']
    return [`<rect x="${e.label.x - e.label.w / 2}" y="${e.label.y - 11}" width="${e.label.w}" height="22" rx="11" fill="${c.fill}" stroke="${c.stroke}"/><text x="${e.label.x}" y="${e.label.y + 4}" font-size="${DIAGRAM_TEXT.label}" fill="${c.text}">${xml(e.label.text)}</text>`]
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${d.width}" height="${d.height}" viewBox="0 0 ${d.width} ${d.height}" role="img" aria-labelledby="title desc">
  <title id="title">${xml(name)} — Architecture</title>
  <desc id="desc">${xml(d.summary)}</desc>
  <defs>${marker('solid', color.solid.line)}${marker('dashed', color.dashed.line)}</defs>
  <rect width="${d.width}" height="${d.height}" rx="20" fill="${color.background}"/>
  <g font-family="Geist, Arial, Helvetica, sans-serif">${groups.join('')}${lines.join('')}<g text-anchor="middle">${nodes.join('')}${labels.join('')}</g></g>
</svg>
`
}

const out = resolve('docs/architecture')
await mkdir(out, { recursive: true })
const fontFiles = ['Geist-Regular.ttf', 'Geist-SemiBold.ttf'].map((name) => resolve('assets/og-fonts', name))
await Promise.all(fontFiles.map((file) => readFile(file)))
let count = 0
for (const slug of getSlugs()) {
  const project = getProject(slug, 'en')!
  if (!project.architecture) continue
  const text = svg(project.name, project.architecture)
  await writeFile(resolve(out, `${slug}.svg`), text)
  const png = new Resvg(text, { fitTo: { mode: 'zoom', value: 2 }, font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Geist' } }).render().asPng()
  await writeFile(resolve(out, `${slug}.png`), png)
  count++
}
console.log(`Wrote ${count} diagrams to docs/architecture (SVG and 2x PNG).`)
