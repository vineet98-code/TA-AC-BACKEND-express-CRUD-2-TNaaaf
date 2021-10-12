const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var authorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  booksId: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

module.exports = mongoose.model('Author', authorSchema);