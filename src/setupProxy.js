const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    ['/api'],
    createProxyMiddleware({
      target: 'http://172.20.134.20',
      pathRewrite: {
        '^/api/': '/',
      },
      changeOrigin: true,
      logLevel: 'debug',
    }),
  );
};
