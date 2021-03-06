
const es = require('vuetify/es5/locale/es').default

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#b00dab'},
  /*
  ** Global CSS
  */
  css: [
    '~assets/variables.scss',
    '~assets/css/animate.css',

  ],
  router: {
    middleware: ['auth']
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/mixins/responses.js',
    '~plugins/mixins/utils.js',
    { src: '~/plugins/vue-toast', mode: 'client' },
    { src: '~plugins/mixins/toasts.js', mode: 'client' },
    { src: '~plugins/confirmDialog.js', mode: 'client' },
    { src: '~plugins/vue-the-mask', mode: 'client' },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/proxy'
  ],
  auth: {
    strategies: {
      'local': {
        endpoints: {
          login: {
            url: 'auth/login',
            method: 'post',
            propertyName: 'message'
          },
          user: {
            url: 'auth/user',
            method: 'get',
            propertyName: ''
          },
          logout: {
            url: 'auth/logout',
            method: 'get'
          }
        }
      }
    },
    redirect: {
      login: '/auth/login',
      home: '/',
      logout: '/auth/login',
    }
  },
  proxy: {
    '/api': {
      target: 'https://www.api.vety.bytecuba.com/api/',
      pathRewrite: {
        '^/api' : '/'
      },
      changeOrigin: true
    }
    //'/api': 'https://www.api.vety.bytecuba.com/'
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    //proxy: true,
    baseURL: 'https://www.api.vety.bytecuba.com/api/',
    /*headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },*/
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          //primary: '#c70d54',
          background: '#ffffff',
          navBarColor: '#c70d54',
          secondaryBackground: '#ffffff',
          primaryTopBar: '#ffffff',
        },
        dark: {
          //primary: '#80217D',
          background: '#353a40',
          navBarColor: '#80217D',
          secondaryBackground: '#2f2f2f',
          primaryTopBar: '#1E1E1E',
        }
      }
    },
    lang: {
      locales: { es },
      current: 'es',
    }
  },
  /*
  ** Build configuration
  */
  build: {
    // Add exception
    transpile: [
      "vee-validate/dist/rules"
    ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: {
            fix: true,
          }
        })
      }
    }
  }
}
