import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from './Auth/Register.jsx';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Link } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
	  <div>
	    <nav className="navbar navbar-default navbar-override navbar-custom navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header page-scroll">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                Menu <i className="fa fa-bars"></i>
              </button>
              <Link className="navbar-brand" to="/" id="navbar-logo">
                We<span className="txt-shadow">Connect</span>
              </Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/">Home</Link></li>
                <li className="dropdown"><Link to="/signup">Register</Link></li>
                <li><Link to="/">login</Link></li>
              </ul>
            </div>
          </div>
      </nav>
	    			
      <Route exact path="/" component={App} />
      <Route path="/signup" component={Register} />
    </div>
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
