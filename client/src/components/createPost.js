import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import authHeader from '../auth/header';
import AuthService from '../auth/service';


class CreatePost extends Component{
    constructor(){
        super();
        this.state = {
            title:'',
            content:'',
            // author:AuthService.getCurrentUser(),
            author:'',
            cancreate:false
        };
    }
    componentDidMount(){
        if(AuthService.getUser()){
            this.setState({
                cancreate:true,
                author: AuthService.getCurrentUser()
            });         
        }

        //console.log("getuser:"+AuthService.getCurrentUser());
        console.log("author:"+ this.state.author);
    }
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
        axios.post('http://localhost:8082/api/posts',data,{ headers: authHeader(),params:{"secret_token":this.state.author} })
        .then(res=>{
            this.setState({
                title:'',
                content:'',
            })
            this.props.history.push('/');
        })
        .catch(err=> {
            console.log('Error in CreatePost');
        })
    };

    render(){
        return(
            <div className="CreatePost">
                {this.state.cancreate &&(
                    <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br></br>
                            <Link to="/" className="btn btn-outline-info float-left">
                                Show Posts
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add post</h1>
                            <p className="lead text-center">
                                Create new post
                            </p>
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
                </div>
                )}
                {!this.state.cancreate &&(
                    <div className="container">
                    <div className="card-req card card-container">
                    <h2> <Link to="/login" className="card-link">Please Log In to Create Post</Link></h2>
                    <h5><Link to ="/" className="card-link">Go back</Link></h5>
                    </div>
                    </div>
                )}
            </div>
        )
    }
}

export default CreatePost;