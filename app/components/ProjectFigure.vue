<script setup lang="ts">
import type { Shot } from '~/lib/types'
const props = withDefaults(defineProps<{ shot: Shot; ratio?: number; grid?: boolean }>(), { grid: false, ratio: undefined })
const phone = computed(() => props.shot.frame === 'phone')
const style = computed(() => props.grid ? { aspectRatio: props.shot.src.width / props.shot.src.height } : phone.value ? undefined : { aspectRatio: props.ratio })
</script>

<template>
  <figure :style="style" class="relative overflow-hidden rounded-[20px] border border-line bg-card" :class="phone && !grid ? 'mx-auto aspect-[9/16] w-2/3 max-w-72 md:aspect-auto md:w-full md:max-w-none' : ''">
    <ProjectImage :asset="shot.src" :alt="shot.alt" :sizes="grid ? 'xs:50vw sm:50vw md:25vw lg:25vw xl:25vw' : phone ? 'xs:66vw sm:66vw md:220px' : 'xs:100vw sm:50vw md:50vw lg:50vw xl:50vw'" class="absolute inset-0 h-full w-full" :class="phone ? 'object-cover object-top' : 'object-contain'" />
  </figure>
</template>
