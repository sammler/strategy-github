import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const uniqueValidator = require( 'mongoose-unique-validator' );
const timeStamps = require( 'mongoose-timestamp' );

let ProfileFollowersHistorySchema = new Schema( {

  // Todo: ref to profile
  profile_id: {
    type: Number,
    null: false,
    required: true
  },
  follower_id: {
    type: Number,
    null: false,
    required: true
  },
  date_from: {
    type: Date,
    null: false,
    required: true
  },
  date_to: {
    type: Date,
    null: true,
    required: false
  }
} );

ProfileFollowersHistorySchema.plugin( uniqueValidator, null );
ProfileFollowersHistorySchema.plugin( timeStamps );

module.exports.Schema = ProfileFollowersHistorySchema;
module.exports.Model = mongoose.model( 'profile_followers_history', ProfileFollowersHistorySchema );
