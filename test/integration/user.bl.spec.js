import UsersBL from './../../src/modules/users/users.bl';
import Context from './../../src/config/context';
import DBHelpers from './../lib/db-helpers';

describe( 'users.bl', () => {

  let usersBL;
  let dbHelpers;
  let context;
  before( ( done ) => {
    context = Context.instance();
    usersBL = new UsersBL();
    dbHelpers = new DBHelpers();
    dbHelpers.dropDatabase( done );
  } );
  beforeEach( () => {

  } );
  after( () => {
    context.dbDisconnect();
  } );

  it( 'BL has some basic functions', () => {
    expect( usersBL ).to.have.a.property( 'save' );
  } );

  it( 'removeAll removes all existing users', () => {
    return usersBL.removeAll();
  } );

  it( 'saves a user', () => {
    let user = {
      id: 1,
      login: 'foo'
    };
    return usersBL
      .save( user )
      .catch( ( err ) => {
        expect( err ).to.not.exist;
      } )
  } );

  it( 'updates an existing user', () => {

    let user = {
      id: 1,
      login: 'foo',
      foo: 'bar'
    };
    let userUpdated = {
      id: 1,
      login: 'foo',
      foo: 'baz'
    };

    return usersBL
      .removeAll()
      .then( usersBL.save.bind( null, user ) )
      .then( usersBL.save.bind( null, userUpdated ) )
      .then( ( result ) => {
        expect( result ).to.exist;
        expect( result._doc.foo ).to.be.equal( 'baz' )
      } )
  } )

} );
