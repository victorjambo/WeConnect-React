import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Buttons = ({
  paramId, deleteBusiness, isDeleting, error, isCurrentUser
}) => (
  <div className="push">
    { isCurrentUser &&
      <div>
        <Link to={`/business/${paramId}/edit`} className="btn btn-warning">Edit</Link>&nbsp;
        <button onClick={deleteBusiness} className="btn btn-danger">
          Delete Business
          { isDeleting && <i className="fa fa-spinner fa-spin" /> }
        </button>
      </div>
    }
    <br /><br />
    { error && <div className="alert alert-danger">{error}</div> }
  </div>
);

Buttons.propTypes = {
  paramId: PropTypes.string.isRequired,
  isDeleting: PropTypes.bool,
  deleteBusiness: PropTypes.func.isRequired,
  error: PropTypes.string,
  isCurrentUser: PropTypes.bool
};

Buttons.defaultProps = {
  paramId: ''
};

export const Overview = ({ business }) => (
  <div className="overview bucket">
    <h2>Overview</h2>
    <div className="overview-info">
      <label>Name:&nbsp;</label>
      <span className="value">{business.name}</span>
    </div>
    <div className="overview-info">
      <label>Location:&nbsp;</label>
      <span className="value">{business.location}</span>
    </div>
    <div className="overview-info">
      <label>Category:&nbsp;</label>
      <span className="value">{business.category}</span>
    </div>
  </div>
);

Overview.propTypes = {
  business: PropTypes.object.isRequired
};

Overview.defaultProps = {
  business: {}
};

export const About = ({ business }) => (
  <div className="about bucket">
    <h2>About {business.name}</h2>
    <div className="about-txt">
      <p>{business.bio}</p>
    </div>
  </div>
);

About.propTypes = {
  business: PropTypes.object.isRequired
};

About.defaultProps = {
  business: {}
};
