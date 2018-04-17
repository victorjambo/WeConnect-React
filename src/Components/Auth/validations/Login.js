import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  let errors = {};
  
  if (!Validator.isAlphanumeric(data.username)) {
    errors.username = 'Field can only be text';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;