import validateInput from '../helpers/validations';
import { expect } from 'chai';

describe('Validations', () => {
  const response = 'This field is required';
  const data = {
    username: '',
    password: '',
    fullname: '',
    email: '',
    confirmPassword: ''
  };

  it('Validates isEmpty', () => {
    const output = validateInput(data);
    Object.keys(output.errors).forEach((error) => {
      expect(output.errors[error]).to.equal(response);
    });
  });

  it('Validates isEmail', () => {
    data.email = 'victor@jambo';
    const output = validateInput(data);
    expect(output.errors.email).to.equal('Invalid Email');
  });

  it('Validates it matches password', () => {
    data.password = 'password';
    const output = validateInput(data);
    expect(output.errors.password).to.equal('Provide strong password, should contain letters and numbers');
  });

  it('Validates confirm password', () => {
    data.password = 'password1234';
    data.confirmPassword = 'different1234';
    const output = validateInput(data);
    expect(output.errors.confirmPassword).to.equal('Passwords do not match');
  });

  it('Validates same passwords', () => {
    data.password = 'password1234';
    data.oldPassword = 'password1234';
    const output = validateInput(data);
    expect(output.errors.password).to.equal('old password same as new password');
  });
});
