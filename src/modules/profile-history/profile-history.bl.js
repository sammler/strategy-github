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

    let query = { id: data.id, lastUpdate: data.lastUpdate };
    let profileHistory = new ProfileHistoryModel( data );

    let error = profileHistory.validateSync();
    if ( error && error.errors ) {
      return Promise.reject( error.errors );
    }

    return ProfileHistoryModel
      .findOneAndUpdate( query, data, {
        upsert: true,
        setDefaultsOnInsert: true,
        new: true
      } ).exec();
  }

}
