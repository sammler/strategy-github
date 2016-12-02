import ServiceManager from 'service-manager';
import winster from 'winster';
//import mongoose from 'mongoose';

export function init() {

  if ( !ServiceManager.isInitialized ) {
    ServiceManager.initialize( {

      dbConfig: () => ( {
        uri: 'mongodb://localhost:27017/s5r-mw-github'
      } ),

      //db: sm => {
      //
      //  let conn;
      //  let dbObj = {
      //    connection: conn,
      //    dbConnect: () => {
      //      conn = mongoose.connect( sm.get( 'dbConfig.uri' ) );
      //    }
      //  };
      //
      //  return dbObj;
      //
      //},

      logger: () => new winster()

    } );
  }
}



