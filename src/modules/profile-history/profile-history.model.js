import mongoose from 'mongoose';
import { Schema } from 'mongoose';

let ProfileHistorySchema = new Schema( {

  id: {
    type: Number,
    null: false
  },

  lastUpdate: {
    type: Date,
    null: false
  },

}, { collection: 'profile-history', strict: false } );

module.exports.Schema = ProfileHistorySchema;
module.exports.Model = mongoose.model( 'profile-history', ProfileHistorySchema );