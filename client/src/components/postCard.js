import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
// import {DateTime} from 'luxon';
// const {DateTime} = require('luxon');

const PostCard = (props)=>{
    //const time = DateTime.fromJSDate(props.post.createdAt).toLocaleString(DateTime.DATETIME_MED)
    const post = props.post;
    return(
        <div className="post-card card-container">
            <div className="desc">
                
                    <Link to={`/show-post/${post._id}`} className="post-link">
                       <h2> {post.title}</h2>
                       {/* <h3>{post.author}</h3> */}
                <p>{post.content}</p>
                <p>{post.createdAt.slice(0,10)}</p>
                    </Link>
                
                
            </div>
        </div>
    )
};

export default PostCard;