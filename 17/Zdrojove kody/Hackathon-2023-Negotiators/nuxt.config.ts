// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase','nuxt-chatgpt', '@pinia/nuxt' ],
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm', // <--
      exclude: ['/', '/onas', '/nastenka-skol', '/register', '/odpo'],
    }
  },
  chatgpt: {
    apiKey: process.env.OPENAI_KEY,
  }

})
