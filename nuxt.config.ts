// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      'Space+Grotesk': [400, 500, 700]
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
