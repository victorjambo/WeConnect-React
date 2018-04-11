import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from './Auth/Register.jsx';
import Login from './Auth/Login.jsx';
import NavigationBar from './common/NavigationBar.jsx';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './Auth/PrivateRoute.jsx';
import Protected from './Protected.jsx';

ReactDOM.render(
	<BrowserRouter>
	  <div>
	    <NavigationBar />
      <Route exact path="/" component={App} />
      <Route path="/auth/signup" component={Register} />
      <Route path="/auth/login" component={Login} />
      <PrivateRoute path="/protected" component={Protected} />
    </div>
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
