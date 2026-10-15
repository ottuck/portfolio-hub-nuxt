<script setup lang="ts">
import { isPrefixedLocale, type PrefixedLocale } from '~/i18n/locales'
import { getProject, getSlugs } from '~/lib/projects'
definePageMeta({ validate: route => isPrefixedLocale(String(route.params.locale)) && getSlugs().includes(String(route.params.slug)) })
const locale = useRoute().params.locale as PrefixedLocale
const project = getProject(String(useRoute().params.slug), locale)
if (!project) throw createError({ statusCode: 404, statusMessage: 'Page not found' })
</script>

<template>
  <ProjectView :locale="locale" :project="project!" />
</template>
