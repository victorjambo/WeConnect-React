import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  let errors = {};
  let response = 'This field is required';

  for(var field in data) {
    if(field === 'password' && !Validator.matches(data[field].toString(), /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i)) {
      errors[field] = 'Provide strong password, should contain letters and numbers';
    }
    
    if(field === 'email' && !Validator.isEmail(data[field].toString().trim())) {
      errors[field] = 'Invalid Email';
    }
    
    if(field === 'confirm_password' && data.confirm_password !== data.password) {
      errors[field] = 'Passwords do not match';
    }
    
    if (field === 'password' && data.old_password === data.password) {
      errors[field] = 'old password same as new password';
    }
  
    if(Validator.isEmpty(data[field].toString().trim())) {
      errors[field] = response;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;