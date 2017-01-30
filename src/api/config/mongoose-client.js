const mongoose = require('mongoose');

// Todo: Break out to a re-usable library
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
    return new Promise((resolve, reject) => {
      this.connection = mongoose.connection;
      mongoose.connect(this.mongoUri, options)
        .then(() => {
          return resolve(this.connection);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  disconnect() {
    if (this.connection && this.connection.readyState === 1) {
      this.connection.disconnect();
    }
  }

  // Todo: simplify
  /**
   * Get a connection.
   * @returns {Promise}
   */
  get() {
    return new Promise((resolve, reject) => {
      if (this.connection && this.connection.readyState === 1) {
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
        .then(conn => {
          conn.dropDatabase(err => {
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
