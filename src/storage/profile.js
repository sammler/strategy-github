//import Storage from 'sammler-storage';

export default class Profile {
  constructor( base ) {
    this.base = base;
  }

  save( profile ) {
    return new Promise( ( resolve, reject ) => {
      this.base.logger.silly( 'Save profile', profile );
      return resolve();
    } );
  }
}

