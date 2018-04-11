import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  
  if (Validator.isEmpty(data.fullname)) {
    errors.fullname = 'This field is required';
  }
  
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  
  if (Validator.isEmpty(data.confirm_password)) {
    errors.confirm_password = 'This field is required';
  }
  
  if (data.confirm_password !== data.password) {
    errors.confirm_password = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}