const UserStarredModel = require('./user-starred.model').Model;
const _ = require('lodash');

class UserStarredBL {

  static modelFromGitHub(userId, ghStarredItem) {
    const o = ghStarredItem;
    o.user_id = userId;
    o.repo_id = ghStarredItem.id;

    return o;
  }

  static count() {
    return UserStarredBL
      .count({})
      .exec();
  }

  /**
   * Save a starred repo for a user.
   */
  static save(userId, ghStarredItems) {
    if (_.isArray(ghStarredItems)) {
      return new Error('Not implemented');
    }

    const doc = UserStarredBL.modelFromGitHub(userId, ghStarredItems);
    return UserStarredBL.saveSingle(doc);
  }

  static saveSingle(doc) {
    const query = {user_id: doc.user_id, repo_id: doc.repo_id};
    const options = {upsert: true, setDefaultsOnInsert: true};
    return UserStarredModel
      .update(query, doc, options)
      .exec();
  }

  static removeAll() {
    return UserStarredModel
      .remove()
      .exec();
  }

  // eslint-disable-next-line no-unused-vars
  static removeById(id) {

  }

  /**
   * Remove all entries for a given user
   * @param userId
   */
  // eslint-disable-next-line no-unused-vars
  static removeByUser(userId) {

  }

  /**
   * Remove all entries for a given user an repo
   * @param userId
   * @param repoId
   */
  // eslint-disable-next-line no-unused-vars
  static removeByUserAndRepo(userId, repoId) {

  }

}

module.exports = UserStarredBL;
