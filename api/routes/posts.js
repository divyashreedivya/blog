const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.get('/test',(req,res)=>res.send('Post route testing!'));

router.get('/', (req,res)=>{
    Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostsfound:'No posts found'}));
});

router.get('/:id',(req,res)=>{
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopostfound: 'No post found'}));
});

router.post('/',(req,res)=>{
    Post.create(req.body)
    .then(post => res.json({msg:'Post added successfully!'}))
    .catch(err => res.sendStatus(400).json({error: 'Unable to add this post'}));
});

router.put('/:id',(req,res)=>{
    Post.findByIdAndUpdate(req.params.id,req.body)
    .then(post => res.json({msg:'Updated successfully!'}))
    .catch( err => res.status(400).json({error: 'Unable to update'}));
});

router.delete('/:id',(req,res)=>{
    Post.findByIdAndRemove(req.params.id,req.body)
    .then(post => res.json({msg:'Post deleted successfully'}))
    .catch(err => res.status(404).json({error: 'No such post'}));
});

module.exports = router;