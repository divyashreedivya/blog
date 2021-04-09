import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import authHeader from '../auth/header';
import AuthService from '../auth/service';

class UpdatePost extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            content:'',
            author:'',
            canedit:false
        };
    }

    componentDidMount(){
        if(AuthService.getUser()){
            this.setState({
                canedit:true
            });
        }
        axios.get('http://localhost:8082/api/posts/'+this.props.match.params.id)
        .then(res=>{
            this.setState({
                title: res.data.title,
                content: res.data.content,
                author: res.data.author._id
            })  
        })
        .catch(err =>{
            console.log("Error from UpdatePost");
        })
    };

    onChange = e =>{
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = e =>{
        e.preventDefault();
        const data = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author
        };
        axios.put('http://localhost:8082/api/posts/'+this.props.match.params.id,data,
        { headers: authHeader(),params:{"secret_token":AuthService.getCurrentUser()} })
        .then(res =>{
            this.props.history.push('/show-post/'+this.props.match.params.id);
        })
        .catch(err=>{
            //console.log(err);
            alert("Unauthorized to update post!");
            console.log("Error in updatePost");
        })
};

     render(){
         return(
             <div className="updatePost">
                 {this.state.canedit &&(
                    <div className="container">
                     <div className="row">
                         <div className="col-md-8 m-auto">
                             <br/>
                             <Link to={'/show-post/'+this.props.match.params.id} className="btn btn-outline-info float-left">
                                 Back to Post
                             </Link>
                         </div>
                         
                         <div className="col-md-8 m-auto">
                             <h1 className="display-4 text-center">Edit Post</h1>
                             <p className="lead text-center">Update post content</p>
                         </div>
                     </div>
                     <div className="col-md-8 m-auto">
                     <form noValidate onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <input 
                                    type="text" 
                                    placeholder="Title of the post" 
                                    name="title"
                                    className='form-control'
                                    value={this.state.title}
                                    onChange = {this.onChange}/>
                                </div>
                                <br></br>
                                <div className='form-group'>
                                    <textarea 
                                    type="text" 
                                    placeholder="Content" 
                                    name="content" rows="10"
                                    className='form-control'
                                    value={this.state.content}
                                    onChange = {this.onChange}></textarea>
                                </div>
                                <br></br>
                                <br></br>
                                <input type="submit" className="btn btn-success btn-block mt-4"/>
                            </form>
                     </div>
                 </div>
                 )}
                 {!this.state.canedit &&(
                    <div className="container">
                        <div className="card-req card card-container">
                            <h2> <Link to="/login" className="card-link">Please Log In to edit Post</Link></h2>
                            <h5><Link to ={'/show-post/'+this.props.match.params.id}
                            className="card-link">Go back</Link></h5>
                        </div>
                    </div>
                 )}
             </div>
         )
     }
}

export default UpdatePost;