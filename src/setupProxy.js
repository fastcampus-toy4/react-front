const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://spring-boot-app:8080',
      changeOrigin: true,
    })
  );
};