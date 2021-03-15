import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../App.css';

// onDeleteClick(id){
//     axios.delete(`http://localhost:8082/api/posts/${}`+id)
//     .then(res =>{
//         this.props.history.push("/");
//     })
//     .catch(err =>{
//         console.log("Error from commentcard_deleteClick");
//     })
// };

// const CommentCard = (props)=>{
//     const comment = props.comment;
//     return(
//         <div className="card-container">
//             <div className="desc">
//                 <h3>{comment.title}</h3>
//                 <h5>{comment.author}</h5>
//                 <p>{comment.content}</p>
//             </div>
//             <div className="row">
//                 <div className="col-md-6">
//                     <Link to={`/show-post/${comment.post}/edit-comment/${comment._id}`}
//                     className="btn btn-outline-info btn-lg btn-block">Edit comment</Link>
//                 </div>
//                 {/* <div className="col-md-6">
//                     <button type="button" className="btn btn-outline-danger btn-lg btn-block" 
//                     onClick={this.onDeleteClick.bind(this,comment._id)}>Delete comment</button>
//                 </div> */}
//             </div>
//         </div>
//     )
// };

class CommentCard extends Component{
    constructor(props){
        super(props);
        this.state={
            comment: props.comment
        };
    }
    onDeleteClick(id){
    axios.delete(`http://localhost:8082/api/posts/${this.state.comment.post}/comments/${id}`)
    .then(res =>{
        this.props.history.push(`/show-post/${this.state.comment.post}/show-comments`);
    })
    .catch(err =>{
        console.log("Error from commentcard_deleteClick");
    })
};
  render(){
      return(
                  <div className="card-container">
            <div className="desc">
                <h3>{this.state.comment.title}</h3>
                <h5>{this.state.comment.author}</h5>
                <p>{this.state.comment.content}</p>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Link to={`/show-post/${this.state.comment.post}/edit-comment/${this.state.comment._id}`}
                    className="btn btn-outline-info btn-lg btn-block">Edit comment</Link>
                </div>
                <div className="col-md-6">
                    <button type="button" className="btn btn-outline-danger btn-lg btn-block" 
                    onClick={this.onDeleteClick.bind(this,this.state.comment._id)}>Delete comment</button>
                </div>
            </div>
        </div>
      )
  }
}

export default CommentCard;