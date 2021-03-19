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
            // post: {},
            id:'',
            title:'',
            content:'',
            author:'',
            author_name:'',
            isuser:false
        };
    }

    componentDidMount(){
        if(AuthService.getUser()){
            this.setState({
                isuser:true
            });
        };
        axios.get('http://localhost:8082/api/posts/'+this.props.match.params.id)
        .then( res=>{
        
            this.setState({
                id:res.data._id,
                title:res.data.title,
                content:res.data.content,
                author:res.data.author._id,
                author_name:res.data.author.username
            })
        })
        .catch(err =>{
            console.log(err);
            console.log("Error from postDetails");
        })
    };
    logOut(){
        this.setState({
            isuser:false
        });
        AuthService.logout();
    };
    onDeleteClick(id) {
        const post ={
            title:this.state.title,
            content:this.state.content,
            author:this.state.author
        };
        if(!AuthService.getUser()){
            alert("Please login to delete post!");
        }
        else{
            axios.delete('http://localhost:8082/api/posts/'+id,{
                headers: authHeader(),data:post,params:{"secret_token":AuthService.getCurrentUser()
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
       // const post = this.state.post;
        let postItem = <div>
            <h1>Post: {this.state.title}</h1>
            <br/>
            <h5>Author: {this.state.author_name}</h5>
            <br/><br/>
            <p>{this.state.content}</p>
        </div>
        return(
             <div className="postDetails">
                 <div className="container">
                 
                     <div className="row">
                     <br/><br/>
                         <div className="col-md-6 ">
                         <br/> 
                            <Link to="/" className="btn btn-outline-info float-left">
                                Posts
                            </Link>
                         </div>
                         <div className="col-md-6">
                         {this.state.isuser && (
                        <div className="row">
                        
                            {/* <div className="col-md-10"></div> */}
                         <div className="col-md-2 m-auto">
                             <br/>
                             <button type="button" className="btn btn-outline-danger" 
                             onClick={this.onDeleteClick.bind(this,this.state.id)}>Delete post</button>
                             <br/>
                         </div>
                         <div className="col-md-2 m-auto">
                             <br/>
                             <Link to={`/edit-post/${this.state.id}`} className="btn btn-outline-info">
                                Edit Post
                             </Link>
                             <br/>
                         </div>
                        {/* <br/><br/><br/> */}
                         <div className="col-md-2 m-auto">
                             <br/>
                         <button onClick={this.logOut.bind(this)} className="btn btn-outline-warning">Log Out</button>
                     </div>
                     </div>
                         )}
                         </div>
                   </div>
                         <br/>
                     
                     <div>
                         {postItem}
                     </div>
                     <b/><br/>

                     <div className="row">
                        <div className="col-md-12">
                            <br/>
                            <h1 className="display-4 text-center">
                            <Link to={`/show-post/${this.state.id}/show-comments`} className="display-4 text-center">Comments </Link>
                            </h1>
                        </div>
             </div>
                 </div></div>

        );
    }
}

export default PostDetails;