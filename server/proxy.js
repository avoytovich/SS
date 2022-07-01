const {createProxyMiddleware} = require('http-proxy-middleware');
const {API_URL_PREFIXES} = require('../src/constants/apiUrlPrefixes');

module.exports = app => {
  app.use(
    [API_URL_PREFIXES.PREFIX_BASE_URL],
    createProxyMiddleware({
      target: process.env.API_BASE_URL,
      changeOrigin: true,
      logLevel: 'debug',
      secure: false
    })
  );
};
