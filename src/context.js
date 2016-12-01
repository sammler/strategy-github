import winster from 'winster';
const mongoose = require( 'mongoose' );

export default class Context {
  constructor() {
    this.logger = new winster();
    this.db;
    mongoose.Promise = global.Promise;
    mongoose.set( 'debug', true );
  }

  dbConnect() {
    let uri = 'mongodb://localhost:27017/s5r-mw-github';
    this.db = mongoose.connect( uri );
  }

  dbDisconnect() {
    if ( this.db ) {
      mongoose.disconnect();
    }
  }

}
