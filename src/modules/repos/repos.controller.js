import ReposBL from './repos.bl';
import HttpStatus from 'http-status';

export default class ReposController {
  constructor( context ) {
    this.profileBL = new ReposBL( context );
  }

  get( req, res, next) {
    return res.status(HttpStatus.NOT_IMPLEMENTED);
  }
}
