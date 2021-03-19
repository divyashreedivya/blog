import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import authHeader from '../auth/header';
import AuthService from '../auth/service';

class UpdateComment extends Component{
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
                cancreate:true
            });
        }
        axios.get('http://localhost:8082/api/posts/'+this.props.match.params.id+'/comments/'+this.props.match.params.commentId)
        .then(res =>{
            this.setState({
                title:res.data.title,
                content:res.data.content,
                author:res.data.author
            });
        })
        .catch(err =>{
            console.log("Error from updateComment");
        });
    };

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
        axios.put('http://localhost:8082/api/posts/'+this.props.match.params.id+'/comments/'+this.props.match.params.commentId,
        data,{ headers: authHeader(),params:{"secret_token":AuthService.getCurrentUser()} })
        .then(res=>{
            this.props.history.push(`/show-post/${this.props.match.params.id}/show-comments`);
        })
        .catch(err=>{
            console.log("Error in updateComment");
        });
    };
    render(){
        return(
            <div className="CreateComment">
                {this.state.cancreate && (
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <br/>
                        <Link to={`/show-post/${this.props.match.params.id}/show-comments`} 
                        className="btn btn-outline-info float-left">
                            Go to post
                        </Link>
                    </div>
                    <div className="col-md-8 m-auto">
                        <h1>Edit comment</h1>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="form-group">
                             <input 
                               type="text"
                               placeholder="Comment"
                               name="title"
                               className="form-control"
                               value={this.state.title}
                               onChange={this.onChange}/>
                            </div>
                            
                            <div className="form-group">
                             <input 
                               type="text"
                               placeholder="Comment"
                               name="content"
                               className="form-control"
                               value={this.state.content}
                               onChange={this.onChange}/>  
                            </div>
                            {/* <div className="form-group">
                             <input 
                               type="text"
                               placeholder="Author"
                               name="author"
                               className="form-control"
                               value={this.state.author}
                               onChange={this.onChange}/>
                            </div>
                            <br/><br/> */}
                            <input type="submit"  className="btn btn-success btn-block mt-4"/>
                        <br/>
                        </form>
                    </div>
                </div>
            </div>
                )}
                {!this.state.cancreate &&(
                    <div className="container">
                    <div className="card card-container">
                    <h2> <Link to="/login">Please Log In to edit comment</Link></h2>
                    <h5><Link to ={`/show-post/${this.props.match.params.id}/show-comments`}>
                     Go back</Link></h5>
                    </div>
                    </div>
                )}

            </div>
        )
    }
}

export default UpdateComment;