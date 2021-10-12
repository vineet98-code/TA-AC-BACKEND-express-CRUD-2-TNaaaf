var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var Author = require('../models/author');

// listing all author
router.get('/', (req, res, next) => {
    Author.find({}).exec((err, authors) => {
        console.log(authors);
        res.render('authorList', { authors: authors } )
    })
});

// // sending data
// router.post('/', (req, res, next) => {
//     // capture data save to database and lastly send response back to client that your book has been submitted
//     Author.create(req.body, (err, author) => {
//         // whatever err thrown by mongoose, That err will be passed to this error handler middleware
//         if (err) return next(err)
//         // redirect default to the get request and fetch a frsh request on /articles
//         res.redirect('/authors');
//     })
// });

// Fetch Single authors by Id
router.get('/:id', (req, res, next) => {
  
  Author.findById(req.params.id).populate('booksId').exec((err, author) =>{
    res.render('singleAuthor', { author: author });
  })
});

module.exports = router;