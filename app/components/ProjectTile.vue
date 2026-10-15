<script setup lang="ts">
import { getDictionary } from '~/i18n/dictionaries'
import { localePath, type Locale } from '~/i18n/locales'
import type { Project } from '~/lib/types'
const props = withDefaults(defineProps<{ project: Project; locale: Locale; priority?: boolean }>(), { priority: false })
const t = computed(() => getDictionary(props.locale))
</script>

<template>
  <article class="tile group flex flex-col transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_40px_-24px_rgba(80,50,20,0.35)]">
    <ProjectShot :project="project" :locale="locale" sizes="xs:100vw sm:100vw md:560px" :priority="priority" class="aspect-[16/11] md:aspect-auto md:flex-1" />
    <div class="border-t border-line px-5 pt-4 pb-5 sm:px-6">
      <div class="flex items-center justify-between gap-3">
        <h3 class="text-xl font-semibold tracking-tight"><NuxtLink :to="localePath(locale, `/projects/${project.slug}`)" class="after:absolute after:inset-0 after:content-['']">{{ project.name }}</NuxtLink></h3>
        <StatusLabel :project="project" :locale="locale" />
      </div>
      <p class="mt-1.5 text-[15px] leading-relaxed text-muted">{{ project.tagline }}</p>
      <div class="mt-3 flex items-center gap-4 text-[13px] font-medium">
        <a v-if="project.links.live" :href="project.links.live.href" class="relative z-10 inline-flex items-center gap-0.5 hover:text-accent">{{ project.links.live.label }}<span class="sr-only"> — {{ project.name }} {{ t.project.liveSite }}</span><AppIcon name="arrow-up-right" class="size-3.5" /></a>
        <a v-if="project.links.github" :href="project.links.github" class="relative z-10 inline-flex items-center gap-0.5 hover:text-accent">GitHub<span class="sr-only"> — {{ project.name }} {{ t.project.source }}</span><AppIcon name="arrow-up-right" class="size-3.5" /></a>
        <a v-if="project.links.guide" :href="project.links.guide.href" class="relative z-10 inline-flex items-center gap-0.5 hover:text-accent">{{ project.links.guide.label }}<span class="sr-only"> — {{ project.name }}</span><AppIcon name="arrow-up-right" class="size-3.5" /></a>
        <span class="ml-auto font-mono text-xs font-normal text-faint max-sm:hidden">{{ project.cardStack.join(' · ') }}</span>
      </div>
    </div>
  </article>
</template>
