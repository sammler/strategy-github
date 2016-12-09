import { Model as ProfileHistoryModel } from './profile-history.model';
import Context from './../../config/context';

export default class ProfileHistoryBL {
  constructor( context ) {
    if ( !context ) {
      context = Context.instance();
    }
    this.logger = context.logger;
  }

  save( data ) {

    let query = { profile_id: data.profile_id, last_check: data.last_check };
    let profileHistory = new ProfileHistoryModel( data );

    let error = profileHistory.validateSync();
    if ( error && error.errors ) {
      return Promise.reject( error.errors );
    }

    return ProfileHistoryModel
      .find( query, (err, result) => {
        if (err) {
          throw new Error(err);
        }
        if (!result) {
          return ProfileHistoryModel.create(data);
        } else {
          return Promise.resolve(result);
        }
      })
      .exec();
  }

  countPerProfileId( profileId ) {
    return ProfileHistoryModel
      .count( { profile_id: profileId } )
      .exec();
  }

  removeAll() {
    return ProfileHistoryModel
      .remove( {} )
      .exec();
  }

}
