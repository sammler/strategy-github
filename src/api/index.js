const AppServer = require('./appServer');

const appServer = new AppServer();
appServer.start();
appServer.dbConnect();
