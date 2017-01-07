const AppServer = require('./app-server');

const config = {
  port: process.env.PORT
};

const appServer = new AppServer(config);
appServer.start();
appServer.dbConnect();
