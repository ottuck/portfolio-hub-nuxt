<script setup lang="ts">
import { getDictionary } from '~/i18n/dictionaries'
import { localePath, type Locale } from '~/i18n/locales'
const props = defineProps<{ locale: Locale }>()
const t = computed(() => getDictionary(props.locale).notFound)
</script>

<template>
  <main id="main" class="mx-auto max-w-6xl px-4 sm:px-8"><div class="tile flex flex-col items-start gap-4 p-8 sm:p-12"><span class="eyebrow">404</span><h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">{{ t.title }}</h1><p class="text-muted">{{ t.body }}</p><a :href="localePath(locale, '/')" class="mt-2 inline-flex h-11 items-center gap-1.5 rounded-full bg-accent px-5 text-[15px] font-medium text-accent-ink"><AppIcon name="arrow-left" class="size-4" />{{ t.back }}</a></div></main>
</template>
