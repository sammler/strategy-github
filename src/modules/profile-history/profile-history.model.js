import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let ProfileHistorySchema = new Schema( {}, { collection: 'profile-history', strict: false } );

module.exports.Schema = ProfileHistorySchema;
module.exports.Model = mongoose.model( 'profile-history', ProfileHistorySchema );
