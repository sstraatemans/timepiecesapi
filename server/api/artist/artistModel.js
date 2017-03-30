var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
  nid: { //the NodeID from drupal
    type: Number,
    unique: true
  },
  mid: { //the ID of Freebase
    type: String
  },
  title: {
    type: String,
    required: true
  },
  name: { //name of the band
    firstName: {
      type: String
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String
    }
  },
  body: {
    type: String
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
  memberships: {
    type: Array
  },
  alias: {
    type: Array
  },
  genre: {
    type: Array
  },
  relatedArtists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
  related_artists: Array //This is only the export value. this needs to be converted. and can be deleted after init import
});

module.exports = mongoose.model('artist', ArtistSchema);
