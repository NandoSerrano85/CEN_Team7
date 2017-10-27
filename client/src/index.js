import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import AddUser from './components/AddUser';
import loginPage from './components/Login';
import Profile from './components/ProfilePage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/add-user' component={AddUser} />
        <Route path='/login' component={loginPage} />
        <Route path='/profile' component={Profile} />
      </div>
  </Router>,
  document.getElementById('root')
);