import ProfileBL from './../../src/modules/profile/profile.bl';
import Context from './../../src/config/context';
import DBHelpers from './../lib/db-helpers';

describe.only( 'profile.bl => fresh db', () => {

  let profileBL;
  let dbHelpers;
  before( ( done ) => {
    context = Context.instance();
    profileBL = new ProfileBL();
    dbHelpers = new DBHelpers();
    dbHelpers.dropDatabase( done );
  } );
  beforeEach( () => {

  } );

  it( 'can save a profile', ( done ) => {

    let doc = {
      id: 1,
      login: 'stefanwalther',
      foo: 'bar',
      name: 'Stefan Walther'
    };

    profileBL.save( doc, ( err, doc ) => {
      expect( err ).to.not.exist;
      expect( err ).to.be.an.object;
      expect( doc ).to.exist;
      expect( doc ).to.be.an.object;
      expect( doc.id ).to.be.equal( doc.id );
      expect( doc.login ).to.be.equal( doc.login );
      expect( doc.foo ).to.be.equal( doc.foo );
      done();
    } );
  } );

  it( 'can update a profile', ( done ) => {
    let doc = {
      id: 1,
      login: 'stefanwalther',
      name: 'Stefan Walther',
      foo: 'baz'
    };
    profileBL.save( doc, ( err, doc ) => {
      expect( err ).to.not.exist;
      expect( err ).to.be.an.object;
      expect( doc ).to.exist;
      expect( doc ).to.be.an.object;
      expect( doc.id ).to.be.equal( doc.id );
      expect( doc.login ).to.be.equal( doc.login );
      expect( doc.foo ).to.be.equal( doc.foo );
      done();
    } );

  } );

  it( 'requires some parameters', ( done ) => {
    let doc = {
      id: 1,
      login: 'stefanwalther',
      foo: 'baz'
    };
    profileBL.save( doc, ( err, doc ) => {
      expect( err ).to.exist;
      expect( err ).to.have.property( 'name' );
      done();
    } );
  } )

} );
