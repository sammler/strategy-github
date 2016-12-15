import Context from './../../src/api/config/context';

export default class DBHelpers {
  constructor( context ) {
    if ( !context ) {
      context = Context.instance();
    }
    this.context = context;
    this.logger = this.context.logger;
    this.db = this.context.db;
  }

  dropDatabase( done ) {
    this.context.db.connection.dropDatabase( ( err ) => {
      done( err );
    } )
  }

  //dropProfileCollection( done ) {
  //  this.context.db.connection.db.dropCollection( 's5r-mw-github.profile', ( err, result ) => {
  //    return done( err, result );
  //  } )
  //}

}
