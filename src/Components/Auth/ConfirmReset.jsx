import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import './Forms.css';
import validateInput from '../../helpers/validations';
import notify from '../../helpers/notify';
import Input from '../../common/ElementComponents/Input';
import ButtonAuth from '../../common/ElementComponents/ButtonAuth';
import Warning from '../../common/ElementComponents/Warning';
import requestAgent from '../../helpers/superagent';

/**
 * Reset password from email token
 */
class ConfirmReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      errors: {},
      isLoading: false,
      fireRedirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.logChange = this.logChange.bind(this);
  }

  /**
   * takes
   * @param {object} e as submit event
   * sends post request to API server
   * makes authentication and returns token
   * @returns {object} new state
   * if auth is valid user is then redirected
   */
  handleSubmit(e) {
    e.preventDefault();
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) { return this.setState({ errors }); }

    this.setState({ errors: {}, isLoading: true });

    const { password } = this.state;
    const { search } = this.props.location;

    const url = "/auth/confirm-reset-password/";

    requestAgent.post(url + search)
      .set('Content-Type', 'application/json')
      .send({ password })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ fireRedirect: true });
          notify('success', response.body.success);
        } else {
          this.setState({ errors: response.response.body, isLoading: false });
          notify('success', response.body);
        }
      })
      .catch((error) => {
        this.setState({ errors: error.response.body, isLoading: false });
        notify('warning', error.response.body.warning);
      });
  }

  /**
   * this method takes
   * @param {object} e as event
   * updates state on value change
   * then
   * @returns {object} with new state
   */
  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * @return {jsx} html to be rendered
   * renders input forms and submit buttons
   */
  render() {
    const { from } = this.props.location.state || '/';
    const {
      fireRedirect, password, errors, isLoading, confirmPassword
    } = this.state;
    return (
      <div className="container push">
        <div className="registration login">
          <form onSubmit={this.handleSubmit}>
            <h1>Reset Password</h1>

            <Warning classname="login" warning={errors.warning}/>

            <Input type="password" onChange={this.logChange} name="password" classname="login"
              value={password} error={errors.password} placeholder="password"/>

            <Input type="password" onChange={this.logChange} name="confirmPassword" classname="login"
              value={confirmPassword} error={errors.confirmPassword} placeholder="confirm password"/>

            <ButtonAuth disabled={isLoading} label="Reset Password" />
          </form>
          { fireRedirect && (<Redirect to={from || '/auth/login'}/>) }
          <div className="text-center">
            Don't have an account? <Link to="/auth/signup">Sign Up</Link><br />
            <Link to="/auth/login">Login</Link>
          </div>
        </div>
      </div>
    );
  }
}

ConfirmReset.propTypes = {
  location: PropTypes.object
};

export default ConfirmReset;
