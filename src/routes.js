import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import NewPost from './components/NewPost/NewPost';
import Register from './components/Register/Register';
import Post from './components/Post/Post';
import FindAdventure from './components/FindAdventure/pages/FindAdventure';
import Profile from './components/Profile/Profile'

export default (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/home" component={Home}/>
        <Route path="/posts/:postId" component={Post}/>
        <Route path="/newpost" component={NewPost}/>
        <Route path="/findadventure" component={FindAdventure}/>
        <Route path="/profile/:id" component={Profile}/>
    </Switch>
);