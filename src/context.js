import winster from 'winster';
const mongoose = require( 'mongoose' );

export default class Context {
  constructor() {
    this.logger = new winster();
    this.db;

  }

  dbConnect() {
    let uri = 'mongodb://localhost:27017/s5r-mw-github';
    this.db = mongoose.createConnection( uri );
  }

  dbDisconnect() {
    console.log( this.db );

    if ( this.db ) {
      this.db.disconnect();
    }
  }

}
