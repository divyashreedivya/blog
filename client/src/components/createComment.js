import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import authHeader from '../auth/header';
import AuthService from '../auth/service';

class CreateComment extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            content:'',
            author:'',
            cancreate:false
        };
    }
    componentDidMount(){
        if(AuthService.getUser()){
            this.setState({
                author: AuthService.getCurrentUser(),
                cancreate:true
            });
        }

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
        axios.post('http://localhost:8082/api/posts/'+this.props.match.params.id+'/comments',data
        ,{ headers: authHeader(),params:{"secret_token":this.state.author} })
        .then(res=>{
            this.setState({
                title:'',
                content:''
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
                {this.state.cancreate &&(
                    <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br/>
                            <Link to={`/show-post/${this.props.match.params.id}/show-comments`} 
                            className="btn btn-outline-info float-left">
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
                                
                                <div className="form-group">
                                 <input 
                                   type="text"
                                   placeholder="Comment content"
                                   name="content"
                                   className="form-control"
                                   value={this.state.content}
                                   onChange={this.onChange}/>  
                                </div>
                                <input type="submit"  className="btn btn-success btn-block mt-4"/>
                                <br/>
                            </form>
                        </div>
                    </div>
                </div>
                )}
                {!this.state.cancreate &&(
                    <div className="container">
                        <div className="card-com card card-container">
                        <h2> <Link to="/login" className="card-com-link">Please Log In to add comment</Link></h2>
                    <h5><Link to ={`/show-post/${this.props.match.params.id}/show-comments`}
                    className="card-com-link">
                        Go back</Link></h5>
                    </div>
                    </div>
                )}
                
            </div>
        )
    }
}

export default CreateComment;