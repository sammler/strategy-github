import { Model as ProfileModel } from './profile.model';
import Context from './../../config/context';

export default class ProfileBL {
  constructor( context ) {
    if ( !context ) {
      context = Context.instance();
    }
    this.logger = context.logger;
  }

  removeAll() {
    return ProfileModel.remove( {} );
  }

  save( data ) {

    let query = { id: data.id, lastUpdate: data.last_check };
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

