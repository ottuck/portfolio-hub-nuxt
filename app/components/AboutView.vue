<script setup lang="ts">
import { site } from '~/content/site'
import { getDictionary } from '~/i18n/dictionaries'
import type { Locale } from '~/i18n/locales'
const props = defineProps<{ locale: Locale }>()
const t = computed(() => getDictionary(props.locale).about)
const elsewhere = computed(() => [{ label: 'GitHub', href: site.links.github, note: `@${site.githubHandle}` }, { label: t.value.blog, href: site.links.blog, note: new URL(site.links.blog).hostname }])
usePageSeo(() => props.locale, '/about', () => ({ title: t.value.title, description: t.value.description }))
</script>

<template>
  <main id="main" class="mx-auto max-w-6xl px-4 sm:px-8">
    <div class="px-1 pt-8 pb-4 sm:pt-12"><h1 class="sr-only">{{ t.title }}</h1><div class="max-w-3xl space-y-4 text-[17px] leading-[1.75] text-muted"><p v-for="paragraph in t.paragraphs" :key="paragraph">{{ paragraph }}</p></div></div>
    <dl class="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-3.5"><div v-for="focus in t.focus" :key="focus.label" class="tile px-5 py-4"><dt class="eyebrow">{{ focus.label }}</dt><dd class="mt-1.5 text-[15px]">{{ focus.value }}</dd></div></dl>
    <section class="mt-3 grid gap-3 sm:grid-cols-2 md:gap-3.5"><h2 class="sr-only">{{ t.elsewhere }}</h2><a v-for="link in elsewhere" :key="link.label" :href="link.href" class="tile group flex items-center justify-between p-5 sm:p-6"><span><span class="block text-xl font-semibold tracking-tight group-hover:text-accent">{{ link.label }}</span><span class="mt-1 block font-mono text-xs text-faint">{{ link.note }}</span></span><AppIcon name="arrow-up-right" class="size-5 text-faint group-hover:text-accent" /></a></section>
  </main>
</template>
