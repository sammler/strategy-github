import ProfileHistoryBL from './../../src/modules/profile-history/profile-history.bl';
import Context from './../../src/config/context';
import DBHelpers from './../lib/db-helpers';
import _ from 'lodash';

describe( 'profile-history.bl', () => {

  let dbHelpers;
  let context;

  before( ( done ) => {
    context = Context.instance();
    dbHelpers = new DBHelpers();
    dbHelpers.dropDatabase( done );
  } );

  beforeEach( () => {
    return ProfileHistoryBL.removeAll();
  } );

  it.only( '`save` handles saving a record for the same profile_id and date', () => {
    let doc1 = {
      id: 1,
      login: 'stefanwalther',
      foo: 'profile-history',
      date: new Date().setUTCHours( 0, 0, 0, 0 )
    };
    let doc2 = {
      id: 1,
      login: 'stefanwalther',
      foo: 'profile-history',
      date: new Date().setUTCHours( 0, 0, 0, 0 )
    };

    return ProfileHistoryBL.save( _.clone( doc1 ) )
      .then( () => { return ProfileHistoryBL.save( _.clone( doc2 ) ) } )
      .then( () => { return ProfileHistoryBL.count()} )
      .then( ( count ) => {
        expect( count ).to.be.equal( 1 );
      } )
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
    return ProfileHistoryBL.save( _.clone( doc1 ) )
      .then( () => { return ProfileHistoryBL.save( _.clone( doc2 ) ) } )
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

    return ProfileHistoryBL.save( doc1 )
      .then( () => { return ProfileHistoryBL.save( doc2 )} )
      .catch( ( err ) => {
        expect( err ).to.not.exist;
      } );
  } );

  xit( 'the history will be updated by its combined key', () => {
    expect( true ).to.be.false;
  } );

  it( 'updates and existing item automatically (per profile/day)', () => {

    let dateToday = new Date();
    let dateYesterday = new Date( dateToday.setDate( dateToday.getDate() - 1 ) );

    let doc1 = {
      id: 1,
      login: 'stefanwalther',
      name: 'Stefan Walther',
      date: new Date( dateYesterday ).setUTCHours( 0, 0, 0, 0 )
    };

    let doc2 = {
      id: 1,
      login: 'stefanwalther',
      name: 'Stefan Walther 2',
      date: new Date( dateYesterday ).setUTCHours( 0, 0, 0, 0 )
    };

    return ProfileHistoryBL.save( _.clone( doc1 ) )
      .then( () => { return ProfileHistoryBL.save( _.clone( doc2 ) ) } )
      .then( () => {
        return ProfileHistoryBL.countPerProfileId( 1 )
          .then( count => {
            expect( count ).to.be.equal( 1 )
          } )
      } )
      .then( () => {
        return ProfileHistoryBL.getByProfileId( 1 )
          .then( result => {
            expect( result ).not.to.be.empty;
            expect( result ).to.have.a.property( 'name' ).to.be.equal( 'Stefan Walther 2' );
          } )
      } )
  } );
} );
