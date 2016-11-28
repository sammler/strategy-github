import Logger from 'sammler-nodelib-logger';
import Repos from './repos';
import Profile from './profile';
import Storage from './storage/index';

export default class {
  constructor() {
    this._db = null;
    this.logger = new Logger();
    this.repos = new Repos( this );
    this.profile = new Profile( this );
    this.storage = new Storage( this );
  }

  get db() {
    if ( !this._db ) {
      let config = {
        db: 'docker'
      };
      this._db = new Storage( config );
      this.logger.silly( 'connected' );
    }
    return this._db;
  }
}
