import mongoose from 'mongoose' ;
import ServiceManager from 'service-manager';

export default class Context {
  constructor() {
    this.db;
    mongoose.Promise = global.Promise;
    mongoose.set( 'debug', true );
  }

  dbConnect() {
    let uri = ServiceManager.instance().get( 'dbConfig.uri' );
    this.db = mongoose.connect( uri );
  }

  dbDisconnect() {
    if ( this.db ) {
      mongoose.disconnect();
    }
  }

}
