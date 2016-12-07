import mongoose from 'mongoose';
import { Schema } from 'mongoose';

let ProfileHistorySchema = new Schema( {

  profile_id: {
    type: Number,
    null: false
  },

  login: {
    type: String,
    null: false
  },

  last_check: {
    type: Date,
    null: false
  }

}, { collection: 'profile-history', strict: true } );

ProfileHistorySchema.options.toJSON = {
  transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
};

module.exports.Schema = ProfileHistorySchema;
module.exports.Model = mongoose.model( 'profile-history', ProfileHistorySchema );
