/*global describe, expect, it, beforeEach*/
import GitHub from './../../src/index';

describe( 'unit::GitHub', () => {

  var gitHub;
  before( () => {
    gitHub = new GitHub();
  } );

  it( 'should be an object', () => {
    expect( gitHub ).to.exist;
    expect( gitHub ).to.be.an.object;
  } );

  it( 'should have a property logger', () => {
    expect( gitHub ).to.have.a.property( 'logger' );
    expect( gitHub.logger ).to.have.a.property( 'error' ).that.is.a( 'function' );
  } );

  it( 'should have a property repos', () => {
    expect( gitHub ).to.have.a.property( 'repos' );
  } );
} );
