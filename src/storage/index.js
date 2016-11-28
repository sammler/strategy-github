import Profile from './profile';

export default class Storage {
  constructor( base ) {
    this.base = base;
    this.profile = new Profile( base );
  }
}
