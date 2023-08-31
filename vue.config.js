const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/adminapi/user/login': {
        target: 'http://localhost:3000',
        changeOrigin:true,
      },
    }
  }
  
})
