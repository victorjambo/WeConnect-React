import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  let errors = {};

  if(Validator.isEmpty(data.email.trim())) {
    errors.email = 'Provide Email';
  }
  
  if(!isEmpty(data.email.trim()) && !Validator.isEmail(data.email.trim())) {
    errors.email = 'Invalid Email';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;