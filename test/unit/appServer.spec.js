/* global expect, describe, beforeEach, it */
import AppServer from './../../src/appServer';

describe( 'AppServer', () => {

  let appServer = null;
  beforeEach( () => {
    appServer = new AppServer();
  } );

  it( 'should be a class', () => {
    expect( appServer ).to.be.an.object;
  } );

  it( 'should have a function start', () => {
    expect( appServer ).to.have.a.property( 'start' ).to.be.a.function;
  } );

  it( 'should have a function start', () => {
    expect( appServer ).to.have.a.property( 'stop' ).to.be.a.function;
  } );

  it( 'should have an object base', () => {
    expect( appServer ).to.have.a.property( 'base' ).to.be.an.object;
  } );

  it( 'base should have a logger', () => {
    expect( appServer.base ).to.have.a.property( 'logger' ).to.be.an.object;
  } );

} );
