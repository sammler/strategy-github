import mongoose from 'mongoose' ;
import Logger from './../helper/logger';

let instance;
export default class Context {
  constructor() {
    this.db;
    this.logger = new Logger();

    mongoose.Promise = global.Promise;

    //Todo: make this configurable
    mongoose.set( 'debug', false );

    if ( !this.db ) {
      this.dbConnect();
    }
  }

  static TABLE_PREFIX = 'github~~';
  static FIELD_CREATED_AT = 's5r_created_at';
  static FIELD_UPDATED_AT = 's5r_updated_at';

  static COLLECTION_PROFILES = 'profiles';
  static COLLECTION_PROFILE_HISTORY = 'profile-history';

  static instance() {
    if ( !instance ) {
      instance = new Context();
    }
    return instance;
  }

  dbConnect() {

      //Todo: Check for mongoose.connection.readyState: http://stackoverflow.com/questions/19599543/check-mongoose-connection-state-without-creating-new-connection
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
