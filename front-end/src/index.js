import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import App from './App';
import * as serviceWorker from './serviceWorker';
import StudentsGrid from './Students/StudentsGrid';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import AddProduct from './Products/Add';
const routing = (
    <Router>
      <div>
        
        <Route exact path="/" component={App} />
        <Route path="/Students" component={StudentsGrid} />
        <Route path="/Auth/Login" component={Login} />
        <Route path="/Auth/SignUp" component={SignUp} />
        <Route path="/Products/add" component={AddProduct} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
