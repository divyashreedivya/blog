import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../App.css';
import PostCard from './postCard';

class PostList extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts:[]
        };
    }

    componentDidMount(){
        axios.get('http://localhost:8082/api/posts')
        .then(res=>{
            this.setState({
                posts: res.data,
            })
        })
        .catch(err=>{
            console.log('Error from postsList');
        })
    };
    render(){
        const posts = this.state.posts;
        console.log("Posts: "+posts);
        let postlist;

        if(!posts){
            postlist = 'There are no posts!';
        }
        else{
            postlist = posts.map((post,k)=>
                 <PostCard post = {post} key={k}/>
            );
        }
        return(
            <div className="post-lists">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <br/>
                            <h1 className="display-4 text-center">Posts...</h1>
                        </div>
                        <div className="col-md-11">
                       
                            <Link to="/create-post" className="btn btn-outline-info float-right">
                                + Add new post
                            </Link>
                            <br />
                            <br />
                            <hr />
                        </div>
                    </div>
                    <div className="list">
                        {postlist}
                    </div>
                </div>
            </div>
        );
    }
}

export default PostList;