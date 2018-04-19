import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  let errors = {};

  if(Validator.isEmpty(data.email.trim())) {
    errors.email = 'This field is required';
  }
  
  if(!Validator.isEmail(data.email.trim())) {
    errors.email = 'Invalid Email';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;