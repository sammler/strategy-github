const mongoose = require('mongoose');

class MongooseClient {

  constructor(mongoUri) {
    this.mongoUri = mongoUri;
    this.connection = null;

    mongoose.Promise = global.Promise;
    mongoose.set('debug', false);

  }

  /**
   * Connect mongoose to the given instance of MongoDB.
   * @returns {*|MongooseThenable}
   */
  connect() {
    const options = {
      server: {
        poolSize: 5,
        auto_reconnect: true,
        socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000},
        replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}}
      }
    };

    return mongoose.connect(this.mongoUri, options);
  }

  disconnect() {
    if (this.connection) {
      this.connection.disconnect();
    }
  }

  // Todo: simplify
  get() {
    return new Promise((resolve, reject) => {
      if (this.connection) {
        return resolve(this.connection);
      }
      this.connect()
        .then(() => {
          return resolve(this.connection);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  // Todo: simplify
  dropDatabase() {
    return new Promise((resolve, reject) => {
      this.get()
        .then(connection => {
          connection.dropDatabase(err => {
            if (err) {
              return reject(err);
            }
            return resolve();
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = MongooseClient;
