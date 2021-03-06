const Winster = require('winster');
const MongooseClient = require('./mongoose-client');

let instance;
class Context {
  constructor() {

    this.logger = Winster.instance();

    const uri = process.env.SAMMLER_STRATEGY_GITHUB_DB_URI || 'mongodb://localhost:27017/test-github';

    //Todo: Promise is completely ignored here ...
    this.db = new MongooseClient(uri);

  }

  static instance() {
    if (!instance) {
      instance = new Context();
    }
    return instance;
  }
}

module.exports = Context;
