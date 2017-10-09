import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import AddItem from './components/AddItem';
import IndexBook from './components/IndexBook';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App} />
            <Route path='/admin/add-item' component={AddItem} />
            <Route path='/admin/items-books' component={IndexBook} />
            <Route path='/admin/users' component={}/>
            <Route Path='/admn/records' component={}/>
            <Route path='/book/search' component={}/>
            <Route path='/book/details' component={}/>
            <Route path='/cart' component={}/>
        </div>
    </Router>,
    document.getElementById('root')
);
