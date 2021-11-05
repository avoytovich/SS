const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    ['/api'],
    createProxyMiddleware({
      target: 'http://skills.lohika.com',
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
};
