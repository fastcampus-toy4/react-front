const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://155.248.175.96:8080',
      changeOrigin: true,
    })
  );
};