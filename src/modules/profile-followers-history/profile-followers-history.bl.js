import { Model as ProfileFollowersHistoryModel } from './profile-followers-history.model';
import Context from './../../config/context';

export default class ProfileFollowersHistoryBL {
  constructor( context ) {
    if ( !context ) {
      context = Context.instance();
    }
    this.logger = context.logger;
  }

  removeAll() {
    return ProfileFollowersHistoryModel
      .remove()
      .exec();
  }

  removeByProfileId( profileId ) {
    return ProfileFollowersHistoryModel
      .remove( { profile_id: profileId } )
      .exec();
  }

  create( data ) {

    let profileFollower = new ProfileFollowersHistoryModel( data );
    let error = profileFollower.validateSync();
    if ( error && error.errors ) {
      return Promise.reject( error );
    }

    return ProfileFollowersHistoryModel
      .create( data );
  }

  getActiveFollowersByProfile( profileId ) {

    return ProfileFollowersHistoryModel
      .find( {
        profile_id: profileId,
        date_to: null
      } )
      .exec();

  }

}

