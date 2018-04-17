import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  let errors = {};
  
  if (!Validator.matches(data.password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i)) {
    errors.password = 'Provide strong password, should contain letters and numbers';
  }
  
  if (!Validator.isAlphanumeric(data.old_password)) {
    errors.username = 'Field can only be text';
  }

  if (Validator.isEmpty(data.password)) {
    errors.username = 'This field is required';
  }

  if (Validator.isEmpty(data.confirm_password)) {
    errors.password = 'This field is required';
  }
  
  if (data.old_password === data.password) {
    errors.password = 'old password same as new password';
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