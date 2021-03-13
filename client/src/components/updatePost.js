import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdatePost extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            content:'',
            author:'',
        };
    }

    componentDidMount(){
        axios.get('http://localhost:8082/api/posts/'+this.props.match.params.id)
        .then(res=>{
            this.setState({
                title: res.data.title,
                content: res.data.content,
                author: res.data.author
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
        axios.put('http://localhost:8082/api/posts/'+this.props.match.params.id,data)
        .then(res =>{
            this.props.history.push('/show-post/'+this.props.match.params.id);
        })
        .catch(err=>{
            console.log("Error in updatePost");
        })
};

     render(){
         return(
             <div className="updatePost">
                 <div className="container">
                     <div className="row">
                         <div className="col-md-8 m-auto">
                             <br/>
                             <Link to="/" className="btn btn-outline-warning float-left">
                                 Posts
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
         )
     }
}

export default UpdatePost;