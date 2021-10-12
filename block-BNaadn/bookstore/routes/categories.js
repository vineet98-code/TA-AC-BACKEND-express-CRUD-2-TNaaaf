var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var Author = require('../models/author');

// Get home page
router.get('/motivation', function(req, res, next) {
    Book.find({}).exec((err, books) => {
        var some = books.filter((book) => {
            if(book.category.includes('motivation')){
                return book;
            }
        });
        res.render('motivation', { book: some })

    })
});


router.get('/fiction', function(req, res, next) {
    Book.find({}).populate('authorId').exec((err, books) => {
        var some = books.filter((book) => {
            if(book.category.includes('fiction')){
                return book;
            }
        });
        res.render('fiction', { book: some })

    })
});

router.get('/adventure', function(req, res, next) {
    Book.find({}).populate('authorId').exec((err, books) => {
        var some = books.filter((book) => {
            if(book.category.includes('adventure')){
                return book;
            }
        });
        res.render('adventure', { book: some })

    })
});

router.get('/technology', function(req, res, next) {
    Book.find({}).populate('authorId').exec((err, books) => {
        var some = books.filter((book) => {
            if(book.category.includes('technology')){
                return book;
            }
        });
        res.render('technology', { book: some })

    })
});






module.exports = router;


