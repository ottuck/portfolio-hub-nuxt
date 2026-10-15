<script setup lang="ts">
import type { ImageAsset } from '~/lib/types'
import placeholders from '~/generated/image-placeholders.json'
const props = withDefaults(defineProps<{ asset: ImageAsset; alt: string; sizes: string; priority?: boolean }>(), { priority: false })
const loaded = ref(false)
const placeholder = computed(() => (placeholders as Record<string, string>)[props.asset.src])
</script>

<template>
  <NuxtImg :src="asset.src" :width="asset.width" :height="asset.height" :alt="alt" :sizes="sizes" densities="1x 2x" :loading="priority ? 'eager' : 'lazy'" :preload="priority" :fetchpriority="priority ? 'high' : undefined" :style="!loaded && placeholder ? { backgroundImage: `url(${placeholder})`, backgroundSize: 'cover' } : undefined" @load="loaded = true" />
</template>
