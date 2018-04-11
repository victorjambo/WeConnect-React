import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth.js';

const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default LoggedInRoute;

// if logged in redirect to home else render <Login />