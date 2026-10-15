<script setup lang="ts">
import type { NuxtError } from '#app'
import { getDictionary } from '~/i18n/dictionaries'
import { localeOf } from '~/i18n/locales'
const props = defineProps<{ error: NuxtError }>()
const route = useRoute()
const locale = computed(() => localeOf(route.path))
useHead(() => ({ title: `${props.error.statusCode} — ${getDictionary(locale.value).notFound.title}`, htmlAttrs: { lang: locale.value }, meta: [{ name: 'robots', content: 'noindex' }] }))
</script>

<template>
  <a href="#main" class="sr-only z-50 rounded-lg bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3">{{ getDictionary(locale).nav.skip }}</a>
  <SiteHeader :locale="locale" native-navigation />
  <NotFoundView v-if="error.statusCode === 404" :locale="locale" />
  <main v-else id="main" class="mx-auto max-w-6xl p-8"><h1>{{ error.statusCode }}</h1><p>{{ error.statusMessage }}</p></main>
  <SiteFooter :locale="locale" />
</template>
