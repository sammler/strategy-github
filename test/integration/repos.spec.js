/*global before, describe, expect, it, beforeEach*/
import * as _ from 'lodash';
import GitHub from './../../src/index';

describe( 'int::repos', () => {

  var gitHub;
  before( () => {
    gitHub = new GitHub();
  } );

  it( '_getRepos should be a method', () => {
    expect( gitHub.repos ).to.have.a.property( '_getRepos' ).that.is.a( 'function' );
  } );

  it( '_getRepos should return repositories and accept filters', ( cb ) => {

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
