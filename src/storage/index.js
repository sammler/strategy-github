import Profile from './profile';

export default class {
  constructor( base ) {
    this.base = base;
    this.profile = new Profile( base );
  }
}
