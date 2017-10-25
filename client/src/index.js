import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import AddItem from './components/AddItem';
import IndexBook from './components/IndexBook';
import BookDetails from './components/BookDetails';
import Carrousel from './components/Carrousel';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App} />
            <Route exact path='/' component={Carrousel} />
            <Route path='/admin/add-item' component={AddItem} />
            <Route path='/admin/items-books' component={IndexBook} />
            <Route path='/books' component={BookDetails} />
        </div>
    </Router>,
    document.getElementById('root')
);
