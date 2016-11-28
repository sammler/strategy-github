/*global before, beforeEach, describe, expect, it, beforeEach*/
import * as flyway from './../lib/flyway';
import GitHub from './../../src/index';
import Logger from 'sammler-nodelib-logger';

let logger = new Logger();

describe( 'int::profile', () => {

  before( () => {
    return flyway.init();
  } );

  let gitHub;
  beforeEach( () => {
    gitHub = new GitHub();
  } );

  it( '_getProfile()', () => {

    let cfg = {
      affiliation: 'owner',
      per_page: 100
    };

    let filter = {};

    return gitHub.profile._getProfile( cfg, filter )
      .then( ( res ) => {
        expect( res ).to.be.an.array;
        expect( res ).to.have.lengthOf( 1 );
      } )
      .catch( ( err ) => {
        expect( err ).to.not.exist;
      } );
  } );

  it.only( 'profile.sync', () => {

    let cfg = {
      affiliation: 'owner',
      per_page: 100
    };

    return gitHub.profile.sync( cfg, {})
      .then( ( res ) => {
        expect( res ).to.be.an.array;
      } )
  } )

} );
