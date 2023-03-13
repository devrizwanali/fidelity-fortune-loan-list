const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //publicPath: process.env.NODE_ENV === 'production' ? '/fidelity-fortune-loan-list/' : '/'
  publicPath: process.env.NODE_ENV === 'production' ? '/webapp/' : '/'
})
