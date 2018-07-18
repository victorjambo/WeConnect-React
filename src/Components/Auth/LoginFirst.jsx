import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Stateless component that takes businessId as prop
 * @param {integer} businessId
 * This is rendered below reviews to prompt users to
 * leave login first before leaving a review
 */
const LoginFirst = ({ businessId }) => (
  <div className="login-first bucket">
    <h2>Login First To Drop a Review</h2>
    <div className="login-first-body">
      <Link to={{
        pathname: '/auth/login',
        state: { from: `/business/${businessId}#new-review` }
      }}
      className="btn btn-primary">
        Login
      </Link>
    </div>
  </div>
);

LoginFirst.propTypes = {
  businessId: PropTypes.string
};

LoginFirst.defaultProps = {
  businessId: '/'
};

export default LoginFirst;
