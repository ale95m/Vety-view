const express = require('express')
//const { createProxyMiddleware } = require('http-proxy-middleware');
//const cors = require('cors')
const { Nuxt, Builder } = require('nuxt')
const app = express()


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  //app.use('/api', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));

  // Give nuxt middleware to express
  //app.use(cors({ origin: true }))

  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  /*consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })*/
  console.log(`Server listening on my cheat http://${host}:${port}`)
}
start()
