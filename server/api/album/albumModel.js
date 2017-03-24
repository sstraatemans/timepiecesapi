var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
  nid: { //the NodeID from drupal
    type: Number
  },
  mid: { //the ID of Freebase
    type: String
  },
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
  hits: { //hits on the page
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('album', AlbumSchema);
