export default {
  ssr: false,

  head: {
    title: 'Fortuna Admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [

  ],

  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  axios: {
    baseURL: "http://fortuna-api.test",
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/account'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/login', method: 'post', propertyName: false },
          logout: { url: '/api/logout', method: 'post', propertyName: false },
          user: { url: '/api/user', method: 'get', propertyName: false }
        },
        autoFetchUser: false,
        tokenRequired: true,
        tokenType: false
      }
    },
    localStorage: false
  },

  build: {
  }
}
