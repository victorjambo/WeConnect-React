import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  let errors = {};
  
  //
  // isAlphanumeric
  //
  if (!Validator.isAlphanumeric(data.fullname)) {
    errors.fullname = 'Field can only be text';
  }
  
  if (!Validator.isAlphanumeric(data.username)) {
    errors.username = 'Field can only be text';
  }
  
  //
  // match
  //
  if (!Validator.matches(data.password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i)) {
    errors.password = 'Provide strong password, should contain letters and numbers';
  }
  
  //
  // Empty
  //
  if (Validator.isEmpty(data.fullname)) {
    errors.fullname = 'This field is required';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Invalid Email';
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
};

export default validateInput;