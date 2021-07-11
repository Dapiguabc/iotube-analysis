const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api-gateway/',
    createProxyMiddleware({
      target: 'http://localhost:5557',
      changeOrigin: true,
    })
  );
};