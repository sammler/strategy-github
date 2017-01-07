const Context = require('./../../config/context');

const mongoose = require('mongoose');
const timeStamps = require('mongoose-timestamp');

const GlobalConfig = require('./../../config/config');

const Schema = mongoose.Schema;

const schema = new Schema({

  _id: {
    type: Number
  },

  profile_id: {
    type: Number,
    ref: Context.COLLECTION_PROFILES
  },

  name: {
    type: String,
    null: false
  },

  // Duplicate data
  login: {
    type: String,
    null: false
  },

  // history date
  date: {
    type: Date,
    null: false
  }

}, {collection: GlobalConfig.COLLECTION_PREFIX + GlobalConfig.COLLECTION_PROFILE_HISTORY, strict: false});

schema.plugin(timeStamps, {createdAt: GlobalConfig.FIELD_CREATED_AT, updatedAt: GlobalConfig.FIELD_UPDATED_AT});
schema.index({profile_id: 1, date: 1}, {unique: true});

module.exports.Schema = schema;
module.exports.Model = mongoose.model(GlobalConfig.COLLECTION_PROFILE_HISTORY, schema);
