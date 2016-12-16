// import mongoose from 'mongoose';
import { Model as ProfileHistoryModel } from './profile-history.model';
// import Context from './../../config/context';
import _ from 'lodash';

export default class ProfileHistoryBL {

  static save(gitHubProfile) {
    gitHubProfile.profile_id = _.clone(gitHubProfile.id || gitHubProfile._id);
    delete gitHubProfile.id;
    delete gitHubProfile._id;

    // Todo: Create a combined _id out of that ...
    const query = {
      profile_id: gitHubProfile.profile_id,
      date: gitHubProfile.date,
    };

    const options = {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    };

    return ProfileHistoryModel
      .findOneAndUpdate(query, gitHubProfile, options)
      .exec();
  }

  static count() {
    return ProfileHistoryModel
      .count({})
      .exec();
  }

  static getByProfileId(profileId) {
    return ProfileHistoryModel
      .findOne({ profile_id: profileId })
      .exec();
  }

  static countPerProfileId(profileId) {
    return ProfileHistoryModel
      .count({ profile_id: profileId })
      .exec();
  }

  static removeAll() {
    return ProfileHistoryModel
      .remove({})
      .exec();
  }

}
