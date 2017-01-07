const Context = require('./../src/api/config/context');

class Global {
  constructor() {
    process.env.NODE_ENV = 'test';
    this.Context = Context.instance();
  }
}

module.exports = Global;
