const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    content: {
        type:String,
        required: true
    },
    author: {
        type:String,
        required:true
    },
    post:{
        type:Schema.Types.ObjectId,
        ref: 'Post'
    }
},{timestamps:true});

module.exports = mongoose.model('Comment',CommentSchema);