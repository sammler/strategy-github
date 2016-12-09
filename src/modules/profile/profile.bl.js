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
    data._id = data.id;
    delete data.id;
    delete data.plan;
    delete data.meta;

    //let query = { profile_id: data.profile_id };
    //let Profile = new ProfileModel( data );
    //
    //let error = Profile.validateSync();
    //if ( error && error.errors ) {
    //  return Promise.reject( error );
    //}

    let options = {
      upsert: true,
      new: true
    };

    return ProfileModel
      .findByIdAndUpdate( data._id, data, options )
      .exec();
  }

}

