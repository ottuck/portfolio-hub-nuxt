<script setup lang="ts">
import { site } from '~/content/site'
import type { Locale } from '~/i18n/locales'
const props = defineProps<{ locale: Locale }>()
const time = ref('')
const date = ref('')
let interval: ReturnType<typeof setInterval> | undefined
const timeFormat = new Intl.DateTimeFormat('en-US', { timeZone: site.timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
function update() {
  const now = new Date()
  time.value = timeFormat.format(now)
  date.value = new Intl.DateTimeFormat({ en: 'en-US', ja: 'ja-JP', ko: 'ko-KR' }[props.locale], { timeZone: site.timeZone, weekday: 'short', month: 'short', day: 'numeric' }).format(now)
}
onMounted(() => { update(); interval = setInterval(update, 15_000) })
onBeforeUnmount(() => { clearInterval(interval) })
</script>

<template>
  <div><p class="h-10 text-4xl font-medium tracking-tight tabular-nums">{{ time }}</p><p class="mt-0.5 h-4 text-xs text-night-muted">{{ date }}</p></div>
</template>
