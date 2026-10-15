<script setup lang="ts">
import { site } from '~/content/site'
import { getDictionary } from '~/i18n/dictionaries'
import type { Locale } from '~/i18n/locales'
const props = defineProps<{ locale: Locale }>()
const t = computed(() => getDictionary(props.locale).footer)
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mx-auto flex w-full max-w-6xl flex-col gap-1.5 px-5 pt-4 pb-10 text-[13px] text-faint sm:flex-row sm:justify-between sm:px-9">
    <span>© {{ year }} {{ site.name }}</span>
    <span><a :href="site.links.github" class="hover:text-ink">GitHub</a> · <a :href="site.links.blog" class="hover:text-ink">{{ t.blog }}</a> · {{ t.built }}</span>
  </footer>
</template>
