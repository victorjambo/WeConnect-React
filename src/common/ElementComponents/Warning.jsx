import React from 'react';
import PropTypes from 'prop-types';

const Warning = ({ warning, classname }) => (
  <div className={classname}>{ warning && <div className="alert alert-danger">{warning}</div> }</div>
);

Warning.propTypes = {
  warning: PropTypes.string,
  classname: PropTypes.string
};

Warning.defaultProps = {
  warning: '',
  classname: ''
};

export default Warning;