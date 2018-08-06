import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './css/NavigationBar.css';
import Dropdown from './ElementComponents/Dropdown';
import Auth from '../helpers/Auth';

/**
 * NavigationBar
 */
class NavigationBar extends Component {
  /**
   * constructor that takes
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      fireRedirect: false,
      clicked: false
    };

    this.logout = this.logout.bind(this);
    this.click = this.click.bind(this);
  }

  click() {
    this.setState({
      clicked: true
    });
  }

  /**
   * Change state of login
   * @returns {object} new state
   * then redirect and re-render component
   */
  logout() {
    Auth.signout();
    window.sessionStorage.removeItem('token');
    this.setState({ fireRedirect: true });
    this.forceUpdate();
  }

  /**
   * @return {jsx} html to be rendered
   */
  render() {
    const { fireRedirect, clicked } = this.state;
    return (
      <nav className="navbar navbar-default navbar-override navbar-custom navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header page-scroll">
            <button type="button"
              className="navbar-toggle" data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              Menu <i className="fa fa-bars"/>
            </button>
            <Link className="navbar-brand" to="/" id="navbar-logo">
              We<span className="txt-shadow">Connect</span>
            </Link>
          </div>
          <Dropdown logout={this.logout} click={this.click} clicked={clicked}/>
        </div>
        { fireRedirect && (<Redirect to="/" />) }
      </nav>
    );
  }
}

export default NavigationBar;
