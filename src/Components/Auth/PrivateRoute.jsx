import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../../helpers/Auth';

/**
 * Redirects users to login page if they are not authenticated
 * @param {func} Component
 * @return {object} Component
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (Auth.isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/auth/login',
          state: { from: props.location }
        }}
      />
    ))
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object
};

export default PrivateRoute;
