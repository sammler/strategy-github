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
    required: true
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

}, { noId: true, noVirtualId: true, collection: Context.TABLE_PREFIX + Context.COLLECTION_PROFILES, strict: false } );

schema.plugin( uniqueValidator, null );
/**
 * Methods
 */
//ProfileSchema.method( {} );

/**
 * Statics
 */
//ProfileSchema.static( {} );

// Don't use arrow functions here, will not work ...
schema.pre( 'save', function( next ) { //eslint-disable-line func-names
  //this.s5r_updated_at = Date.now;
  //this.wasNew = this.isNew;
  //if ( !this.isNew ) {
  //  console.log( 'hey, we are updating' );
  //  console.log( 'saveHistory: ', this.saveHistory );
  //}
  next();
} );

schema.post( 'save', function() { //eslint-disable-line func-names
  //if ( !this.wasNew ) {
  //  console.log( 'save:was not new' );
  //} else {
  //  console.log( 'save:was new' );
  //}
} );

schema.pre( 'update', function( next ) { //eslint-disable-line func-names
  //this.s5r_updated_at = Date.now;
  //this.wasNew = this.isNew;
  //if ( !this.isNew ) {
  //  console.log( 'update: hey, we are updating' );
  //  console.log( 'saveHistory: ', this.saveHistory );
  //}
  next();
} );

schema.post( 'update', function() { //eslint-disable-line func-names
  //if ( !this.wasNew ) {
  //  console.log( 'update: was not new' );
  //} else {
  //  console.log( 'update: was new' );
  //}
} );

module.exports.Schema = schema;
module.exports.Model = mongoose.model( Context.COLLECTION_PROFILES, schema );
