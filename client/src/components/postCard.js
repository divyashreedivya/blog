import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

const PostCard = (props)=>{
    const post = props.post;
    return(
        <div className="card-container">
            <div className="desc">
                <h2>
                    <Link to={`/show-post/${post._id}`}>
                        {post.title}
                    </Link>
                </h2>
                <h3>{post.author}</h3>
                <p>{post.content}</p>
            </div>
        </div>
    )
};

export default PostCard;