var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('artist', ArtistSchema);
