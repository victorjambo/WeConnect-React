import React from 'react';
import PropTypes from 'prop-types';

const ButtonAuth = ({ disabled, label, classname }) => (
  <button type="submit" className={classname} disabled={disabled}>
    { label }&nbsp;
    { disabled && <i className="fa fa-spinner fa-spin" /> }
  </button>
);

ButtonAuth.propTypes = {
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  classname: PropTypes.string
};

ButtonAuth.defaultProps = {
  disabled: false,
  label: '',
  classname: 'submit-btn'
};

export default ButtonAuth;
