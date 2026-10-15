<script setup lang="ts">
import { site } from '~/content/site'
import { getDictionary } from '~/i18n/dictionaries'
import type { Locale } from '~/i18n/locales'
const props = defineProps<{ locale: Locale; nativeNavigation?: boolean }>()
const t = computed(() => getDictionary(props.locale))
</script>

<template>
  <header class="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 pt-5 pb-4 sm:gap-3 sm:px-8 sm:pt-7">
    <SiteNav :locale="locale" :native-navigation="nativeNavigation" />
    <div class="flex items-center gap-1.5 sm:gap-2">
      <LanguageSwitch :locale="locale" :label="t.language.label" />
      <ThemeToggle :labels="t.theme" />
      <a :href="site.links.github" class="grid size-9 place-items-center rounded-full border border-line bg-card text-muted transition-colors hover:text-ink max-sm:hidden" aria-label="GitHub"><AppIcon name="github" class="size-4" /></a>
    </div>
  </header>
</template>
