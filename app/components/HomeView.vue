<script setup lang="ts">
import { site } from '~/content/site'
import { getDictionary } from '~/i18n/dictionaries'
import { localePath, type Locale } from '~/i18n/locales'
import { getProjects } from '~/lib/projects'
const props = defineProps<{ locale: Locale }>()
const t = computed(() => getDictionary(props.locale))
const projects = computed(() => getProjects(props.locale))
const blogHost = new URL(site.links.blog).hostname
usePageSeo(() => props.locale, '/')
useStructuredData(() => ({
  '@context': 'https://schema.org', '@type': 'Person', name: site.name, jobTitle: t.value.profile.role,
  url: new URL(localePath(props.locale, '/'), site.url).toString(), sameAs: [site.links.github, site.links.blog], knowsAbout: site.stack,
  workLocation: { '@type': 'Place', name: t.value.profile.location },
}))
</script>

<template>
  <main id="main" class="mx-auto max-w-6xl px-4 sm:px-8">
    <h1 class="sr-only">{{ site.name }} — {{ t.profile.role }}</h1>
    <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[148px] md:gap-3.5">
      <section class="tile col-span-2 flex flex-col justify-between gap-8 p-6 md:row-span-2">
        <div aria-hidden="true" class="grid size-14 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#f7b267,#d9622b_60%,#9c3d1a)] text-xl font-semibold text-white">{{ site.shortName[0] }}</div>
        <div>
          <p class="hero-title text-[30px] leading-[1.1] font-semibold tracking-[-0.035em] sm:text-[38px]">{{ t.profile.greeting }}<br><span class="text-accent">{{ t.profile.greetingName }}</span></p>
          <p class="mt-3 max-w-[470px] text-[15.5px] leading-relaxed text-muted">{{ t.profile.intro }}</p>
        </div>
      </section>
      <section :aria-label="t.home.clockLabel" class="tile flex min-h-36 flex-col justify-between border-night bg-night p-5 text-night-ink sm:p-6">
        <div aria-hidden="true" class="absolute -top-8 -right-8 size-32 rounded-full bg-[radial-gradient(circle,var(--color-sun)_0_22px,rgb(247_178_103/0.18)_23px_44px,rgb(247_178_103/0.07)_45px_64px,transparent_65px)]" />
        <span class="eyebrow text-night-muted!">{{ t.home.clockEyebrow }}</span><TokyoClock :locale="locale" />
      </section>
      <section class="tile flex min-h-36 flex-col justify-between p-5 sm:p-6">
        <h2 class="eyebrow">{{ t.home.dayJob }}</h2>
        <div><p class="text-xl leading-tight font-semibold tracking-tight">{{ t.profile.dayJob.title }}</p><p class="mt-1 text-[13px] text-muted">{{ t.profile.dayJob.detail }}</p></div>
      </section>
      <section class="tile col-span-2 p-5 sm:p-6">
        <h2 class="eyebrow">{{ t.home.stack }}</h2>
        <ul class="mt-3 flex flex-wrap gap-1.5"><li v-for="tech in site.stack" :key="tech" class="rounded-lg bg-chip px-2.5 py-1 text-[13px]">{{ tech }}</li></ul>
      </section>
      <h2 class="sr-only">{{ t.home.projects }}</h2>
      <ProjectTile v-for="(project, i) in projects" :key="project.slug" :project="project" :locale="locale" :priority="i < 2" class="col-span-2 md:row-span-3" />
      <a :href="site.links.blog" class="tile group col-span-2 flex min-h-32 flex-col justify-between p-5 sm:p-6" :class="projects.length % 2 === 1 ? 'md:row-span-2' : ''">
        <span class="eyebrow">{{ t.home.writing }}</span>
        <div><p class="text-xl font-semibold tracking-tight group-hover:text-accent">{{ t.home.blog }}</p><p class="mt-1 inline-flex items-center gap-1 font-mono text-xs text-faint">{{ blogHost }}<AppIcon name="arrow-up-right" class="size-3" /></p></div>
        <div aria-hidden="true" class="absolute right-6 bottom-6 hidden w-2/5 flex-col gap-2 sm:flex"><i v-for="width in [90, 70, 80, 55]" :key="width" class="block h-2 rounded bg-chip" :style="{ width: `${width}%` }" /></div>
      </a>
      <a :href="site.links.github" class="tile group flex min-h-36 flex-col justify-between p-5 sm:p-6">
        <span class="flex items-center justify-between text-sm font-medium">GitHub<AppIcon name="arrow-up-right" class="size-4 text-faint group-hover:text-accent" /></span>
        <div><AppIcon name="github" class="size-8" /><p class="mt-2 font-mono text-xs text-faint">@{{ site.githubHandle }}</p></div>
      </a>
      <NuxtLink :to="localePath(locale, '/about')" class="tile group flex min-h-36 flex-col justify-between border-accent bg-accent p-5 text-accent-ink sm:p-6">
        <span class="text-sm font-medium">{{ t.home.moreAboutMe }}</span><span class="flex items-center justify-between text-[22px] font-semibold tracking-tight">{{ t.home.about }}<AppIcon name="arrow-right" class="size-5 transition-transform group-hover:translate-x-1" /></span>
      </NuxtLink>
    </div>
  </main>
</template>
