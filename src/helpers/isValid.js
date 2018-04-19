import validateInput from '../Components/Auth/validations/Login.js';

export const isValid = (state) => {
  const { errors, isValid } = validateInput(state);

  if (!isValid) {
    this.setState({ errors });
  }

  return isValid;
};


export const logChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  });
};
