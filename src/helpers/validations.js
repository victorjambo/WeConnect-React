import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  const errors = {};
  const response = 'This field is required';

  Object.keys(data).forEach((field) => {
    if (field === 'password' && !Validator.matches(data[field].toString(), /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i)) {
      errors[field] = 'Provide strong password, should contain letters and numbers';
    }

    if (field === 'email' && !Validator.isEmail(data[field].toString().trim())) {
      errors[field] = 'Invalid Email';
    }

    if (field === 'confirmPassword' && data.confirmPassword !== data.password) {
      errors[field] = 'Passwords do not match';
    }

    if (field === 'password' && data.oldPassword === data.password) {
      errors[field] = 'old password same as new password';
    }

    if (Validator.isEmpty(data[field].toString().trim())) {
      errors[field] = response;
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;
