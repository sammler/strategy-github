import { Model as profileModel } from './profile.model';

let instance = null;
export default class ProfileController {
  constructor() {
    if ( !instance ) {
      instance = this;
    }
    return instance;
  }

  // Todo: Proper error handling: https://derickbailey.com/2014/09/06/proper-error-handling-in-expressjs-route-handlers/
  /**
   * Get all profiles
   * @param req
   * @param res
   */
  get( req, res, next ) {
    profileModel.find( {}, ( err, data ) => {
      if ( err ) { return next( err ); }
      res.status( 200 ).json( { status: true, result: data } );
    } )
  }

  add( req, res, next) {

  }

}
