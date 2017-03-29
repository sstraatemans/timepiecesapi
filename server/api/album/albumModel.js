var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
  nid: { //the NodeID from drupal
    type: Number
  },
  artist: { type: Schema.Types.ObjectId, ref: 'Artist' },
  mid: { //the ID of Freebase
    type: String
  },
  tracks: { type : Array , "default" : [] },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'artist'
  },
  wikiLink: {
    type: String
  },
  website: {
    type: String
  },
  profileImage: { //the filename of the albumcover
    type: String
  },
  year: { //the year when published
    type: Number
  },
  itunes: String,
  amazon: String,
  spotify: String,
  artistId: Number //This is only the export value. this needs to be converted. and can be deleted after init import
});

module.exports = mongoose.model('album', AlbumSchema);
