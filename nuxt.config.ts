// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  modules: [
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt'
  ],

  css: [
    "./assets/style.css",
  ],

  app: {
    head: {
      charset: "utf-8",
      viewport: 'width=device-width, initial-scale=1',
      title: "KALMAR",
      link: [
        { href: "./logo.png", rel: "icon" }
      ]
    }
  },

  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, tailwind-utilities, primevue',
          },
          darkModeSelector: ".dark"
        }
      }
    },
    autoImport: true,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  ssr: false,
  compatibilityDate: '2024-08-27'
})