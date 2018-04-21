import validateInput from './validations';

export const isValid = (state) => {
  const { errors, isValid } = validateInput(state);

  return { isValid, errors };
};


export const logChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  });
};
