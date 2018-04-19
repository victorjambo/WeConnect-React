import React from 'react';
import PropTypes from 'prop-types';

const InputAuth = ({ name, value, placeholder, error, type, onChange }) => (
  <div>
    <input name={name}
      type={type}
      placeholder={placeholder}
      className="input pass"
      value={value}
      onChange={onChange}
      />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
    );


InputAuth.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

InputAuth.defaultProps = {
  type: 'text'
};

export default InputAuth;