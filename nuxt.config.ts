// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  tailwindcss: {
    configPath: 'tailwind.config.ts',
  },
  css: ['~~/assets/css/main.css'],
  googleFonts: {
    families: {
      'Space+Grotesk': [400, 500, 700],
      'VT323': [400]
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
