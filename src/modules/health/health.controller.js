
export default class HealthController {
  constructor() {

  }

  /**
   * Get all profiles
   * @param req
   * @param res
   */
  get( req, res ) {
    res.setHeader( 'Content-Type', 'application/json' );
    res.send( { ts: new Date().toJSON(), bla: 'test' } );
  }

}
