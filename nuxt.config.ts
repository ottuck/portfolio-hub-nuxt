import tailwindcss from '@tailwindcss/vite'
import routes from './docs/routes.json'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-15',
  ssr: true,
  devtools: { enabled: false },
  modules: ['@nuxt/image', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  nitro: {
    prerender: { routes, crawlLinks: true, failOnError: true, autoSubfolderIndex: false },
  },
  image: {
    quality: 80,
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1152 },
  },
  runtimeConfig: {
    public: {
      assetUrl: process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== 'main' ? (process.env.CF_PAGES_URL || 'https://www.portfolio-hub.dev') : 'https://www.portfolio-hub.dev',
    },
  },
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#f7f3ec' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#171411' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/Geist-Variable.woff2', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/GeistMono-Variable.woff2', crossorigin: 'anonymous' },
      ],
      script: [{
        key: 'theme-init',
        innerHTML: '(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()',
        tagPosition: 'head',
      }],
    },
  },
})
