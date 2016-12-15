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

}, { collection: Context.TABLE_PREFIX + 'profile-history', strict: false } );

//schema.plugin( uniqueValidator, null );
schema.plugin( timeStamps, { createdAt: Context.FIELD_CREATED_AT, updatedAt: Context.FIELD_UPDATED_AT } );
schema.index( { profile_id: 1, date: 1 }, { unique: true } );

module.exports.Schema = schema;
module.exports.Model = mongoose.model( 'profile-history', schema );
