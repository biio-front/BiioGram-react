import Auth from 'pages/Auth';
import EditProfile from 'pages/EditProfile';
import Home from 'pages/Home';
import CreatePost from 'pages/CreatePost';
import UpdatePost from 'pages/UpdatePost';
import Profile from 'pages/Profile';
import SignUp from 'pages/SignUp';
import React from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';

function RouterApp() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <Router>
        {currentUser ? (
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/profile/edit" component={EditProfile} />
            <Route path="/post/create" component={CreatePost} />
            <Route path="/post/update" component={UpdatePost} />
            <Redirect from="*" to="/" />
          </>
        ) : (
          <>
            <Route path="/auth" component={Auth} />
            <Route path="/signup" component={SignUp} />
            <Redirect from="*" to="/auth" />
          </>
        )}
      </Router>
    </>
  );
}

export default RouterApp;
