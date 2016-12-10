import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import Context from './../../config/context';

const uniqueValidator = require( 'mongoose-unique-validator' );
const timeStamps = require( 'mongoose-timestamp' );

let schema = new Schema( {

  _id: {
    type: Number
  },

  profile_id: {
    type: Number
  },

  // Duplicate data
  login: {
    type: String,
    null: false
  },

  date: {
    type: Date,
    null: false
  }

}, { collection: Context.TABLE_PREFIX + 'profile-history', strict: false } );

schema.plugin( uniqueValidator, null );
schema.plugin( timeStamps, { createdAt: Context.FIELD_CREATED_AT, updatedAt: Context.FIELD_UPDATED_AT } );

module.exports.Schema = schema;
module.exports.Model = mongoose.model( 'profile-history', schema );
