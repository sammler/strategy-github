'use strict';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const uniqueValidator = require( 'mongoose-unique-validator' );
const timeStamps = require( 'mongoose-timestamp' );

let schema = new Schema( {

  // last time the data was updated in the MongoDb (not on GitHub!)
  last_check: {
    type: Date,
    default: new Date().setUTCHours( 0, 0, 0, 0 ),
    null: false
  },

  //last_check_deps: {
  //  type:
  //},

  profile_id: {
    type: number,
    null: false,
    unique: true
  },


  //Todo: obsolote!
  id: {
    type: Number,
    null: false,
    unique: false
  },

  login: {
    type: String,
    null: false,
    required: true,
    unique: true
  },

  name: {
    type: String,
    null: false,
    required: true
  },

  public_repos: {
    type: Number,
    null: false,
    default: 0
  },

  public_gists: {
    type: Number,
    null: false,
    default: 0
  },

  followers: {
    type: Number,
    null: false,
    default: 0
  },

  following: {
    type: Number,
    null: false,
    default: 0
  },

  total_private_repos: {
    type: Number,
    null: false,
    default: 0
  },

  owned_private_repos: {
    type: Number,
    null: false,
    default: 0
  },

  collaborators: {
    type: Number,
    null: false,
    default: 0
  }

}, { collection: 'profiles', strict: false } );

schema.plugin( uniqueValidator, null );
schema.plugin( timeStamps, { createdAt: 's54_created_at', updatedAt: 's5r_updated_at' } );

/**
 * Methods
 */
//ProfileSchema.method( {} );

/**
 * Statics
 */
//ProfileSchema.static( {} );

module.exports.Schema = schema;
module.exports.Model = mongoose.model( 'profile', schema );
