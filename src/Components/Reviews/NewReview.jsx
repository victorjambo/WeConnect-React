import React from 'react';
import PropTypes from 'prop-types';
import Textarea from '../../common/ElementComponents/Textarea';
import ButtonAuth from '../../common/ElementComponents/ButtonAuth';
import Input from '../../common/ElementComponents/Input';

const NewReview = ({
  title, desc, logChange, errors, isLoading, handleSubmit
}) => (
  <div className="add-review bucket" id="new-review">
    <h2>Give us feedback</h2>
    <div className="review-body">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Input label classname="form-group" name="title" autoFocus="autofocus"
            value={title} onChange={logChange} placeholder="Review title"
            error={errors.title}/>
          <Textarea name="desc" value={desc} onChange={logChange}
            placeholder="Add Review" classname="description" error={errors.desc}/>
        </div>
        <div className="form-group">
          <ButtonAuth disabled={isLoading} label="Submit" classname="btn btn-primary"/>
        </div>
      </form>
    </div>
  </div>
);

NewReview.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  logChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  isLoading: PropTypes.bool
};

NewReview.defaultProps = {
  errors: {}
};

export default NewReview;
