import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import Landing from './components/Landing';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';

ReactDOM.render((
  <Router>
    <div>
      <Route exact={true} path="/" component={Landing} />
      <Route exact={true} path="/signup" component={SignupForm}/>
      <Route exact={true} path="/login" component={LoginForm} />
    </div>
  </Router>
), document.getElementById('root'));