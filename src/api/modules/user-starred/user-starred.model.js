const mongoose = require('mongoose');
const timeStamps = require('mongoose-timestamp');

const GlobalConfig = require('./../../config/config');
const Schema = mongoose.Schema;

/* eslint-disable camelcase */
const schema = new Schema({

  // GitHub's user id
  user_id: {
    type: Number,
    null: false
  },

  // GitHub's repo id
  // Todo: ref to repo to be able to populate
  repo_id: {
    type: Number,
    null: false
  },

  name: String,
  full_name: String,
  description: String,
  private: Boolean,
  fork: Boolean,
  stargazers_count: Number,
  watchers_count: Number,
  homepage: String,
  language: String,
  created_at: Date,
  updated_at: Date,
  pushed_at: Date,
  forks_count: Number,
  open_issues_count: Number,
  owner: Object,

  // Date the starred repo was first detected by s5r
  s5r_date_from: {
    type: Date,
    null: false,
    default: new Date()
  },

  // First Date where the user doesn't follow the starred-repo anymore
  s5r_date_to: {
    type: Date,
    null: true
  },

  // Last s5r check
  s5r_last_check: {
    type: Date,
    null: false,
    default: new Date()
  }

}, {collection: GlobalConfig.COLLECTION_PREFIX + GlobalConfig.COLLECTION_USER_STARRED, strict: true});
/* eslint-enable camelcase */

schema.plugin(timeStamps, {createdAt: 's5r_created_at', updatedAt: 's5r_updated_at'});

module.exports.Schema = schema;
module.exports.Model = mongoose.model(GlobalConfig.COLLECTION_USER_STARRED, schema);
