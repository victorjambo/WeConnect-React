import React from 'react';
import PropTypes from 'prop-types';

const ButtonAuth = ({ disabled, label }) => (
  <button type="submit" className="submit-btn" disabled={disabled}>
    { label }&nbsp;
    { disabled && <i className="fa fa-spinner fa-spin" /> }
  </button>
);

ButtonAuth.propTypes = {
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired
};

ButtonAuth.defaultProps = {
  disabled: false,
  label: ''
};

export default ButtonAuth;