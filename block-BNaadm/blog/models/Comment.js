var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    text : { type: String, required: true },
    // Any time we store ObjectId of any other document, which belongs to some other models, we are going to use Schema.Types.ObjectId
    // required because we don't want any comment would created without an article id simply means that we have no track of that comment
    // ref is used to populate the document
    // articleId will retive from the routes
    articleId: { type: Schema.Types.ObjectId, required: true, ref: 'Article' },
    author : String,
    likes: { type: Number, default: 0 },
    
}, {timestamps: true })
    
// This Book is used to perform the crud operation and capture it in router book.js
module.exports = mongoose.model('Comment', commentSchema); // model is equivalent to colletions