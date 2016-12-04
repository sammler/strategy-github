'use strict';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const uniqueValidator = require( 'mongoose-unique-validator' );
const timeStamps = require( 'mongoose-timestamp' );

let UserSchema = new Schema( {

  // last time the data was updated in the MongoDb (not on GitHub!)
  lastUpdate: {
    type: Date,
    default: new Date().setUTCHours( 0, 0, 0, 0 ),
    null: false
  },

  login: {
    type: String,
    null: false,
    required: true,
    unique: true
  },

  id: {
    type: Number,
    null: false,
    unique: true
  }

}, { collection: 'users', strict: false } );

UserSchema.plugin( uniqueValidator, null );
UserSchema.plugin( timeStamps );

/**
 * Methods
 */
//ProfileSchema.method( {} );

/**
 * Statics
 */
//ProfileSchema.static( {} );

module.exports.Schema = UserSchema;
module.exports.Model = mongoose.model( 'user', UserSchema );
