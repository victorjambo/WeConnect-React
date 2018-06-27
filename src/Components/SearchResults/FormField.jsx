import React from 'react';
import PropTypes from 'prop-types';

const FormField = ({
  locationQuery, nameQuery, searchQuery, logChange, categoryQuery
}) => (
  <form>
    <div className="input-group">
      <input
        className="form-control "
        name="nameQuery"
        value={nameQuery}
        onChange={logChange}
        autoComplete="off"
        placeholder="Business Name"
        style={{ width: '33.33%' }}/>

      <input
        className="form-control"
        name="locationQuery"
        value={locationQuery}
        onChange={logChange}
        autoComplete="off"
        placeholder="Location"
        style={{ width: '33.33%' }}/>

      <input
        className="form-control"
        name="categoryQuery"
        value={categoryQuery}
        onChange={logChange}
        autoComplete="off"
        placeholder="Category"
        style={{ width: '33.33%' }}/>

      <span className="input-group-btn">
        <button className="btn btn-default" onClick={searchQuery} />
      </span>
    </div>
  </form>
);

FormField.propTypes = {
  nameQuery: PropTypes.string.isRequired,
  locationQuery: PropTypes.string.isRequired,
  categoryQuery: PropTypes.string.isRequired,
  searchQuery: PropTypes.func.isRequired,
  logChange: PropTypes.func.isRequired
};

export default FormField;
