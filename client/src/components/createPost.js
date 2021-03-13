import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class CreatePost extends Component{
    constructor(){
        super();
        this.state = {
            title:'',
            content:'',
            author:'',
        };
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
        axios.post('http://localhost:8082/api/posts',data)
        .then(res=>{
            this.setState({
                title:'',
                content:'',
                author:'',
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
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br></br>
                            <Link to="/" className="btn btn-outline-warning float-left">
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
                                   {/* <input 
                                    type="text" 
                                    placeholder="Content" 
                                    name="content"
                                    className='form-control'
                                    value={this.state.content}
                                   onChange = {this.onChange}/>*/}
                                    <textarea 
                                    type="text" 
                                    placeholder="Content" 
                                    name="content"
                                    className='form-control'
                                    value={this.state.content}
                                   onChange = {this.onChange}></textarea>
                                </div>
                                <br></br>
                                <div className='form-group'>
                                    <input 
                                    type="text" 
                                    placeholder="Author" 
                                    name="author"
                                    className='form-control'
                                    value={this.state.author}
                                    onChange = {this.onChange}/>
                                </div>
                                <br></br>
                                <input type="submit" className="btn btn-outline-warning btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreatePost;