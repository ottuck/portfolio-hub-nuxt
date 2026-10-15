<script setup lang="ts">
import { getProject, getSlugs } from '~/lib/projects'
definePageMeta({ validate: route => getSlugs().includes(String(route.params.slug)) })
const locale = 'en' as const
const project = getProject(String(useRoute().params.slug), locale)
if (!project) throw createError({ statusCode: 404, statusMessage: 'Page not found' })
</script>

<template>
  <ProjectView :locale="locale" :project="project!" />
</template>
