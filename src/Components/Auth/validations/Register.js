import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  let errors = {};

  if (!Validator.matches(data.password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i)) {
    errors.password = 'Provide strong password, should contain letters and numbers';
  }
  
  if (Validator.isEmpty(data.fullname.trim()) ||
      Validator.isEmpty(data.username.trim()) ||
      Validator.isEmpty(data.confirm_password) ||
      Validator.isEmpty(data.email.trim()) ||
      Validator.isEmpty(data.password)) {
    let response = 'This field is required';
    errors.fullname = response;
    errors.username = response;
    errors.confirm_password = response;
    errors.email = response;
    errors.password = response;
  }
  
  if(!isEmpty(data.email.trim()) && !Validator.isEmail(data.email.trim())) {
    errors.email = 'Invalid Email';
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