import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import BookSingle from './components/BookSingle';
import BookList from './components/books/BookListView';
import Login from './components/profile/Login';
import Signup from './components/profile/AddUser';
import Profile from './components/profile/Profile';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App} />
            <Route path='/book-view' component={BookSingle} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/profile' component={Profile} />

        </div>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
