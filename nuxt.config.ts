import tailwindcss from '@tailwindcss/vite'
// `pnpm assets` writes this list from the project content.
import routes from './docs/routes.json'
// Unlisted pages have no links pointing at them, so the crawler would never find them.
// `pnpm assets` writes this list from the project content.
import unlisted from './app/generated/unlisted-routes.json'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-15',
  ssr: true,
  devtools: { enabled: false },
  modules: ['@nuxt/image', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  nitro: {
    // Pages environment detection otherwise selects an adapter that writes dist
    // and adds a SPA fallback. Deployment must remain a plain static directory.
    preset: process.env.NODE_ENV === 'development' ? 'node-server' : 'static',
    prerender: { routes: [...routes, ...unlisted], crawlLinks: true, failOnError: true, autoSubfolderIndex: false },
  },
  image: {
    quality: 80,
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1152 },
  },
  runtimeConfig: {
    public: {
      // Static HTML and its client payload need this value at build time.
      assetUrl: process.env.NUXT_PUBLIC_ASSET_URL || (process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== 'main' ? (process.env.CF_PAGES_URL || 'https://www.portfolio-hub.dev') : 'https://www.portfolio-hub.dev'),
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
