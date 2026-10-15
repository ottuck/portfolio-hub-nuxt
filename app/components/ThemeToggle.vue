<script setup lang="ts">
import { format, type Dictionary } from '~/i18n/dictionaries'
defineProps<{ labels: Dictionary['theme'] }>()
type Theme = 'system' | 'light' | 'dark'
const next: Record<Theme, Theme> = { system: 'light', light: 'dark', dark: 'system' }
const icon = { system: 'monitor', light: 'sun', dark: 'moon' } as const
const theme = ref<Theme>('system')
onMounted(() => {
  const current = document.documentElement.getAttribute('data-theme')
  theme.value = current === 'light' || current === 'dark' ? current : 'system'
})
function cycle() {
  theme.value = next[theme.value]
  const root = document.documentElement
  if (theme.value === 'system') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', theme.value)
  try {
    if (theme.value === 'system') localStorage.removeItem('theme')
    else localStorage.setItem('theme', theme.value)
  } catch { /* Attribute still applies when storage is unavailable. */ }
}
</script>

<template>
  <button type="button" class="grid size-9 place-items-center rounded-full border border-line bg-card text-muted transition-colors hover:text-ink" :aria-label="format(labels.action, { theme: labels[theme], next: labels[next[theme]] })" :title="format(labels.title, { theme: labels[theme] })" @click="cycle">
    <AppIcon :name="icon[theme]" class="size-4" />
  </button>
</template>
