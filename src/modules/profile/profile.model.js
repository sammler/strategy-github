'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const uniqueValidator = require( 'mongoose-unique-validator' );

let ProfileSchema = new Schema( {
  login: {
    type: String,
    null: false,
    unique: true
  }
}, { strict: false } );

ProfileSchema.plugin( uniqueValidator, null );

/**
 * Methods
 */
ProfileSchema.method( {} );

/**
 * Statics
 */
ProfileSchema.static( {} );

module.exports.Schema = ProfileSchema;
module.exports.Model = mongoose.model( 'profile', ProfileSchema );
