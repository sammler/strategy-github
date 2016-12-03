import { Model as ProfileModel } from './profile.model';
import Context from './../../config/context';

export default class ProfileBL {
  constructor( context ) {
    if ( !context ) {
      context = Context.instance();
    }
    this.logger = context.logger;
  }

  removeAll( callback ) {
    ProfileModel
      .remove( {}, callback );
  }

  removeAllP() {
    return ProfileModel.remove( {} );
  }

  save( data, callback ) {

    let query = { id: data.id, lastUpdate: data.lastUpdate };
    let Profile = new ProfileModel( data );

    let error = Profile.validateSync();
    if ( error && error.errors ) {
      return callback( error.errors );
    }

    ProfileModel
      .findOneAndUpdate( query, data, {
        upsert: true,
        setDefaultsOnInsert: true,
        new: true
      }, ( err, numberAffected, raw ) => {
        callback( err, numberAffected, raw );
      } )
  }

  saveP( data ) {

    let query = { id: data.id, lastUpdate: data.lastUpdate };
    let Profile = new ProfileModel( data );

    let error = Profile.validateSync();
    if ( error && error.errors ) {
      return Promise.reject( error );
    }

    return ProfileModel
      .findOneAndUpdate( query, data, {
        upsert: true,
        setDefaultsOnInsert: true,
        new: true
      } );
  }

}

