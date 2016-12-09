'use strict';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import Context from './../../config/context';

const uniqueValidator = require( 'mongoose-unique-validator' );

let schema = new Schema( {

  // GitHub Profile Id
  _id: {
    type: Number
  },

  // last time the data was updated in the MongoDb (not on GitHub!)
  last_check: {
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

  s5r_created_at: {
    type: Date,
    null: false,
    default: new Date()
  },
  s5r_updated_at: {
    type: Date,
    null: true
  }

}, { noId: true, noVirtualId: true, collection: Context.TABLE_PREFIX + 'profiles', strict: false } );

schema.plugin( uniqueValidator, null );
/**
 * Methods
 */
//ProfileSchema.method( {} );

/**
 * Statics
 */
//ProfileSchema.static( {} );

schema.pre( 'save', ( next ) => {
  this.s5r_updated_at = Date.now;
  next();
} );

module.exports.Schema = schema;
module.exports.Model = mongoose.model( 'profile', schema );
