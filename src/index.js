import Storage from 'sammler-storage';
import Logger from './logger';
import Repos from './repos';

export default class {
  constructor() {
    this._db = null;
    this.logger = new Logger();
    this.repos = new Repos( this );
  }
  get db() {
    if (!this._db) {
      let config = {
        "db": "docker"
      };
      this._db = new Storage( config );
    }
    return this._db;
  }
}
