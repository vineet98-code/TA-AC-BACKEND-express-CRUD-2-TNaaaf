var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title : { type: String, required: true },
    description :{ type: String, required: true },
    tags : [String],
    author: String,
    likes: { type: Number, default: 0 }

}, {timestamps: true });

// This Book is used to perform the crud operation and capture it in router book.js
module.exports = mongoose.model('Article', articleSchema); // model is equivalent to colletions
