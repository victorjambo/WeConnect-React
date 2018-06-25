import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PageNotFound.css';

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code;
    }
    return children;
  }}/>
);

Status.propTypes = {
  code: PropTypes.number,
  children: PropTypes.object
};

const PageNotFound = () => (
  <Status code={404}>
    <div className="NotFoundPage text-center push">
      <h1>404</h1>
      <h2>You have upset the balance of the internet. Go back to the&nbsp;
        <Link to="/">WeConnect Mothership!</Link>
      </h2>
      <img src="/404.jpg" alt="notfound"/>
    </div>
  </Status>
);

export default PageNotFound;
