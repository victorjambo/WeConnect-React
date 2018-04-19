import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  let errors = {};

  //
  // match
  //
  if (!Validator.matches(data.password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i)) {
    errors.password = 'Provide strong password, should contain letters and numbers';
  }
  
  //
  // Empty
  //
  if (Validator.isEmpty(data.fullname.trim())) {
    errors.fullname = 'This field is required';
  }

  if (Validator.isEmpty(data.username.trim())) {
    errors.username = 'This field is required';
  }
  
  if(!Validator.isEmail(data.email.trim())) {
    errors.email = 'Invalid Email';
  }
  
  if (Validator.isEmpty(data.email.trim())) {
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
};

export default validateInput;