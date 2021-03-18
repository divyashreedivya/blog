const express = require('express');
const comment = require('../models/comment');
const router = express.Router();
const authenticate = require('../auth/auth');

const Comment = require('../models/comment');
const Post = require('../models/post');

router.get('/test', (req,res)=> { res.send("Comment route testing!")});

router.get('/:id/comments', (req,res)=>{
    Post.findById(req.params.id)
    .then(postItem => {
        Comment.find({post:req.params.id})
        .then(comments =>{ res.json(comments) })
        .catch(err => { res.status(404).json({nocommentsfound:'No comments'})});
    })
    .catch(err =>{res.status(404).json({nopostfound:'No post found'})});

});

router.post('/:id/comments',authenticate.verifyUser, (req,res)=>{
    Post.findById(req.params.id)
    .then(post =>{
        req.body.post = req.params.id;
        req.body.author = req.user;
        Comment.create(req.body)
        .then(comment => { res.json({msg: 'Comment added successfully'})})
        .catch(err => { res.status(400).json({error: 'Cannot add this comment'})});
    })
    .catch(err =>{res.status(404).json({nopostfound:'No post found'})});
});


router.get('/:id/comments/:commentId',(req,res)=>{
    Comment.findById(req.params.commentId)
    .then(comment=> {res.json(comment)})
    .catch(err =>{ res.status(404).json({error:'No such comment found'})});
});

router.put('/:id/comments/:commentId',authenticate.verifyUser, (req,res)=>{
    if(req.body.author  == req.user._id){
        Comment.findByIdAndUpdate(req.params.commentId,req.body)
        .then(comment=> res.json({msg:'Updated comment successfully'}))
        .catch( err => res.status(400).json({error: 'Unable to update comment'}));
    }
    else{
        res.status(400).json({error: 'Unable to update comment(wrong user)'});
    }

});

router.delete('/:id/comments/:commentId',authenticate.verifyUser, (req,res)=>{
    // console.dir(req.params.commentId);
    //  req.body.post = req.params.id;
    if(req.body.author === req.user._id){
        Comment.findByIdAndRemove(req.params.commentId,req.body)
        .then(comment => {res.json({msg:'Comment deleted successfully'})})
        .catch(err =>{ res.status(404).json({error:'No such comment found'})});
    }
    else{
        res.status(404).json({error:'Unable to delete(Wrong user)'});
    }
});



module.exports = router;