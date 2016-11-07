/*global describe, expect, it, beforeEach*/
import GitHub from './../../src/index';

describe( 'unit::repos', () => {

  var gitHub;
  before( () => {
    gitHub = new GitHub();
  } );

  it( '_getRepos should be a method', () => {
    expect( gitHub.repos ).to.have.a.property( '_getRepos' ).that.is.a( 'function' );
  } );



} );
