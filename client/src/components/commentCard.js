import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import authHeader from '../auth/header';
import AuthService from '../auth/service';


class CommentCard extends Component{
    constructor(props){
        super(props);
        this.state={
            comment: props.comment
        };
    }
    onDeleteClick(id){
    if(!AuthService.getUser()){
        alert("Please login to delete comment");
    }
    else{
        const datadel = {
            title:this.state.comment.title,
            content:this.state.comment.content,
            author:this.state.comment.author._id
        };
        axios.delete(`http://localhost:8082/api/posts/${this.state.comment.post}/comments/${id}`
        ,{headers: authHeader(),data:datadel,params:{"secret_token":AuthService.getCurrentUser()}}
        )
        .then(res =>{
            this.props.history.push(`/show-post/${this.state.comment.post}/`);
        })
        .catch(err =>{
            console.log("Error from commentcard_deleteClick");
            console.log(err);
        })
    }

};
  render(){
      return(
            <div className="card-comment card-container">
            <div className="desc">
                <h3>{this.state.comment.title}</h3>
                <p>{this.state.comment.content}</p>
                <br></br>
                <p>By {this.state.comment.author.username} on {this.state.comment.createdAt.slice(0,10)}</p>
                
            </div>
            <div className="row">
                <div className="col-md-1">
                    <Link to={`/show-post/${this.state.comment.post}/edit-comment/${this.state.comment._id}`}
                    className="btn btn-outline-warning btn-lg btn-block">
                       <i className="fa fa-pencil" aria-hidden="true">Edit</i>
                       </Link>
                </div>
                <div className="col-md-1">
                    <button type="button" className="btn btn-outline-danger btn-lg btn-block" 
                    onClick={this.onDeleteClick.bind(this,this.state.comment._id)}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
       
      )
  }
}

export default CommentCard;