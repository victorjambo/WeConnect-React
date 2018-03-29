import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from './Auth/Register.jsx';
import Login from './Auth/Login.jsx';
import NavigationBar from './common/NavigationBar.jsx';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
	  <div>
	    <NavigationBar />
      <Route exact path="/" component={App} />
      <Route path="/auth/signup" component={Register} />
      <Route path="/auth/login" component={Login} />
    </div>
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
