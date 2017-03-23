var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChartSchema = new Schema({
  nid: { //the NodeID from drupal
    type: Number,
    required: true,
    unique: true
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
    type: Number
  }
});

module.exports = mongoose.model('chart', ChartSchema);
