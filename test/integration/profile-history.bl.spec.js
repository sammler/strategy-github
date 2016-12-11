import ProfileHistoryBL from './../../src/modules/profile-history/profile-history.bl';
import Context from './../../src/config/context';
import DBHelpers from './../lib/db-helpers';
import _ from 'lodash';

describe( 'profile-history.bl', () => {

  let profileHistoryBL;
  let dbHelpers;
  let context;
  before( ( done ) => {
    context = Context.instance();
    profileHistoryBL = new ProfileHistoryBL();
    dbHelpers = new DBHelpers();
    dbHelpers.dropDatabase( done );
  } );

  it( 'save should just save the item', () => {
    let doc = {
      id: 1,
      login: 'stefanwalther',
      foo: 'profile-history',
      date: new Date().setUTCHours( 0, 0, 0, 0 )
    };
    return ProfileHistoryBL.save( _.clone( doc ) )
      .then( result => {
        expect( result ).to.exist;
        expect( result ).to.have.property( 'profile_id' ).to.be.equal( doc.id );
        expect( result ).to.have.property( 'login' ).to.be.equal( doc.login );
        expect( result._doc ).to.have.property( 'foo' ).to.be.equal( doc.foo );
        expect( result._doc ).to.have.property( 'date' ).to.be.eql( new Date( doc.date ) );
      } );
  } );

  it( 'should update the item if already existing', () => {
    let dateToday = new Date();
    let doc1 = {
      id: 1,
      login: 'stefanwalther',
      foo: 'profile-history',
      date: dateToday.setUTCHours( 0, 0, 0, 0 )
    };

    let doc2 = {
      id: 1,
      login: 'stefanwalther',
      foo: 'profile-history2',
      date: dateToday.setUTCHours( 0, 0, 0, 0 )
    };
    return ProfileHistoryBL.removeAll()
      .then( () => {
        return Promise.all( [
          ProfileHistoryBL.save( _.clone( doc1 ) ),
          ProfileHistoryBL.save( _.clone( doc2 ) )
        ] )
          .then( () => {
            return ProfileHistoryBL.countPerProfileId( 1 )
              .then( ( count ) => {
                expect( count ).to.be.equal( 1 );
              } )
          } )
          .catch( ( err ) => {
            expect( err ).to.not.exist;
          } )
      } );
  } );

  it( 'if the date is different a new rec will be created', () => {

    let dateToday = new Date();

    let doc1 = {
      id: 1,
      login: 'stefanwalther',
      foo: 'profile-history',
      date: dateToday.setUTCHours( 0, 0, 0, 0 )
    };

    let dateYesterday = new Date( dateToday.setDate( dateToday.getDate() - 1 ) );
    dateYesterday = dateYesterday.setUTCHours( 0, 0, 0, 0 );
    let doc2 = {
      id: 1,
      login: 'stefanwalther',
      foo: 'profile-history',
      date: dateYesterday
    };

    return ProfileHistoryBL.removeAll()
      .then( () => {
        return Promise.all( [
          ProfileHistoryBL.save( doc1 ),
          ProfileHistoryBL.save( doc2 )
        ] )
          .catch( ( err ) => {
            expect( err ).to.not.exist;
          } );
      } );
  } );

  //Todo: Doesn't seem to be robust, return 2 instead of 1 from time to time ... ?!
  it( 'updates and existing item automatically (per profile/day)', () => {

    let doc1 = {
      id: 1,
      login: 'stefanwalther',
      foo: 'profile-history',
      date: new Date().setUTCHours( 0, 0, 0, 0 )
    };

    let doc2 = {
      id: 1,
      login: 'stefanwalther',
      foo: 'profile-history2',
      date: new Date().setUTCHours( 0, 0, 0, 0 )
    };

    return ProfileHistoryBL.removeAll()
      .then( () => {
        return Promise.all( [
          ProfileHistoryBL.save( doc1 ),
          ProfileHistoryBL.save( doc2 )
        ] )
          .then( () => {
            return ProfileHistoryBL.countPerProfileId( 1 )
              .then( ( count ) => {
                expect( count ).to.be.equal( 1 )
              } )
          } )
      } )
  } );

} );
