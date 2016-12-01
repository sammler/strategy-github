const profileModel = require( './profile.model' ).Model;

export default class Profile {
  constructor() {

  }

  /**
   * Get all profiles
   * @param req
   * @param res
   */
  get( req, res ) {
    profileModel.find( {}, ( err, data ) => {
      if ( err ) {
        return res.json( { status: false, error: 'Something went wrong' } );
      }
      res.json( { status: true, result: data } );
    } )
  }



}
