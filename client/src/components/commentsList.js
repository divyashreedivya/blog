import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../App.css';
import CommentCard from './commentCard';

class CommentsList extends Component{
    constructor(props){
        super(props);
        this.state={
            comments:[]
        };
    }

    componentDidMount(){
        axios.get('http://localhost:8082/api/posts/'+this.props.match.params.id+'/comments')
        // axios.get('http://localhost:8082/api/posts/'+this.props.id+'/comments')
        .then(res=>{
            this.setState({
                comments:res.data
            })
        })
        .catch(err =>{
            console.log("Error from commentsList");
        });
    };

    render(){
        const comments = this.state.comments;
        let commentlist;
        if(!comments){
            commentlist = 'There are no comments.';
        }
        else{
            commentlist = comments.map((comment,k)=>
                <CommentCard comment={comment} key={k}/>
            );
        }
        return(
            <div className="commentsList">
                <div className="container">
                    <div className="row">
                        <div className="col-md-11">
                            <Link to={`/show-post/${this.props.match.params.id}/add-comment`} className="btn btn-outline-warning float-right">
                                + Add a comment
                            </Link>
                    {/* <Link to={`/show-post/${this.props._id}/add-comment`} className="btn btn-outline-warning float-right">
                                + Add a comment
                            </Link> */}
                            <br/><br/>
                            <hr/>
                        </div>
                    </div>
                    <div className="comments">
                        {commentlist}
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentsList;