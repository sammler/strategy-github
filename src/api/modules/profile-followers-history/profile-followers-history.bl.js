import { Model as ProfileFollowersHistoryModel } from './profile-followers-history.model';
import Context from './../../config/context';

export default class ProfileFollowersHistoryBL {
  constructor( context ) {
    if ( !context ) {
      context = Context.instance();
    }
    this.logger = context.logger;
  }

  /**
   * Saves a profile follower.
   * @description
   * The following rules apply:
   *
   * - if there is not entry with the given combination of profile_id and user_id the record will be added
   *
   * @param data
   * @returns {Promise}
   */
  static ensure( data ) {

    let updateOpts = { new: true, upsert: true, setDefaultsOnInsert: true };
    let query = { profile_id: data.profile_id, user_id: data.user_id };
    return ProfileFollowersHistoryModel
      .findOneAndUpdate( query, data, updateOpts )
      .exec();
  }

  static getActiveFollowersByProfile( profileId ) {

    return ProfileFollowersHistoryModel
      .find( {
        profile_id: profileId,
        date_to: null
      } )
      .exec();

  }

  static count() {
    return ProfileFollowersHistoryModel
      .count()
      .exec();
  }

  static countByProfileId( profileId ) {
    return ProfileFollowersHistoryModel
      .count( { profile_id: profileId } )
      .exec();
  }

  static removeByProfileId( profileId ) {
    return ProfileFollowersHistoryModel
      .remove( { profile_id: profileId } )
      .exec();
  }

  static removeAll() {
    return ProfileFollowersHistoryModel
      .remove( {} );
  }

}

