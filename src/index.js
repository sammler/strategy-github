import Storage from 'sammler-storage';
import Logger from './logger';
import Repos from './repos';

export default class {
  constructor() {
    this.db = new Storage();
    this.logger = new Logger();

    this.repos = new Repos( this );
  }
}
