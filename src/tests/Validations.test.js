import { expect } from 'chai';
import validateInput from '../helpers/validations';

describe('Test Validations', () => {
  const response = 'This field is required';
  const data = {
    username: '',
    password: '',
    fullname: '',
    email: '',
    confirmPassword: ''
  };

  it('Validates if inputs are Empty', () => {
    const output = validateInput(data);
    Object.keys(output.errors).forEach((error) => {
      expect(output.errors[error]).to.equal(response);
    });
  });

  it('Validates if its a valid Email', () => {
    data.email = 'victor@jambo';
    const output = validateInput(data);
    expect(output.errors.email).to.equal('Invalid Email');
  });

  it('Validates if password is strong enough', () => {
    data.password = 'yu';
    const output = validateInput(data);
    expect(output.errors.password).to.equal('Provide strong password, should contain letters and numbers');
  });

  it('Validates confirm password should not be different', () => {
    data.password = 'password1234';
    data.confirmPassword = 'different1234';
    const output = validateInput(data);
    expect(output.errors.confirmPassword).to.equal('Passwords do not match');
  });

  it('Validates old password cant be same as old password', () => {
    data.password = 'password1234';
    data.oldPassword = 'password1234';
    const output = validateInput(data);
    expect(output.errors.password).to.equal('old password same as new password');
  });
});
