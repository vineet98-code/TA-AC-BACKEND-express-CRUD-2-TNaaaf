var express = require('express');
var router = express.Router();
var Article = require('../models/Article');

// listing all articles
router.get('/', (req, res, next) => {

    Article.find({}, (err, articles) => {
     if(err) return next(err)
      res.render('articles', { articles } )
    })
});

// For rendering article and create form => GET on "/books/new"
router.get('/new', (req, res) => {
    res.render('addArticle');
});

// Fetch Single article
router.get('/:id', (req, res, next) => {
      var id = req.params.id;
      Article.findById(id, (err, article) => {
        if(err) return next(err);
        res.render('articleDetails', { article })
    })
});

// Edit the form and rendering the form
router.get('/:id/edit', (req, res, next) => {
    var id = req.params.id;
    Article.findById(id, (err, article) => {
     article.tags = article.tags.join(" ")   
     if(err) return next(err)
     res.render('editArticleForm', { article }) // This is object is used for populating through the input
    })
});

// update the articles through editForm
router.post('/:id', (req, res, next) => {
    var id = req.params.id;
    req.body.tags = req.body.tags.split(" ")   
    Article.findByIdAndUpdate(id, req.body, (err, updatedUser) => {
        if(err) return next(err);
        res.redirect('/articles/' + id);
    })
});

// Delete operation
router.get('/:id/delete', (req, res, next) => {
    var id = req.params.id;
    Article.findByIdAndDelete(id, (err, deletearticle) => {
        if(err) return next(err);
        res.redirect('/articles')
    })
});

router.get('/:id/likes', (req, res, next) => {
    var id = req.params.id;
  
    Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
      if (err) return next(err);
      res.redirect('/articles/' + id);
    });
  });
  
router.get('/:id/dislikes', (req, res, next) => {
    var id = req.params.id;
  
    Article.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, article) => {
      if (err) return next(err);
      res.redirect('/articles/' + id);
    });  
});



// create articles
router.post('/', (req, res, next) => {
    // capture data save to database and lastly send response back to client that your book has been submitted
    req.body.tags = req.body.tags.trim().split(" ");// split into a space so that converted into an array
    Article.create(req.body, (err, createdArticle) => {
        // whatever err thrown by mongoose, That err will be passed to this error handler middleware
        if (err) return next(err)
        // redirect default to the get request and fetch a frsh request on /articles
        res.redirect('/articles');
        
    })
});

module.exports = router;