const mongoose = require('mongoose');
const Logger = require('./../helper/logger');

let instance;
class Context {
  constructor() {
    this.logger = new Logger();
    this.db = null;

    mongoose.Promise = global.Promise;

    // Todo: make this configurable
    mongoose.set('debug', false);

    if (!this.db) {
      this.dbConnect();
    }
  }

  static instance() {
    if (!instance) {
      instance = new Context();
    }
    return instance;
  }

  dbConnect() {
    // Todo: Check for mongoose.connection.readyState: http://stackoverflow.com/questions/19599543/check-mongoose-connection-state-without-creating-new-connection
    // Todo: make this configurable
    const uri = 'mongodb://localhost:27017/s5r-s-github';
    const options = {
      server: {
        poolSize: 5
      }
    };
    this.db = mongoose.connect(uri, options);
  }

  dbDisconnect() {
    if (this.db) {
      this.db.disconnect();
    }
  }

}

module.exports = Context;
