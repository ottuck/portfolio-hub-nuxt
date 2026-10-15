<script setup lang="ts">
import { languageNames, localePath, locales, stripLocale, type Locale } from '~/i18n/locales'
defineProps<{ locale: Locale; label: string }>()
const route = useRoute()
const path = computed(() => stripLocale(route.path))
const open = ref(false)
const root = useTemplateRef<HTMLElement>('root')
const trigger = useTemplateRef<HTMLButtonElement>('trigger')
function outside(event: PointerEvent) {
  if (!root.value?.contains(event.target as Node)) open.value = false
}
function escape(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) { open.value = false; trigger.value?.focus() }
}
watch(() => route.path, () => { open.value = false })
onMounted(() => {
  document.addEventListener('pointerdown', outside)
  document.addEventListener('keydown', escape)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', outside)
  document.removeEventListener('keydown', escape)
})
</script>

<template>
  <div ref="root" class="relative">
    <button ref="trigger" type="button" :aria-expanded="open" aria-controls="language-menu" :aria-label="`${label}: ${languageNames[locale]}`" class="flex h-9 items-center gap-1.5 rounded-full border border-line bg-card px-2.5 text-[13px] font-medium text-muted transition-colors hover:text-ink sm:px-3" @click="open = !open">
      <AppIcon name="globe" class="size-4" /><span class="max-sm:hidden">{{ locale.toUpperCase() }}</span>
    </button>
    <ul v-if="open" id="language-menu" class="absolute top-11 right-0 z-20 min-w-36 rounded-2xl border border-line bg-card p-1.5 shadow-[0_16px_32px_-16px_rgba(40,30,20,0.3)]">
      <li v-for="language in locales" :key="language">
        <a :href="localePath(language, path)" :hreflang="language" :lang="language" :aria-current="language === locale ? 'true' : undefined" class="flex items-center justify-between gap-4 rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:bg-chip hover:text-ink aria-[current]:text-ink">
          {{ languageNames[language] }}<AppIcon v-if="language === locale" name="check" class="size-4 text-accent" />
        </a>
      </li>
    </ul>
  </div>
</template>
