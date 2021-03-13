import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

const CommentCard = (props)=>{
    const comment = props.comment;
    return(
        <div className="card-container">
            <div className="desc">
                <h3>{comment.title}</h3>
                <h5>{comment.author}</h5>
                <p>{comment.content}</p>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Link to={`/show-post/${comment.post}/edit-comment/${comment._id}`}
                    className="btn btn-outline-info btn-lg btn-block">Edit comment</Link>
                </div>
                {/* <div className="col-md-6">
                    <button type="button" className="btn btn-outline-danger btn-lg btn-block" 
                    onClick={this.onDeleteClick.bind(this,comment._id)}>Delete comment</button>
                </div> */}
            </div>
        </div>
    )
};

export default CommentCard;