import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
              <li><Link to="/">Home</Link></li>
              <li className="dropdown"><Link to="/auth/signup">Register</Link></li>
              <li><Link to="/auth/login">login</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
