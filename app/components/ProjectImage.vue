<script setup lang="ts">
import type { ImageAsset } from '~/lib/types'
withDefaults(defineProps<{ asset: ImageAsset; alt: string; sizes: string; priority?: boolean }>(), { priority: false })
</script>

<template>
  <NuxtImg :src="asset.src" :width="asset.width" :height="asset.height" :alt="alt" :sizes="sizes" densities="1x 2x" :placeholder="[10, 10, 20, 50]" :loading="priority ? 'eager' : 'lazy'" :preload="priority" :fetchpriority="priority ? 'high' : undefined" />
</template>
