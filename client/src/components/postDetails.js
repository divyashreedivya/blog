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
    };

    render(){
        const post = this.state.post;
        let postItem = <div>
            <table className="table table-hover table-dark">
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Title</td>
                        <td>{post.title}</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Author</td>
                        <td>{post.author}</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Content</td>
                        <td>{post.content}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        return(
             <div className="postDetails">
                 <div className="container">
                     <div className="row">
                         <div className="col-md-10 m-auto">
                             <br/><br/>
                            <Link to="/" className="btn btn-outline-warning float-left">
                                Posts
                            </Link>
                         </div>
                         <br/>
                         <div className="col-md-8 m-auto">
                             <h1 className="display-4 text-center">Post</h1>
                             <p className="lead text-center">
                        Post info
                            </p>
                            <hr/><br/>
                         </div>
                     </div>
                     <div>
                         {postItem}
                     </div>
                     <div className="row">
                         <div className="col-md-6">
                             <button type="button" className="btn btn-outline-danger btn-lg btn-block" 
                             onClick={this.onDeleteClick.bind(this,post._id)}>Delete post</button>
                             <br/>
                         </div>
                         <div className="col-md-6">
                             <Link to={`/edit-post/${post._id}`} className="btn btn-outline-info btn-lg btn-block">
                                 Edit Post
                             </Link>
                             <br/>
                         </div>
                     </div>
                     <div className="row">
                        <div className="col-md-12">
                            <br/>
                            <h1 className="display-4 text-center">
                            <Link to={`/show-post/${post._id}/show-comments`} className="display-4 text-center">Comments</Link>
                            </h1>
                        </div>

                 {/* <CommentsList></CommentsList> */}
             </div>
                 </div></div>

        );
    }
}

export default PostDetails;