import mongoose from 'mongoose' ;
import Logger from './../helper/logger';

let instance;
export default class Context {
  constructor( ) {
    this.db;
    this.logger = new Logger();
    
    mongoose.Promise = global.Promise;

    //Todo: make this configurable
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
    //Todo: make this configurable
    let uri = 'mongodb://localhost:27017/s5r-s-github';
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
