import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class CreateComment extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            content:'',
            author:''
        };
    }

    onChange = e =>{
        this.setState({[e.target.name]:e.target.value});
    };
    onSubmit = e =>{
        e.preventDefault();
        const data= {
            title:this.state.title,
            content:this.state.content,
            author:this.state.author
        };
        axios.post('http://localhost:8082/api/posts/'+this.props.match.params.id+'/comments',data)
        .then(res=>{
            this.setState({
                title:'',
                content:'',
                author:''
            });
            this.props.history.push(`/show-post/${this.props.match.params.id}/show-comments`);
        })
        .catch(err=>{
            console.log("Error in createComment");
        });
    };
    render(){
        return(
            <div className="CreateComment">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br/>
                            <Link to={`/show-post/${this.props.match.params.id}/show-comments`} 
                            className="btn btn-outline-warning float-left">
                                Go back
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1>Add a comment</h1>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="form-group">
                                 <input 
                                   type="text"
                                   placeholder="Comment title"
                                   name="title"
                                   className="form-control"
                                   value={this.state.title}
                                   onChange={this.onChange}/>
                                </div>
                                <br/><br/>
                                <div className="form-group">
                                 <input 
                                   type="text"
                                   placeholder="Comment content"
                                   name="content"
                                   className="form-control"
                                   value={this.state.content}
                                   onChange={this.onChange}/>  
                                </div>
                                <br/><br/>     
                                <div className="form-group">
                                 <input 
                                   type="text"
                                   placeholder="Author"
                                   name="author"
                                   className="form-control"
                                   value={this.state.author}
                                   onChange={this.onChange}/>
                                </div>
                                <br/><br/>
                                <input type="submit"  className="btn btn-outline-warning btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateComment;