import validateInput from '../helpers/validations';
import { expect } from 'chai';

describe('Validations', () => {
  let response = 'This field is required';
  let data = {
    username: '',
    password: '',
    fullname: '',
    email: '',
    confirm_password: ''
  };
    
  it('Validates isEmpty', () => {
    let output = validateInput(data);
    for(var error in output.errors) {
      expect(output.errors[error]).to.equal(response);
    }
  });
  
  it('Validates isEmail', () => {
    data.email = 'victor@jambo';
    let output = validateInput(data);
    expect(output.errors.email).to.equal('Invalid Email');
  });
  
  it('Validates it matches password', () => {
    data.password = 'password';
    let output = validateInput(data);
    expect(output.errors.password).to.equal('Provide strong password, should contain letters and numbers');
  });
  
  it('Validates confirm password', () => {
    data.password = 'password1234';
    data.confirm_password = 'different1234';
    let output = validateInput(data);
    expect(output.errors.confirm_password).to.equal('Passwords do not match');
  });
  
  it('Validates same passwords', () => {
    data.password = 'password1234';
    data.old_password = 'password1234';
    let output = validateInput(data);
    expect(output.errors.password).to.equal('old password same as new password');
  });
 
});