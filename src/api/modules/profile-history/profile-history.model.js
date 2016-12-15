import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import Context from './../../config/context';

const timeStamps = require( 'mongoose-timestamp' );

let schema = new Schema( {

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

}, { collection: Context.TABLE_PREFIX + Context.COLLECTION_PROFILE_HISTORY, strict: false } );

schema.plugin( timeStamps, { createdAt: Context.FIELD_CREATED_AT, updatedAt: Context.FIELD_UPDATED_AT } );
schema.index( { profile_id: 1, date: 1 }, { unique: true } );

module.exports.Schema = schema;
module.exports.Model = mongoose.model( Context.COLLECTION_PROFILE_HISTORY, schema );
