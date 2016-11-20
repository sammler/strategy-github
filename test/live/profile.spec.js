/*global before, beforeEach, describe, expect, it, beforeEach*/
import * as _ from 'lodash';
import GitHub from './../../src/index';

describe( 'int::profile', () => {

  let gitHub;
  beforeEach( () => {
    gitHub = new GitHub();
  } );

  it( 'profile', ( cb ) => {

    let cfg = {
      affiliation: 'owner',
      per_page: 100
    };

    let filter = {};

    gitHub.profile._getProfile( cfg, filter, ( err, res ) => {
      expect( err ).to.not.exist;
      expect( res ).to.be.an.array;
      expect( res ).to.have.lengthOf( 1 );
      cb();
    } )
  } );

} );
