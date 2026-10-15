<script setup lang="ts">
import { getDictionary } from '~/i18n/dictionaries'
import { localeOf, stripLocale } from '~/i18n/locales'
import { getProject, getProjects } from '~/lib/projects'

const route = useRoute()
const locale = computed(() => localeOf(route.path))
const t = computed(() => getDictionary(locale.value))
const path = computed(() => stripLocale(route.path))
const project = computed(() => getProject(path.value.split('/')[2] ?? '', locale.value))
const title = computed(() => project.value?.name ?? t.value.projects.title)
useHead(() => ({ htmlAttrs: { lang: locale.value }, title: `${title.value} — Henry Kim` }))
</script>

<template>
  <main id="main" class="mx-auto max-w-6xl px-4 py-8 sm:px-8">
    <h1 class="text-4xl font-semibold">{{ title }}</h1>
    <p v-if="project" class="mt-4 text-muted">{{ project.summary }}</p>
    <ul v-else class="mt-6 space-y-4">
      <li v-for="item in getProjects(locale)" :key="item.slug">{{ item.name }} — {{ item.tagline }}</li>
    </ul>
  </main>
</template>
