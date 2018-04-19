import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, value, placeholder, error, type, onChange, classname}) => (
  <div className={"form-group " + classname }>
    <label htmlFor={name}>{placeholder}</label>
    <input
      value={value}
      className={"form-control " + classname }
      name={name}
      onChange={onChange}
      type={type} />
    { error && <div className={"invalid-feedback " + classname }>{error}</div> }
  </div>
);


Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  classname: PropTypes.string,
  autoFocus: PropTypes.string
};

Input.defaultProps = {
  type: 'text',
  classname: '',
  autoFocus: ''
};

export default Input;