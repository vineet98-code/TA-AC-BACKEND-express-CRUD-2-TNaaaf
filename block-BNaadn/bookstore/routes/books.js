var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var Author = require('../models/author');

// listing all articles
router.get('/', (req, res, next) => {
Book.find({}, (err, books) => {
     if(err) return next(err)
      res.render('books', { books: books } )
    })
});

// For rendering article and create form => GET on "/books/new"
router.get('/new', (req, res, next) => {
    res.render('addBook');
});

// Sending data 
router.post('/', function (req, res, next) {
    Author.findOne({ author_email: req.body.author_email }, (err, author) => {
      if (err) return next(err);
      if (!author) {
        Author.create(req.body, (err, author) => {
          req.body.authorId = author._id;
          Book.create(req.body, (err, book) => {
            console.log(typeof book.id, typeof book._id);
            if (err) return next(err);
            Author.findByIdAndUpdate(
              author._id,
              { $push: { booksId: book.id } },
              { new: true },
              (err, updatedAuthor) => {
                console.log(updatedAuthor);
                if (err) return next(err);
                res.redirect('/books');
              }
            );
          });
        });
      } else {
        req.body.authorId = author._id;
        Book.create(req.body, (err, book) => {
            console.log(typeof book.id, typeof book._id);
            if (err) return next(err);
            Author.findByIdAndUpdate(
                author._id,
                { $push: { booksId: book.id } },
                { new: true },
                (err, updatedAuthor) => {
                console.log(updatedAuthor);
                if (err) return next(err);
                res.redirect('/books');
                }
            );
        });
       }
    });
});

// Fetch Single article
router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    Book.findById(id).populate('authorId').exec((err, book) => {
        console.log(book);
        
    res.render('singleBooks', { book: book })
   });
});


// Delete operation
router.get('/:id/delete', (req, res, next) => {
    var id = req.params.id;
    Book.findByIdAndDelete(id, (err, books) => {
        console.log(books);
        Author.findByIdAndUpdate(books.authorId, { $pull: { booksId: books._id }},
            (err, author) => {
                res.redirect('/books/');
            }
        );
    });
});
    

// // increment likes
// router.get('/:id/likes', (req, res, next) => {
//     var id = req.params.id;
  
//     Book.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
//       if (err) return next(err);
//       res.redirect('/articles/' + id);
//     });
//   });

// //  increment dilikes
// router.get('/:id/dislikes', (req, res, next) => {
//     var id = req.params.id;
  
//     Book.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, article) => {
//         if (err) return next(err);
//         res.redirect('/articles/' + id);
//     });  
// });

// Comment

// // This is a articleId because comment hasn't been created
// router.post('/:articleId/comments', (req, res, next) => {
//     var articleId = req.params.articleId;
//     console.log(req.body);
//     req.body.articleId = articleId;
//     Comment.create(req.body, (err, comment) => {
//         if (err) return next(err);
//         Book.findByIdAndUpdate(articleId, { $push: { comments: comment.id}}, (err, article) => {
//             if (err) return next(err);
//             res.redirect('/articles/' + articleId); // redirect back to the articledetails.ejs
//         })
//     });  
// });


module.exports = router;