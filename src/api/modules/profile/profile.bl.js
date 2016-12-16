import { Model as ProfileModel } from './profile.model';
import ProfileHistoryBL from './../../modules/profile-history/profile-history.bl';
import _ from 'lodash';

export default class ProfileBL {

  /**
   * Save a GitHub profile.
   *
   * @param {object} gitHubProfile - The data to save.
   *
   * @param {Object} saveOptions - Save options.
   * @param {Boolean} saveOptions.saveHistory - Save the history to profile_history table. Default to false.
   *
   * @returns {Promise}
   */
  static save( gitHubProfile, saveOptions = {} ) {

    let defaultOpts = {
      saveHistory: true
    };
    saveOptions = _.assignIn( defaultOpts, saveOptions );

    if ( !gitHubProfile ) {
      throw new Error( 'No data provided' );
    }
    gitHubProfile._id = gitHubProfile.id;
    delete gitHubProfile.id;
    delete gitHubProfile.plan;
    delete gitHubProfile.meta;

    /**
     * I have tried several variants with FindByIdAndUpdate but never get back whether the document
     * is a new one or not, therefore using .findById, even if that means that we have one more
     * roundtrip to the database for now.
     */

    function savePromiseHistory( doIt ) {
      if ( doIt ) {
        return ProfileHistoryBL.save( _.clone( gitHubProfile ) )
      }
      else {
        return Promise.resolve();
      }
    }

    return ProfileModel
      .findById( gitHubProfile._id )
      .exec()
      .then( ( result ) => {

        if ( result ) {

          // update existing record
          return savePromiseHistory( saveOptions.saveHistory )
            .then( () => {
              let updateOpts = { new: true, setDefaultsOnInsert: true };
              return ProfileModel
                .findByIdAndUpdate( gitHubProfile._id, gitHubProfile, updateOpts )
                .exec()
            } )

        } else {

          // create a new one
          let insertOpts = { new: true, upsert: true, setDefaultsOnInsert: true };
          return ProfileModel
            .findByIdAndUpdate( gitHubProfile._id, gitHubProfile, insertOpts )
            .exec();

        }
      } );
  }

  //Todo: need explicit testing
  static getById( profileId ) {
    return ProfileModel
      .findById( profileId )
      .exec();
  }

  //Todo: Need testing
  static getByLogin( login ) {
    return ProfileModel
      .find( { login: login } )
      .exec();
  }

  static countTotal() {
    return ProfileModel
      .count()
      .exec();
  }

  static countByLogin( login ) {
    return ProfileModel
      .count( { login } )
      .exec();
  }

  static removeAll() {
    return ProfileModel.remove( {} );
  }
}

