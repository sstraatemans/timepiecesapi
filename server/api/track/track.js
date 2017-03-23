var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrackSchema = new Schema({
  nid: { //the NodeID from drupal
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String
  },
  duration: {
    type: Number
  },
  order: {
    type: Number
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  }
});

module.exports = mongoose.model('track', TrackSchema);
