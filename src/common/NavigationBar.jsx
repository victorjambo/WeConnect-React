import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../Components/Auth/Auth';
import { Redirect } from 'react-router-dom';
import './css/NavigationBar.css';
import NavNotifications from '../Components/Notifications/NavNotifications';

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
    window.sessionStorage.removeItem('token');
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
                <Link to="" className="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <i data-count="" className="glyphicon glyphicon-bell notification-icon"></i>
                </Link>
                <NavNotifications />
              </li> }
              { Auth.isAuthenticated && <li className="dropdown userdashboard">
                <Link to="" className="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <span className="glyphicon glyphicon-user" />
                </Link>
                <ul className="dropdown-menu">
                  <li><Link to="/profile"><span className="glyphicon glyphicon-dashboard" /> Dashboard</Link></li>
                  <li role="separator" className="divider"></li>
                  <li><Link to="" onClick={this.logout}><span className="glyphicon glyphicon-log-out"/>logout</Link></li>
                </ul>
              </li> }
              { !Auth.isAuthenticated && <li className="Nav-list-link"><Link to="/auth/signup">signup</Link></li> }
              { !Auth.isAuthenticated && <li className="Nav-list-link login"><Link to="/auth/login">login</Link></li> }
              { fireRedirect && (<Redirect to="/" />) }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
