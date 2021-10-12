var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title : { type: String, required: true },
    summary: String, 
    pages: Number,
    publication: String,
    cover_image: String,
    category: [ String ],
    authorId: { type: Schema.Types.ObjectId, ref: 'Author' }, 

}, { timestamps: true });

// This Book is used to perform the crud operation and capture it in router book.js
var Book = mongoose.model('Book', bookSchema); // model is equivalent to colletions

module.exports = Book;