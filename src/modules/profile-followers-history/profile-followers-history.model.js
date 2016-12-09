import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const uniqueValidator = require( 'mongoose-unique-validator' );
const timeStamps = require( 'mongoose-timestamp' );

let schema = new Schema( {

  // Todo: ref to profile
  profile_id: {
    type: Number,
    null: false,
    required: true
  },

  // Todo: ref to the user (if we decide to keep the user)
  user_id: {
    type: Number,
    null: false,
    required: true
  },
  date_from: {
    type: Date,
    null: false,
    default: new Date().setUTCHours( 0, 0, 0, 0 )
  },
  date_to: {
    type: Date,
    null: true,
    required: false
  },

  last_check: {
    type: Date,
    null: false,
    default: new Date().setUTCHours( 0, 0, 0, 0 )
  }
} );

schema.plugin( uniqueValidator, null );
schema.plugin( timeStamps, { createdAt: 'created_at', updatedAt: 'updated_at' } );

module.exports.Schema = schema;
module.exports.Model = mongoose.model( 'profile_followers_history', schema );
