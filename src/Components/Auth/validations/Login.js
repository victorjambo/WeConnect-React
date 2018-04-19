import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  let errors = {};

  if (Validator.isEmpty(data.username.trim()) || Validator.isEmpty(data.password)) {
    let response = 'This field is required';
    errors.username = response;
    errors.password = response;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;