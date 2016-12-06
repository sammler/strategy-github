import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const uniqueValidator = require( 'mongoose-unique-validator' );
const timeStamps = require( 'mongoose-timestamp' );

// see http://stackoverflow.com/questions/14228882/inheritance-in-mongoose
let ProfileXHistoryBaseSchema = new Schema( {
  profile_id: {
    type: Schema.Types.ObjectId,
    ref: 'profiles'
  },
  user_id: {
    type: Number,
    null: false,
    required: true
  },
  date_from: {
    type: Date,
    null: false
  },
  date_to: {
    type: Date,
    null: false
  },
  last_check: {
    type: Date,
    null: false,
    required: true
  }
}, {
  timestamps: {
    created_at: 'created_at',
    updated_at: 'updated_at'
  }
} );

ProfileXHistoryBaseSchema.plugin( uniqueValidator, null );
ProfileXHistoryBaseSchema.plugin( timeStamps );

module.exports.Schema = ProfileXHistoryBaseSchema;
module.exports.Model = mongoose.model( 'profile', ProfileXHistoryBaseSchema );
