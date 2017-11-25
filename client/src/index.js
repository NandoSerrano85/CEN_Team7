import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import AddUser from './components/AddUser';
import loginPage from './components/Login';
import Profile from './components/ProfilePage';
import BookSingle from './components/BookSingle';
import AuthorView from './components/AuthorView';


ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/add-user' component={AddUser} />
        <Route path='/login' component={loginPage} />
        <Route path='/profile/:id' component={Profile} />
        <Route exact path='/book-view' component={BookSingle} />
        <Route exact path='/authorView' component={AuthorView} />
      </div>
  </Router>,
  document.getElementById('root')
);
