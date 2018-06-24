import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Auth from '../../helpers/Auth';
import NavNotifications from '../../Components/Notifications/NavNotifications';

const Dropdown = ({ logout }) => (
  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    { Auth.isAuthenticated ? (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown dropdown-notifications">
          <Link to="" className="dropdown-toggle nav-link"
            data-toggle="dropdown" role="button"
            aria-haspopup="true" aria-expanded="false">
            <i data-count="" className="glyphicon glyphicon-bell notification-icon" />
          </Link>
          <NavNotifications />
        </li>
        <li className="dropdown userdashboard">
          <Link to="" className="dropdown-toggle nav-link"
            data-toggle="dropdown" role="button" aria-haspopup="true"
            aria-expanded="false">
            <span className="glyphicon glyphicon-user" />
          </Link>
          <ul className="dropdown-menu">
            <li><Link to="/profile"><span className="glyphicon glyphicon-dashboard" /> Dashboard</Link></li>
            <li role="separator" className="divider" />
            <li>
              <Link to="" onClick={logout} className="logout">
                <span className="glyphicon glyphicon-log-out"/>logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    ) : (
      <ul className="nav navbar-nav navbar-right">
        <li className="Nav-list-link"><Link to="/auth/signup">signup</Link></li>
        <li className="Nav-list-link login"><Link to="/auth/login">login</Link></li>
      </ul>) }
  </div>
);

Dropdown.propTypes = {
  logout: PropTypes.func
};

export default Dropdown;
