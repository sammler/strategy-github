const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const timeStamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

// see http://stackoverflow.com/questions/14228882/inheritance-in-mongoose
const schema = new Schema({
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
});

schema.plugin(uniqueValidator, null);
schema.plugin(timeStamps, {createdAt: 's5r_created_at', updatedAt: 's5r_updated_at'});

module.exports.Schema = schema;
module.exports.Model = mongoose.model('profile', schema);
