import { Model as ProfileModel } from './profile.model';

export default class ProfileBL {
  constructor( context ) {
    if ( !context ) {
      throw new Error( 'No context provided.' );
    }
    this.logger = context.logger;
  }

  removeAll() {
    return ProfileModel.remove( {} );
  }

  save( data ) {

    if ( !data ) {
      throw new Error( 'No data provided' );
    }

    let query = { id: data.id, last_check: data.last_check };
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
      } )
      .exec();
  }

}

