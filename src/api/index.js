const AppServer = require('./app-server');

const appServer = new AppServer();
appServer.start();
appServer.dbConnect();
