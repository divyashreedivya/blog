import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

const PostCard = (props)=>{
    const post = props.post;
    return(
        <div className="post-card card-container">
            <div className="desc">
                
                    <Link to={`/show-post/${post._id}`} className="post-link">
                       <h2> {post.title}</h2>
                
                <p>{post.content}</p>
                <p className="time">{post.createdAt.slice(0,10)}</p>
                    </Link>
                
                
            </div>
        </div>
    )
};

export default PostCard;