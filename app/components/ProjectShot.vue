<script setup lang="ts">
import { getDictionary } from '~/i18n/dictionaries'
import type { Locale } from '~/i18n/locales'
import type { Project } from '~/lib/types'
withDefaults(defineProps<{ project: Project; locale: Locale; sizes: string; priority?: boolean }>(), { priority: false })
const candles = [[62, 55, 50, 66], [55, 58, 52, 61], [58, 49, 46, 60], [49, 44, 40, 52], [44, 47, 41, 50], [47, 39, 36, 49], [39, 42, 35, 45], [42, 34, 31, 44], [34, 37, 30, 40], [37, 29, 26, 39], [29, 33, 27, 36], [33, 26, 22, 35], [26, 22, 18, 29], [22, 25, 19, 28], [25, 17, 14, 27]] as [number, number, number, number][]
</script>

<template>
  <div class="relative overflow-hidden" :style="{ backgroundImage: `linear-gradient(160deg, ${project.cover.tint[0]}, ${project.cover.tint[1]})` }">
    <ProjectImage v-if="project.cover.main" :asset="project.cover.main.src" :alt="project.cover.main.alt" :sizes="sizes" :priority="priority" class="absolute top-[11%] left-[7%] h-auto rounded-[10px] shadow-[0_20px_40px_-12px_rgba(40,30,20,0.35)] transition-transform duration-500 group-hover:-translate-y-1" :class="project.cover.inset ? 'w-[74%]' : 'w-[108%] max-w-none'" />
    <div v-else class="absolute inset-0 flex items-end p-6 sm:p-8">
      <svg v-if="project.cover.art === 'candles'" aria-hidden="true" viewBox="0 0 160 80" class="absolute inset-x-8 top-[12%] h-[62%] w-[calc(100%-4rem)] opacity-80">
        <g v-for="([open, close, high, low], i) in candles" :key="i" :stroke="close < open ? '#6fcf97' : '#e0795b'" :fill="close < open ? '#6fcf97' : '#e0795b'">
          <line :x1="6 + i * 10.3" :x2="6 + i * 10.3" :y1="high" :y2="low" stroke-width="0.8" />
          <rect :x="6 + i * 10.3 - 1.8" width="3.6" :y="Math.min(open, close)" :height="Math.max(Math.abs(open - close), 1.2)" rx="0.4" />
        </g>
      </svg>
      <p class="relative font-mono text-xs tracking-[0.08em] text-night-muted uppercase">{{ getDictionary(locale).status[project.status] }} — {{ getDictionary(locale).project.screenshotsSoon }}</p>
    </div>
    <ProjectImage v-if="project.cover.inset" :asset="project.cover.inset.src" :alt="project.cover.inset.alt" :sizes="sizes" class="absolute h-auto border-white shadow-[0_20px_40px_-12px_rgba(40,30,20,0.4)] transition-transform duration-500 group-hover:-translate-y-2" :class="project.cover.inset.frame === 'phone' ? 'top-[16%] right-[7%] w-[22%] rounded-[14px] border-[3px]' : 'top-[30%] right-[5%] w-[38%] rounded-[10px] border-[3px]'" />
  </div>
</template>
