module.exports = function(app) {
    app.use(
      '',
      createProxyMiddleware({
        target: 'http://localhost:3000',
        changeOrigin: true,
      })
    );
  };