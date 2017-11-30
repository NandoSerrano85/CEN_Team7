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
import Cart from './components/cart/Cart';
import AuthorView from './components/books/AuthorView';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App} />
            <Route path='/book-view' component={BookSingle} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/add-user' component={Signup} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='/cart' component={Cart}/>
            <Route path='/author-view' component={AuthorView}/>
        </div>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
