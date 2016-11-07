/*global before, beforeEach, describe, expect, it, beforeEach*/
import * as _ from 'lodash';
import GitHub from './../../src/index';

describe( 'int::repos', () => {

  var gitHub;
  beforeEach( () => {
    gitHub = new GitHub();
  } );


  it( '_getRepos should return an array of repositories and accept filters', ( cb ) => {

    let cfg = {
      "affiliation": "owner",
      "per_page": 100
    };

    let filter = {
      private: false,
      forked: false
    };

    gitHub.repos._getRepos( cfg, filter, ( err, res ) => {
      expect( err ).to.be.null;
      expect( res ).to.be.an.array;
      expect( _.filter( res, { private: true } ) ).to.be.of.length( 0 );
      expect( _.filter( res, { forked: true } ) ).to.be.of.length( 0 );
      cb();
    } )
  } );

} );
