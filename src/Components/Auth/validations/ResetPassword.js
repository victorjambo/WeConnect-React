import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  let errors = {};
  
  if (!isEmpty(data.old_password) && !Validator.matches(data.password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i)) {
    errors.password = 'Provide strong password, should contain letters and numbers';
  }

  if (Validator.isEmpty(data.password) ||
      Validator.isEmpty(data.old_password) ||
      Validator.isEmpty(data.confirm_password)) {
    let response = 'This field is required';
    errors.password = response;
    errors.old_password = response;
    errors.confirm_password = response;
  }

  if (data.confirm_password !== data.password) {
    errors.confirm_password = 'Passwords do not match';
  }
  
  if (!isEmpty(data.old_password) && data.old_password === data.password) {
    errors.password = 'old password same as new password';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;