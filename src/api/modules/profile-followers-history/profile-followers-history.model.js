import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import Context from './../../config/context';

const timeStamps = require('mongoose-timestamp');

const schema = new Schema({

  // Todo: ref to profile
  profile_id: {
    type: Number,
    ref: Context.COLLECTION_PROFILES,
    null: false,
    required: true,
  },

  // Todo: ref to the user (if we decide to keep the user)
  user_id: {
    type: Number,
    null: false,
    required: true,
  },
  date_from: {
    type: Date,
    null: false,
    default: new Date().setUTCHours(0, 0, 0, 0),
  },
  date_to: {
    type: Date,
    null: true,
    required: false,
  },

  last_check: {
    type: Date,
    null: false,
    default: new Date().setUTCHours(0, 0, 0, 0),
  },
}, { collection: Context.COLLECTION_PREFIX + Context.COLLECTION_PROFILE_FOLLOWERS_HISTORY });


schema.pre('findOneAndUpdate', function (next) { // eslint-disable-line func-names
  this._update.last_check = new Date();
  next();
});

schema.index({ profile_id: 1, user_id: 1, date_from: 1 });
schema.plugin(timeStamps, { createdAt: 's5r_created_at', updatedAt: 's5r_updated_at' });

module.exports.Schema = schema;
module.exports.Model = mongoose.model(Context.COLLECTION_PROFILE_FOLLOWERS_HISTORY, schema);
