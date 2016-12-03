'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const uniqueValidator = require( 'mongoose-unique-validator' );
const timeStamps = require( 'mongoose-timestamp' );

//Todo: Required fields are not validated
let ProfileSchema = new Schema( {

  // last time the data was updated in the MongoDb (not on GitHub!)
  lastUpdate: {
    type: Date,
    default: new Date().setUTCHours( 0, 0, 0, 0 ),
    null: false
  },

  id: {
    type: Number,
    null: false,
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
  },

  login: {
    type: String,
    null: false,
    required: true
  }

}, { strict: false } )

ProfileSchema.plugin( uniqueValidator, null );
ProfileSchema.plugin( timeStamps );

/**
 * Methods
 */
//ProfileSchema.method( {} );

/**
 * Statics
 */
//ProfileSchema.static( {} );

module.exports.Schema = ProfileSchema;
module.exports.Model = mongoose.model( 'profile', ProfileSchema );
