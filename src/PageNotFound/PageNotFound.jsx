import React from 'react';
import { Route, Link } from 'react-router-dom';
import './PageNotFound.css';

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext)
      staticContext.status = code
    return children
  }}/>
)

const PageNotFound = () =>
  <Status code={404}>
    <div className="NotFoundPage">
      <h1>Oops!</h1>
      <div>
        Looks like you're lost...
      </div>
      <div className="action">
        <Link className="btn btn-primary" to="/">Guide me to the right path!</Link>
      </div>
    </div>
  </Status>

export default PageNotFound;
