import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import CreatePost from './components/createPost';
import PostList from './components/postsList';
import PostDetails from './components/postDetails';
import UpdatePost from './components/updatePost';

class App extends Component{
  render(){
    return(
      <Router>
        <div>
          <Route exact path='/' component={PostList}/>
          <Route path='/create-post' component={CreatePost}/>
          <Route path='/edit-post/:id' component={UpdatePost}/>
          <Route path='/show-post/:id' component={PostDetails}/>
        </div>
      </Router>
    );
  }
}

export default App;

