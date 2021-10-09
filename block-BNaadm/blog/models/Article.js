var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title : { type: String, required: true },
    description :{ type: String, required: true },
    tags : [String],
    author: String,
    likes: { type: Number, default: 0 },
    // keep track of all comments id made on this specific article
    // Any time we store ObjectId of any other document, which belongs to some other models, we are going to use Schema.Types.ObjectId
 
    comments : [{
        // whatever objectId is store here belongs to which model
        type: Schema.Types.ObjectId, ref: 'Comment'
    }]

}, {timestamps: true });

// This Book is used to perform the crud operation and capture it in router book.js
module.exports = mongoose.model('Article', articleSchema); // model is equivalent to colletions