const {API_URL_PREFIXES} = require("../src/constants/apiUrlPrefixes");
const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = app => {
    app.use(
        [API_URL_PREFIXES.PREFIX_BASE_URL],
        createProxyMiddleware({
            target: process.env.API_BASE_URL,
            changeOrigin: true,
            logLevel: 'debug',
        })
    );
};