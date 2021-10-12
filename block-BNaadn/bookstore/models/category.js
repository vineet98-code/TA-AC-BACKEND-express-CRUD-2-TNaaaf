const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categorySchema = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Category', categorySchema);