import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../Components/Auth/Auth';
import { Redirect } from 'react-router-dom';
import './css/NavigationBar.css';
import Dropdown from './ElementComponents/Dropdown';

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
          <Dropdown logout={this.logout}/>
        </div>
        { fireRedirect && (<Redirect to="/" />) }
      </nav>
    );
  }
}

export default NavigationBar;
