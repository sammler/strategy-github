'use strict';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import Context from './../../config/context';

const uniqueValidator = require( 'mongoose-unique-validator' );
const timeStamps = require( 'mongoose-timestamp' );

//Todo: Think of renaming `id` to `user_id`.
//Todo: Think of using type ObjectId for the userId ==> Don't think that we can use a Number to be an ObjectId
let schema = new Schema( {

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

  id: {
    type: Number,
    null: false,
    unique: true
  }
}, { collection: Context.COLLECTION_PREFIX + Context.COLLECTION_USERS, strict: false } );

schema.plugin( uniqueValidator, null );
schema.plugin( timeStamps, { createdAt: 'created_at', updatedAt: 'updated_at' } );

module.exports.Schema = schema;
module.exports.Model = mongoose.model( Context.COLLECTION_USERS, schema );
