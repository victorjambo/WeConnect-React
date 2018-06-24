import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({
  name, value, placeholder, error, onChange, classname
}) => (
  <div className={`form-group ${classname}`}>
    <label htmlFor={name}>{placeholder}</label>
    <textarea
      className={`form-control ${classname}`}
      cols="50"
      rows="6"
      name={name}
      value={value}
      onChange={onChange} />
    { error && <div className="invalid-feedback">{error}</div> }
  </div>
);


Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  classname: PropTypes.string
};

Textarea.defaultProps = {
  type: 'text',
  classname: ''
};

export default Textarea;
