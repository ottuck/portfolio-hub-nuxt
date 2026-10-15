<script setup lang="ts">
import { getDictionary } from '~/i18n/dictionaries'
import type { Locale } from '~/i18n/locales'
import type { Project } from '~/lib/types'
defineProps<{ project: Project; locale: Locale }>()
const colors = { live: 'bg-emerald-500', 'in-progress': 'bg-amber-500', planned: 'border border-current', archived: 'bg-faint' }
</script>

<template>
  <span class="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs whitespace-nowrap" :class="project.highlightLabel ? 'bg-accent-soft text-accent-strong' : 'bg-chip text-muted'">
    <span aria-hidden="true" class="size-1.5 rounded-full" :class="colors[project.status]" />{{ getDictionary(locale).status[project.status] }} · {{ project.label }}
  </span>
</template>
