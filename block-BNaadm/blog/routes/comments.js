var express = require('express');
var router = express.Router();

var Comment = require('../models/Comment');
var Article = require('../models/Article');


router.get('/:commentId/edit', (req, res, next) => {
    var commentId = req.params.commentId;
    Comment.findById(commentId, (err, comment) => { 
     if(err) return next(err)
     res.render('editComment', { comment }) // This is object is used for populating through the input
    })
});
// For updating the comment
router.post('/:id', (req, res, next) => {
    var id = req.params.id;
    Comment.findByIdAndUpdate(id, req.body, (err, comment) => {
        if(err) return next(err);
        res.redirect('/articles/' + comment.articleId);
    })
});

// delete

router.get('/:id/delete', (req, res, next) => {
    var id = req.params.id;
    Comment.findByIdAndDelete(id, (err, comment) => { 
     if(err) return next(err)
     //  removing the reference of Objectid of the comment from database
     Article.findByIdAndUpdate(comment.articleId, {$pull: {comments: comment.id}}, (err, article) => {
         if(err) return next(err)
         res.redirect('/articles/' + comment.articleId); // This is object is used for populating through the input
        })
    })
});

module.exports = router;
 