<script setup lang="ts">
import { site } from '~/content/site'
import { getDictionary } from '~/i18n/dictionaries'
import { localePath, type Locale } from '~/i18n/locales'
import { getAdjacent, getMerged, getProject } from '~/lib/projects'
import type { Project } from '~/lib/types'
const props = defineProps<{ locale: Locale; project: Project }>()
const t = computed(() => getDictionary(props.locale).project)
const adjacent = computed(() => getAdjacent(props.project.slug, props.locale))
const merged = computed(() => getMerged(props.project.slug, props.locale))
const parent = computed(() => props.project.mergedInto ? getProject(props.project.mergedInto, props.locale) : undefined)
const screens = computed(() => props.project.gallery.filter(shot => shot.frame !== 'phone'))
const phones = computed(() => props.project.gallery.filter(shot => shot.frame === 'phone'))
const screenRatio = computed(() => { const ratios = screens.value.map(shot => shot.src.width / shot.src.height).toSorted((a, b) => a - b); return ratios[Math.floor(ratios.length / 2)] ?? 16 / 10 })
usePageSeo(() => props.locale, () => `/projects/${props.project.slug}`, () => ({ title: props.project.name, description: props.project.summary, type: 'article', noindex: props.project.unlisted }))
useStructuredData(() => ({ '@context': 'https://schema.org', '@type': 'CreativeWork', name: props.project.name, description: props.project.summary, ...(props.project.links.live && { url: props.project.links.live.href }), ...(props.project.links.github && { codeRepository: props.project.links.github }), inLanguage: props.locale, author: { '@type': 'Person', name: site.name, url: site.links.github } }))
</script>

<template>
  <main id="main" class="mx-auto max-w-6xl px-4 pb-8 sm:px-8">
    <NuxtLink :to="localePath(locale, parent ? `/projects/${parent.slug}` : '/projects')" class="mt-6 mb-6 inline-flex items-center gap-1.5 px-1 text-sm text-muted hover:text-ink sm:mt-10"><AppIcon name="arrow-left" class="size-4" />{{ parent ? t.backTo.replace('{name}', parent.name) : t.back }}</NuxtLink>
    <header class="grid gap-6 px-1 md:grid-cols-[1fr_auto] md:items-end md:gap-8">
      <div><StatusLabel :project="project" :locale="locale" /><h1 class="mt-4 text-5xl leading-none font-semibold tracking-[-0.045em] sm:text-6xl">{{ project.name }}</h1><p class="mt-6 max-w-2xl text-lg sm:mt-7 leading-relaxed text-muted sm:text-xl">{{ project.summary }}</p></div>
      <div v-if="project.links.live || project.links.github || project.links.guide" class="flex flex-wrap gap-2.5">
        <a v-if="project.links.live" :href="project.links.live.href" class="inline-flex h-11 items-center gap-1 rounded-full bg-accent px-5 text-[15px] font-medium text-accent-ink transition-opacity hover:opacity-90">{{ project.links.live.label }}<AppIcon name="arrow-up-right" class="size-4" /></a>
        <a v-if="project.links.github" :href="project.links.github" class="inline-flex h-11 items-center gap-1 rounded-full border border-line bg-card px-5 text-[15px] font-medium transition-colors hover:border-ink/30">GitHub<AppIcon name="arrow-up-right" class="size-4" /></a>
        <a v-for="repo in project.links.repos" :key="repo.href" :href="repo.href" class="inline-flex h-11 items-center gap-1 rounded-full border border-line bg-card px-5 text-[15px] font-medium transition-colors hover:border-ink/30">GitHub · {{ repo.label }}<AppIcon name="arrow-up-right" class="size-4" /></a>
        <a v-if="project.links.guide" :href="project.links.guide.href" class="inline-flex h-11 items-center gap-1 rounded-full border border-line bg-card px-5 text-[15px] font-medium transition-colors hover:border-ink/30">{{ project.links.guide.label }}<AppIcon name="arrow-up-right" class="size-4" /></a>
      </div>
    </header>
    <div v-if="project.cover.main" class="relative mt-8 aspect-[16/10] overflow-hidden rounded-[28px] border border-line sm:mt-10 md:aspect-[16/8]" :style="{ backgroundImage: `linear-gradient(160deg, ${project.cover.tint[0]}, ${project.cover.tint[1]})` }"><ProjectImage :asset="project.cover.main.src" :alt="project.cover.main.alt" priority sizes="xs:88vw sm:88vw md:88vw lg:88vw xl:960px" class="absolute top-[7%] left-[6%] h-auto w-[88%] rounded-t-xl shadow-[0_30px_60px_-20px_rgba(40,30,20,0.35)]" /></div>
    <ProjectShot v-else :project="project" :locale="locale" sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw" class="mt-8 aspect-[16/10] rounded-[28px] border border-line sm:mt-10 md:aspect-[16/7]" />
    <dl v-if="project.facts.length" class="mt-3 grid grid-cols-2 gap-3 md:gap-3.5" :class="project.facts.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'"><div v-for="(fact, i) in project.facts" :key="fact.label" class="rounded-2xl border border-line bg-card px-5 py-4" :class="project.facts.length % 2 === 1 && i === project.facts.length - 1 ? 'col-span-2 md:col-span-1' : ''"><dt class="eyebrow">{{ fact.label }}</dt><dd class="mt-1.5 text-[15px]">{{ fact.value }}</dd></div></dl>
    <div v-if="project.about.length || project.features.length" class="mt-16 grid gap-12 px-1 md:mt-20 md:grid-cols-2 md:gap-16">
      <section><h2 class="eyebrow mb-4">{{ t.about }}</h2><div class="space-y-4 text-[17px] leading-[1.75] text-muted"><p v-for="paragraph in project.about" :key="paragraph">{{ paragraph }}</p></div></section>
      <section><h2 class="eyebrow mb-4">{{ t.features }}</h2><dl><div v-for="feature in project.features" :key="feature.title" class="grid gap-1 border-t border-line py-3.5 sm:grid-cols-[150px_1fr] sm:gap-4"><dt class="font-medium">{{ feature.title }}</dt><dd class="leading-relaxed text-muted">{{ feature.body }}</dd></div></dl></section>
    </div>
    <section v-if="project.architecture" class="mt-16 md:mt-20"><h2 class="eyebrow mb-4 px-1">{{ t.architecture }}</h2><ProjectDiagram :diagram="project.architecture" :title="`${project.name} — ${t.architecture}`" /></section>
    <section v-if="project.stack.length" class="mt-16 grid gap-4 px-1 md:mt-20 md:grid-cols-[1fr_2fr] md:gap-16"><h2 class="eyebrow">{{ t.built }}</h2><dl class="text-[15px]"><div v-for="row in project.stack" :key="row.area" class="grid gap-1 border-t border-line py-3 sm:grid-cols-[140px_1fr] sm:gap-4"><dt class="text-faint">{{ row.area }}</dt><dd>{{ row.items }}</dd></div></dl></section>
    <section v-if="!screens.length && phones.length" class="mt-16 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-3.5" :aria-label="t.screenshots"><ProjectFigure v-for="shot in phones" :key="shot.alt" :shot="shot" grid /></section>
    <section v-if="screens.length" class="mt-16 md:mt-20" :aria-label="t.screenshots"><div class="grid gap-3 md:gap-3.5" :class="phones.length ? 'md:grid-cols-[minmax(0,1fr)_minmax(0,0.24fr)]' : ''"><div class="grid gap-3 sm:grid-cols-2 md:gap-3.5"><ProjectFigure v-for="shot in screens" :key="shot.alt" :shot="shot" :ratio="screenRatio" /></div><ProjectFigure v-for="shot in phones" :key="shot.alt" :shot="shot" /></div></section>
    <section v-if="merged.length" class="mt-16 md:mt-20"><h2 class="eyebrow px-1">{{ t.history }}</h2><p class="mt-3 max-w-2xl px-1 text-[15px] leading-relaxed text-muted">{{ t.historyLead.replace('{name}', project.name) }}</p><div class="mt-5 grid gap-3 md:grid-cols-2 md:gap-3.5"><article v-for="item in merged" :key="item.slug" class="tile group relative flex flex-col gap-3 p-6 transition-[translate] duration-300 hover:-translate-y-0.5"><StatusLabel :project="item" :locale="locale" /><h3 class="text-xl font-semibold tracking-tight"><NuxtLink :to="localePath(locale, `/projects/${item.slug}`)" class="after:absolute after:inset-0 after:content-[''] group-hover:text-accent">{{ item.name }}</NuxtLink></h3><p class="text-[15px] leading-relaxed text-muted">{{ item.tagline }}</p><span class="mt-auto font-mono text-xs text-faint">{{ item.cardStack.join(' · ') }}</span></article></div></section>
    <p v-if="project.footnote" class="mt-10 px-1 text-[13px] text-faint">{{ project.footnote }}</p>
    <nav v-if="adjacent.prev || adjacent.next" :aria-label="t.more" class="mt-16 flex justify-between gap-4 border-t border-line px-1 pt-6 text-[15px] text-muted">
      <NuxtLink v-if="adjacent.prev" :to="localePath(locale, `/projects/${adjacent.prev.slug}`)" class="group">{{ t.previous }}<span class="mt-1 flex items-center gap-1.5 text-xl font-semibold tracking-tight text-ink group-hover:text-accent"><AppIcon name="arrow-left" class="size-5" />{{ adjacent.prev.name }}</span></NuxtLink><span v-else />
      <NuxtLink v-if="adjacent.next" :to="localePath(locale, `/projects/${adjacent.next.slug}`)" class="group text-right">{{ t.next }}<span class="mt-1 flex items-center justify-end gap-1.5 text-xl font-semibold tracking-tight text-ink group-hover:text-accent">{{ adjacent.next.name }}<AppIcon name="arrow-right" class="size-5" /></span></NuxtLink>
    </nav>
  </main>
</template>

