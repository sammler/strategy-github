import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const uniqueValidator = require( 'mongoose-unique-validator' );
const timeStamps = require( 'mongoose-timestamp' );

let schema = new Schema( {

  profile_id: {
    type: Number,
    null: false
  },

  login: {
    type: String,
    null: false
  },

  last_check: {
    type: Date,
    null: false
  }

}, { collection: 'profile-history', strict: true } );

schema.plugin( uniqueValidator, null );
schema.plugin( timeStamps, { createdAt: 'created_at', updatedAt: 'updated_at' } );

module.exports.Schema = schema;
module.exports.Model = mongoose.model( 'profile-history', schema );
