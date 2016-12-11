import { Model as ProfileHistoryModel } from './profile-history.model';
import Context from './../../config/context';

export default class ProfileHistoryBL {
  constructor( context ) {
    if ( !context ) {
      context = Context.instance();
    }
    this.logger = context.logger;
  }

  static save( gitHubProfile ) {

    gitHubProfile.profile_id = gitHubProfile.id || gitHubProfile._id;

    let query = {
      profile_id: gitHubProfile.profile_id,
      date: gitHubProfile.date
    };

    let options = {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    };

    return ProfileHistoryModel.findOneAndUpdate( query, gitHubProfile, options )
      .exec();

  }

  static countPerProfileId( profileId ) {
    return ProfileHistoryModel
      .count( { profile_id: profileId } )
      .exec();
  }

  static removeAll() {
    return ProfileHistoryModel
      .remove( {} )
      .exec();
  }

}
