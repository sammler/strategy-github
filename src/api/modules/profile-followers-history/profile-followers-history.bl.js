/* eslint-disable camelcase, no-underscore-dangle */
const ProfileFollowersHistoryModel = require('./profile-followers-history.model').Model;
const Context = require('./../../config/context');

const _ = require('lodash');
const Promise = require('bluebird');

export default class ProfileFollowersHistoryBL {
  constructor(context) {
    if (!context) {
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
  static ensure(data) {
    if (_.isArray(data)) {
      return Promise.map(data, item => ProfileFollowersHistoryBL.ensureSingle(item));
    }
    return ProfileFollowersHistoryBL.ensureSingle(data);
  }

  static ensureSingle(data) {
    // Todo: That's a hack, not sure how to tackle better => investigate
    // (we will similar problems and patterns in other use cases)
    // Could be that we have a static method on the schema to solve that problem
    if (!data.date_from) {
      // eslint-disable-next-line camelcase
      data.date_from = new Date().setUTCHours(0, 0, 0, 0);
    }

    const updateOpts = {new: true, upsert: true, setDefaultsOnInsert: true};

    const query = {profile_id: data.profile_id, user_id: data.user_id, date_from: data.date_from};

    return ProfileFollowersHistoryModel
      .findOneAndUpdate(query, data, updateOpts)
      .exec();
  }

  static getActiveFollowersByProfile(profileId) {
    return ProfileFollowersHistoryModel
      .find({
        profile_id: profileId,
        date_to: {$exists: false}
      })
      .exec();
  }

  static count() {
    return ProfileFollowersHistoryModel
      .count()
      .exec();
  }

  static countByProfileId(profileId) {
    return ProfileFollowersHistoryModel
      .count({profile_id: profileId})
      .exec();
  }

  static removeByProfileId(profileId) {
    return ProfileFollowersHistoryModel
      .remove({profile_id: profileId})
      .exec();
  }

  static removeAll() {
    return ProfileFollowersHistoryModel
      .remove({});
  }

}
/* eslint-enable camelcase, no-underscore-dangle */

