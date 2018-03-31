import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../Auth/Auth';

class NavigationBar extends Component {
  
  render() {
    return (
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
              { !Auth.isAuthenticated && <li className="dropdown">
                <Link to="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <span className="glyphicon glyphicon-bell"></span>
                  <span className="badge"></span>
                </Link>
                <ul className="dropdown-menu">
                  <li><Link to="/">Notification 1</Link></li>
                  <li role="separator" className="divider"></li>
                  <li><Link to="/">Notification 2</Link></li>
                  <li role="separator" className="divider"></li>
                  <li><Link to="/">Notification 3</Link></li>
                  <li role="separator" className="divider"></li>
                  <li><Link to="/">Notification 4</Link></li>
                  <li role="separator" className="divider"></li>
                  <li><Link to="/">Notification 5</Link></li>
                </ul>
              </li> }
              { !Auth.isAuthenticated && <li><Link to="/auth/logout">logout</Link></li> }
              { Auth.isAuthenticated && <li><Link to="/auth/signup">signup</Link></li> }
              { Auth.isAuthenticated && <li><Link to="/auth/login">login</Link></li> }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
