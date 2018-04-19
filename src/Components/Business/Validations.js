import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  let errors = {};

  if(Validator.isEmpty(data.name.trim())) {
    errors.name = 'This field is required';
  }
  
  if(Validator.isEmpty(data.bio.trim())) {
    errors.bio = 'This field is required';
  }
  
  if(Validator.isEmpty(data.location.trim())) {
    errors.location = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;