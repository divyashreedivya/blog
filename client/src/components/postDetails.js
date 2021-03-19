import React, {Component} from 'react';
import axios from 'axios';
import '../App.css';
import {Link} from 'react-router-dom';
// import CommentsList from './commentsList';
import authHeader from '../auth/header';
import AuthService from '../auth/service';

class PostDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            post: {}
        };
    }

    componentDidMount(){
        axios.get('http://localhost:8082/api/posts/'+this.props.match.params.id)
        .then( res=>{
            this.setState({
                post: res.data
            })
        })
        .catch(err =>{
            console.log("Error from postDetails");
        })
    };

    onDeleteClick(id) {
        if(!AuthService.getUser()){
            alert("Please login to delete post!");
        }
        else{
            axios.delete('http://localhost:8082/api/posts/'+id,{
                headers: authHeader(),data:this.state.post,params:{"secret_token":AuthService.getCurrentUser()
            } 
           })
            .then(res =>{
                this.props.history.push("/");
            })
            .catch(err =>{
                console.log("Error from PostDetails_deleteClick");
            })
        }

    };

    render(){
        const post = this.state.post;
        let postItem = <div>
            <h1>Post: {post.title}</h1>
            <br/>
            <h5>Author:{post.author}</h5>
            <br/><br/>
            <p>{post.content}</p>
        </div>
        return(
             <div className="postDetails">
                 <div className="container">
                     <div className="row">
                     <br/><br/>
                         <div className="col-md-8 ">
                         <br/> 
                            <Link to="/" className="btn btn-outline-info float-left">
                                Posts
                            </Link>
                         </div>
                         <div className="col-md-2 m-auto">
                             <br/>
                             <button type="button" className="btn btn-outline-danger btn-lg btn-block" 
                             onClick={this.onDeleteClick.bind(this,post._id)}>Delete post</button>
                             <br/>
                         </div>
                         <div className="col-md-2 m-auto">
                             <br/>
                             <Link to={`/edit-post/${post._id}`} className="btn btn-outline-info btn-lg btn-block">
                                Edit Post
                             </Link>
                             <br/>
                         </div>
                         <br/>
                         {/* <div className="col-md-8 m-auto">
                             <h1 className="display-4 text-center">Post</h1>
                             <p className="lead text-center">
                        Post info
                            </p>
                            <hr/><br/>
                         </div> */}
                     </div>
                     <div>
                         {postItem}
                     </div>
                     <b/><br/>
                     {/* <div className="row">
                         <div className="col-md-2">
                             <button type="button" className="btn btn-outline-danger btn-lg btn-block" 
                             onClick={this.onDeleteClick.bind(this,post._id)}>Delete post</button>
                             <br/>
                         </div>
                         <div className="col-md-8"></div>
                         <div className="col-md-2">
                             <Link to={`/edit-post/${post._id}`} className="btn btn-outline-info btn-lg btn-block">
                                 Edit Post
                             </Link>
                             <br/>
                         </div>
                     </div> */}
                     <div className="row">
                        <div className="col-md-12">
                            <br/>
                            <h1 className="display-4 text-center">
                            <Link to={`/show-post/${post._id}/show-comments`} className="display-4 text-center">Comments </Link>
                            </h1>
                        </div>

                 {/* <CommentsList></CommentsList> */}
             </div>
                 </div></div>

        );
    }
}

export default PostDetails;