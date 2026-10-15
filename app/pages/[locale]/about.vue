<script setup lang="ts">
import { isPrefixedLocale, type PrefixedLocale } from '~/i18n/locales'
definePageMeta({ validate: route => isPrefixedLocale(String(route.params.locale)) })
const locale = useRoute().params.locale as PrefixedLocale
</script>

<template>
  <AboutView :locale="locale" />
</template>
