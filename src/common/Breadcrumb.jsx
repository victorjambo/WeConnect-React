import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Breadcrumb = ({ routename }) => (
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><Link to="/">Home</Link></li>
      <li className="breadcrumb-item active" aria-current="page">{routename}</li>
    </ol>
  </nav>
);

Breadcrumb.propTypes = {
  routename: PropTypes.string.isRequired,
};

export default Breadcrumb;
