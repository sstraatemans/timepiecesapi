var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChartCategorySchema = new Schema({
  nid: { //the NodeID from drupal
    type: Number
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String
  },
  country: {
    type: String
  },
  website: {
    type: String
  },
  profileImage: { //the filename of the albumcover
    type: String
  },
  hits: { //hits on the page
    type: Number
  }
});

module.exports = mongoose.model('chartCategory', ChartCategorySchema);
