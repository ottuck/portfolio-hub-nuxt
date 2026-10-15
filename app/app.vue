<script setup lang="ts">
import { getDictionary } from '~/i18n/dictionaries'
import { localeOf } from '~/i18n/locales'

const route = useRoute()
const locale = computed(() => localeOf(route.path))
const t = computed(() => getDictionary(locale.value))
useHead(() => ({ htmlAttrs: { lang: locale.value } }))
</script>

<template>
  <a href="#main" class="sr-only z-50 rounded-lg bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3">{{ t.nav.skip }}</a>
  <SiteHeader :locale="locale" />
  <NuxtPage :page-key="page => page.path" />
  <SiteFooter :locale="locale" />
</template>
