var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
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
  name: { //name of the band
    firstName: {
      type: String
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String,
      required: true
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
  amazon: { //the amazon ID
    type: String
  },
  hits: { //hits on the page
    type: Number
  }
});

module.exports = mongoose.model('artist', ArtistSchema);
