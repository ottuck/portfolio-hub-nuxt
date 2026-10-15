<script setup lang="ts">
import { getDictionary } from '~/i18n/dictionaries'
import { localePath, stripLocale, type Locale } from '~/i18n/locales'

const props = defineProps<{ locale: Locale; nativeNavigation?: boolean }>()
const route = useRoute()
const labels = computed(() => getDictionary(props.locale).nav)
const path = computed(() => stripLocale(route.path))
const items = computed(() => [
  { href: '/', label: labels.value.home },
  { href: '/projects', label: labels.value.projects },
  { href: '/about', label: labels.value.about },
])
function isActive(href: string) { return href === '/' ? path.value === '/' : path.value.startsWith(href) }
</script>

<template>
  <nav :aria-label="labels.label" class="flex gap-0.5 rounded-full border border-line bg-card p-1 text-[13px] sm:gap-1 sm:text-sm">
    <NuxtLink v-for="item in items" :key="item.href" :to="localePath(locale, item.href)" :external="nativeNavigation" :aria-current="isActive(item.href) ? 'page' : undefined" class="rounded-full px-3 py-1.5 whitespace-nowrap transition-colors sm:px-4" :class="isActive(item.href) ? 'bg-ink text-bg' : 'text-muted hover:text-ink'">{{ item.label }}</NuxtLink>
  </nav>
</template>
