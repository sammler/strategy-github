'use strict';
const mongoose = require( 'mongoose' );
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

module.exports.Schema = ProfileSchema;
module.exports.Model = mongoose.model( 'profile', ProfileSchema );
