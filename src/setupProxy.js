const connectProxyMiddleware = require('../server/proxy');

module.exports = app => {
  connectProxyMiddleware(app);
};
