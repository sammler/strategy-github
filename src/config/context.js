import mongoose from 'mongoose' ;
import winster from 'winster';

let instance;
export default class Context {
  constructor( ) {
    this.db;
    this.logger = new winster();

    mongoose.Promise = global.Promise;
    mongoose.set( 'debug', false );

    if ( !this.db ) {
      this.dbConnect();
    }
  }

  static instance() {
    if ( !instance ) {
      instance = new Context();
    }
    return instance;
  }

  dbConnect() {
    let uri = 'mongodb://localhost:27017/s5r-mw-github';
    this.db = mongoose.connect( uri );
  }

  dbDisconnect() {
    if ( this.db ) {
      this.db.disconnect();
    }
  }

}
