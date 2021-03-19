const express = require('express');
const router = express.Router();
const authenticate = require('../auth/auth');

const Post = require('../models/post');

router.get('/test',(req,res)=>res.send('Post route testing!'));

router.get('/', (req,res)=>{
    Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostsfound:'No posts found'}));
});

router.get('/:id',(req,res)=>{
    Post.findById(req.params.id)
    .populate("author","-password")
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopostfound: 'No post found'}));
});

router.post('/',authenticate.verifyUser, (req,res)=>{
    req.body.author = req.user;
    Post.create(req.body)
    .then(post => res.json({msg:'Post added successfully!'}))
    .catch(err => res.sendStatus(400).json({error: 'Unable to add this post'}));
});

router.put('/:id',authenticate.verifyUser, (req,res)=>{
        if(req.body.author === req.user._id){
        Post.findOneAndUpdate({_id:req.params.id},req.body)
        .then(post => {
                res.json({msg:'Updated successfully!'});
        })
        .catch( err => {
            console.log("Unable to update");
            res.status(400).json({error: 'Unable to update'})});}
        else{
                res.status(400).json({error: 'Unable to update(Wrong user)'});
            }
});

router.delete('/:id',authenticate.verifyUser, (req,res)=>{
    if(req.body.author == req.user._id){
        Post.findByIdAndRemove(req.params.id,req.body)
        .then(post => res.json({msg:'Post deleted successfully'}))
        .catch(err => res.status(404).json({error: 'No such post'}));
    }
    else{
        res.status(400).json({error: 'Unable to delete(Wrong user)'});
    }

});

module.exports = router;