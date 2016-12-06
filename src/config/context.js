import mongoose from 'mongoose' ;
import Logger from './../helper/logger';

let instance;
export default class Context {
  constructor( ) {
    this.db;
    this.logger = new Logger();




    mongoose.Promise = global.Promise;
    mongoose.set( 'debug', false );

    console.log( 'this.db', this.db );
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
    let options = {
      server: {
        poolSize: 5
      }
    };
    this.db = mongoose.connect( uri, options );
  }

  dbDisconnect() {
    if ( this.db ) {
      this.db.disconnect();
    }
  }

}
