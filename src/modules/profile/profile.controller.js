//import { Model as profileModel } from './profile.model';
import ProfileBL from './profile.bl';
import HttpStatus from 'http-status';

export default class ProfileController {
  constructor( context ) {
    this.reposBL = new ProfileBL( context );
  }

  // Todo: Proper error handling: https://derickbailey.com/2014/09/06/proper-error-handling-in-expressjs-route-handlers/
  //get( req, res, next ) {
  //  profileModel.find( {}, ( err, data ) => {
  //    if ( err ) { return next( err ); }
  //      res.status( 200 ).json( { status: true, result: data } );
  //  } )
  //}

  /**
   * Create a profile.
   * @param req
   * @param res
   * @param next
   */
  create( req, res, next ) {
    console.log( 'controller:req.body', req.body );
    this.reposBL.save( req.body, ( err, doc ) => {
      if ( err ) { return next( err ); }
      return res.status( 200 ).json( doc );
    } );
  }

  /**
   * Return all profiles
   */
  get( req, res, next ) {
    return res.status( HttpStatus.NOT_IMPLEMENTED );
  }

  remove( req, res, next ) {
    return res.status( HttpStatus.NOT_IMPLEMENTED );
  }

}
