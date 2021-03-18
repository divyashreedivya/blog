import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import CreatePost from './components/createPost';
import PostList from './components/postsList';
import PostDetails from './components/postDetails';
import UpdatePost from './components/updatePost';
import CreateComment from './components/createComment';
import CommentsList from './components/commentsList';
import UpdateComment from './components/updateComment';
import Login from './components/login';
import SignUp from './components/signup';

class App extends Component{
  render(){
    return(
      <Router>
        <div>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={SignUp}/>
          <Route exact path='/' component={PostList}/>
          <Route path='/create-post' component={CreatePost}/>
          <Route path='/edit-post/:id' component={UpdatePost}/>
          <Route path='/show-post/:id' component={PostDetails}/>
          <Route path='/show-post/:id/show-comments' component={CommentsList}/>
          <Route path='/show-post/:id/add-comment' component={CreateComment}/>
          <Route path='/show-post/:id/edit-comment/:commentId' component={UpdateComment}/>
        </div>
      </Router>
    );
  }
}

export default App;

