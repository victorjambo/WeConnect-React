import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  name, value, placeholder, error, type, onChange, classname, label
}) => (
  <div className={classname}>
    { label && <label htmlFor={name}>{placeholder}</label> }
    <input name={name}
      type={type}
      placeholder={placeholder}
      className={label ? 'form-control' : 'input pass'}
      value={value}
      onChange={onChange}/>
    { error && <div className="invalid-feedback">{error}</div> }
  </div>
);


Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classname: PropTypes.string,
  label: PropTypes.bool
};

Input.defaultProps = {
  type: 'text',
  label: false
};

export default Input;
