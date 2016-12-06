import { Model as ProfileFollowersHistoryModel } from './profile-followers-history.model';
import Context from './../../config/context';

export default class ProfileFollowersHistoryBL {
  constructor( context ) {
    if ( !context ) {
      context = Context.instance();
    }
    this.logger = context.logger;
  }

  removeByProfileId( profileId ) {

  }

  save( data ) {

    let profileFollower = new ProfileFollowersHistoryModel( data );
    let error = profileFollower.validateSync();
    if ( error && error.errors ) {
      return Promise.reject( error );
    }
  }

  //saveFollowers( profileId, followers ) {
  //  let query = { profile_id: profileId };
  //  let Profile = new ProfileModel( data );
  //
  //  let error = Profile.validateSync();
  //  if ( error && error.errors ) {
  //    return Promise.reject( error );
  //  }
  //
  //  return ProfileModel
  //    .findOneAndUpdate( query, data, {
  //      upsert: true,
  //      setDefaultsOnInsert: true,
  //      new: true
  //    } );
  //}

}

