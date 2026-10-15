<script setup lang="ts">
defineProps<{ name: 'arrow-up-right' | 'arrow-right' | 'arrow-left' | 'sun' | 'moon' | 'monitor' | 'globe' | 'check' | 'github' }>()

const paths = {
  'arrow-up-right': 'M7 17 17 7M8 7h9v9',
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-left': 'M19 12H5M11 18l-6-6 6-6',
  sun: 'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z',
  monitor: 'M8 21h8M12 17v4',
  globe: 'M3 12h18M12 3c2.5 2.7 3.75 5.7 3.75 9S14.5 18.3 12 21c-2.5-2.7-3.75-5.7-3.75-9S9.5 5.7 12 3Z',
  check: 'm5 12 5 5 9-10',
  github: 'M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z',
}
</script>

<template>
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" :fill="name === 'github' ? 'currentColor' : 'none'" :stroke="name === 'github' ? undefined : 'currentColor'" :stroke-width="name === 'github' ? undefined : 2" stroke-linecap="round" stroke-linejoin="round">
    <circle v-if="name === 'sun'" cx="12" cy="12" r="4" />
    <circle v-if="name === 'globe'" cx="12" cy="12" r="9" />
    <rect v-if="name === 'monitor'" x="2" y="3" width="20" height="14" rx="2" />
    <path :d="paths[name]" />
  </svg>
</template>
