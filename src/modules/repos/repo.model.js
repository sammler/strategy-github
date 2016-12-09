import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const uniqueValidator = require( 'mongoose-unique-validator' );
const timeStamps = require( 'mongoose-timestamp' );

//Todo: Add more fields and remove unwanted fields in the pre_save event, e.g.: permissions object,
//Todo: Do we have one ore more owner? Should be somehow reflected ...
let schema = new Schema( {

  repo_id: {
    type: Number,
    null: false,
    unique: true
  },
  name: {
    type: String,
    null: false
  },
  full_name: {
    type: String,
    null: false
  },
  private: Boolean,
  fork: Boolean,
  url: String,
  html_url: String,
  comments_url: String,
  commits_url: String,
  contributors_url: String,
  downloads_url: String,
  events_url: String,
  forks_url: String,
  hooks_url: String,
  issue_comment_url: String,
  issue_events_url: String,
  issues_url: String,
  milestones_url: String,
  notifications_url: String,
  releases_url: String,
  stargazers_url: String,
  subscribers_url: String,
  homepage: String,
  forks_count: Number,
  stargazers_count: Number,
  watchers_count: Number,
  size: Number,

}, { collection: 'repos', strict: false});

schema.plugin( uniqueValidator, null );
schema.plugin( timeStamps, { createdAt: 's5r_created_at', updatedAt: 's5r_updated_at' } );

module.exports.Schema = schema;
module.exports.Model = mongoose.model( 'repos', schema );
