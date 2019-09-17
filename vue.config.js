const configureAPI = require('./src/server/configure')

module.exports = {
    configureWebpack:{
    }, 
    devServer: {
        before: configureAPI,
    }
  }