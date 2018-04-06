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
import Business from './Business/Business';
import NewBusiness from './Business/NewBusiness';

ReactDOM.render(
	<BrowserRouter>
	  <div>
	    <NavigationBar />
      <Route path="/" exact component={App} />
      <Route path="/auth/signup" component={Register} />
      <Route path="/auth/login" component={Login} />
      <Route path="/business/:id" exact component={Business} />
			<PrivateRoute path="/businesses/new" exact component={NewBusiness} />
      <PrivateRoute path="/protected" component={Protected} />
    </div>
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
