import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../Auth/Auth';
import { Redirect } from 'react-router-dom';

class NavigationBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      fireRedirect: false
    };

    this.logout = this.logout.bind(this);
  }
  
  logout() {
    Auth.signout();
    window.localStorage.removeItem('token');
    this.setState({ fireRedirect: true });
    this.forceUpdate();
  }
  
  render() {
    const fireRedirect = this.state.fireRedirect;
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
              { Auth.isAuthenticated && <li className="dropdown dropdown-notifications">
                <Link to="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <i data-count="2" class="glyphicon glyphicon-bell notification-icon"></i>
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
              { Auth.isAuthenticated && <li className="Nav-list-link"><Link to="" onClick={this.logout}>logout</Link></li> }
              { !Auth.isAuthenticated && <li className="Nav-list-link"><Link to="/auth/signup">signup</Link></li> }
              { !Auth.isAuthenticated && <li className="Nav-list-link"><Link to="/auth/login">login</Link></li> }
              { fireRedirect && (<Redirect to="/" />) }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
