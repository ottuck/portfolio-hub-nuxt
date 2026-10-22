<script setup lang="ts">
import { DIAGRAM_TEXT, layoutDiagram } from '~/lib/diagram'
import type { Diagram } from '~/lib/types'
const props = defineProps<{ diagram: Diagram; title: string }>()
const id = useId()
const layout = computed(() => layoutDiagram(props.diagram))
</script>

<template>
  <figure class="overflow-hidden rounded-[28px] border border-line bg-card">
    <!-- Wide diagrams scroll sideways on a phone instead of shrinking the words. -->
    <div class="overflow-x-auto focus-visible:outline-2 focus-visible:outline-accent" tabindex="0" role="region" :aria-labelledby="`${id}-title`">
      <svg :viewBox="`0 0 ${diagram.width} ${diagram.height}`" class="diagram block w-full min-w-[680px]" role="img" :aria-labelledby="`${id}-title`" :aria-describedby="`${id}-summary`">
        <title :id="`${id}-title`">{{ title }}</title>
        <defs>
          <marker v-for="kind in ['solid', 'dashed']" :id="`${id}-${kind}`" :key="kind" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 L7 4 L1 7" fill="none" :class="kind === 'solid' ? 'edge' : 'edge-dashed'" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" /></marker>
        </defs>
        <g v-for="group in diagram.groups" :key="group.title">
          <rect :x="group.x" :y="group.y" :width="group.w" :height="group.h" rx="18" class="group" />
          <text :x="group.x + 14" :y="group.y + 20" class="group-title">{{ group.title }}</text>
        </g>
        <g fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path v-for="(edge, i) in layout.edges" :key="i" :d="edge.d" :class="edge.dashed ? 'edge-dashed' : 'edge'" :marker-end="`url(#${id}-${edge.dashed ? 'dashed' : 'solid'})`" :marker-start="edge.both ? `url(#${id}-${edge.dashed ? 'dashed' : 'solid'})` : undefined" />
        </g>
        <g v-for="node in layout.boxes" :key="node.id" text-anchor="middle">
          <rect :x="node.x0" :y="node.y0" :width="node.w" :height="node.h" rx="16" :class="`node node-${node.tone ?? 'main'}`" />
          <text :x="node.x" :y="node.note ? node.y - 5 : node.y + 5" :font-size="DIAGRAM_TEXT.title" font-weight="600" :class="`title-${node.tone ?? 'main'}`">{{ node.title }}</text>
          <text v-if="node.note" :x="node.x" :y="node.y + 16" :font-size="DIAGRAM_TEXT.note" :class="`note-${node.tone ?? 'main'}`">{{ node.note }}</text>
        </g>
        <template v-for="(edge, i) in layout.edges" :key="`label-${i}`">
          <g v-if="edge.label" text-anchor="middle">
            <rect :x="edge.label.x - edge.label.w / 2" :y="edge.label.y - 11" :width="edge.label.w" height="22" rx="11" :class="edge.dashed ? 'pill-dashed' : 'pill'" />
            <text :x="edge.label.x" :y="edge.label.y + 4" :font-size="DIAGRAM_TEXT.label" :class="edge.dashed ? 'pill-text-dashed' : 'pill-text'">{{ edge.label.text }}</text>
          </g>
        </template>
      </svg>
    </div>
    <figcaption :id="`${id}-summary`" class="border-t border-line px-5 py-4 text-[15px] leading-relaxed text-muted sm:px-6">{{ diagram.summary }}</figcaption>
  </figure>
</template>

<style scoped>
/* GitLeaf's sage and sand, with dark counterparts. */
.diagram { font-family: var(--font-sans); }
.group { fill: light-dark(#faf7f1, #1d1a16); stroke: var(--line); stroke-dasharray: 5 5; }
.group-title { fill: var(--faint); font-size: 12px; }
.node { stroke-width: 1; }
.node-main { fill: light-dark(#edf5ee, #1c2620); stroke: light-dark(#c8d8cb, #33463a); }
.node-accent { fill: light-dark(#fbf4e6, #2a2219); stroke: light-dark(#ddcfb4, #4b3e2c); }
.node-outside { fill: var(--chip); stroke: light-dark(#e0d6c6, #3a332c); }
.title-main { fill: light-dark(#344c3b, #d2e5d6); }
.title-accent { fill: light-dark(#6f5a39, #ebd2a8); }
.title-outside { fill: var(--ink); }
.note-main { fill: light-dark(#5e6f5c, #9fb29e); }
.note-accent { fill: light-dark(#806a47, #cbb08a); }
.note-outside { fill: var(--muted); }
.edge { stroke: light-dark(#8c9c90, #71877a); }
.edge-dashed { stroke: light-dark(#b49b72, #9a8461); stroke-dasharray: 4 5; }
marker .edge-dashed { stroke-dasharray: none; }
.pill { fill: light-dark(#f5f9f5, #1a221c); stroke: light-dark(#d8e4d9, #2f3f34); }
.pill-dashed { fill: light-dark(#fbf7ef, #241e16); stroke: light-dark(#e5d9c4, #43382a); }
.pill-text { fill: light-dark(#4c6050, #b6cab8); }
.pill-text-dashed { fill: light-dark(#7d6643, #d6bd93); }
</style>
