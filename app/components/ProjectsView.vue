<script setup lang="ts">
import { getDictionary } from '~/i18n/dictionaries'
import type { Locale } from '~/i18n/locales'
import { getProjects } from '~/lib/projects'
const props = defineProps<{ locale: Locale }>()
const projects = computed(() => getProjects(props.locale))
const t = computed(() => getDictionary(props.locale).projects)
usePageSeo(() => props.locale, '/projects', () => ({ title: t.value.title, description: t.value.description }))
</script>

<template>
  <main id="main" class="mx-auto max-w-6xl px-4 sm:px-8">
    <div class="px-1 pt-8 pb-8 sm:pt-12"><h1 class="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{{ t.title }}</h1><p class="mt-3 max-w-xl text-[17px] leading-relaxed text-muted">{{ t.lead }}</p></div>
    <h2 class="sr-only">{{ t.all }}</h2>
    <div class="grid gap-3 md:grid-cols-2 md:auto-rows-[148px] md:gap-3.5"><ProjectTile v-for="(project, i) in projects" :key="project.slug" :project="project" :locale="locale" :priority="i < 2" class="md:row-span-3" /></div>
  </main>
</template>
