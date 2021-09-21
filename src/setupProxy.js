const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    ['/skills', '/employees'],
    createProxyMiddleware({
      target: 'http://172.20.134.20',
      changeOrigin: true,
      logLevel: 'debug',
    }),
  );
};
