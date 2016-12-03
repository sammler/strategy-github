import { Model as ProfileModel } from './profile.model';
import Context from './../../config/context';

export default class ProfileBL {
  constructor( context ) {
    if ( !context ) {
      context = Context.instance();
    }
    this.logger = context.logger;
  }

  save( data, callback ) {

    let query = { id: data.id };
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

}

