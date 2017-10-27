const config = require('./config');
const app = require('./src/app.js');
const notifier = require('node-notifier');

function init(port) {
  const server = app.listen(port);
  server.maxConnections = 1024;

  if (process.NODE_ENV !== 'production') {
    const tag = config.IS_SANDBOX ? '[DEBUG]' : '[PRODUCTION]';
    console.log(`${tag} API Server [${config.VERSION}] Started at port: ${port}`);
    notifier.notify({
      title: 'API Server Started',
      message: `Port: ${port}`,
      icon: './ok.png',
      sound: true
    });
  }

  return server;
}

module.exports = init(config.PORT);
