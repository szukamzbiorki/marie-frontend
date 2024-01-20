// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/index.css'],
  site: {
    // url: 'https://turnusik.info',
    name: 'Marie Gertsen',
    defaultLocale: 'en',
    identity: {
      type: 'Person',
    },
  },
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'fade',
      mode: 'out-in',
    },
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        {
          src: '/bugs/bug-min.js',
          // body: true,
        },
      ],
    },
  },
  sanity: {
    projectId: 'vhiolxil',
    dataset: 'production',
  },
  modules: [
    '@nuxtjs/sanity',
    '@vueuse/nuxt',
    '@nuxtseo/module',
    'nuxt-swiper',
    '@sidebase/nuxt-session',
  ],
  postcss: {
    plugins: {
      'postcss-preset-env': {
        stage: 0,
        features: {
          'nesting-rules': false,
        },
        'postcss-nested': {},
      },
    },
  },
  nitro: {
    preset: 'netlify',
  },
  ssr: false,
})
