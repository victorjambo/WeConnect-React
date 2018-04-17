import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  let errors = {};
  
  if (!Validator.isAlphanumeric(data.name)) {
    errors.name = 'Field can only be text';
  }
  
  if (!Validator.isAlphanumeric(data.bio)) {
    errors.bio = 'Field can only be text';
  }
  
  if (!Validator.isAlphanumeric(data.location)) {
    errors.location = 'Field can only be text';
  }

  if(Validator.isEmpty(data.name)) {
    errors.name = 'This field is required';
  }
  
  if(Validator.isEmpty(data.bio)) {
    errors.bio = 'This field is required';
  }
  
  if(Validator.isEmpty(data.location)) {
    errors.location = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;