import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import './Forms.css';
import validateInput from '../../helpers/validations';
import Auth from '../../helpers/Auth';
import notify from '../../helpers/notify';
import Input from '../../common/ElementComponents/Input';
import ButtonAuth from '../../common/ElementComponents/ButtonAuth';
import Warning from '../../common/ElementComponents/Warning';
import requestAgent from '../../helpers/superagent';

/**
 * Login user component
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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

    const { username, password } = this.state;

    const url = "/api/v2/auth/login";

    requestAgent.post(url)
      .set('Content-Type', 'application/json')
      .send({ username, password })
      .then((response) => {
        if (response.status === 200) {
          Auth.authenticate();
          window.sessionStorage.setItem('token', response.body.token);
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
    const { fireRedirect } = this.state;
    return (
      <div className="container push">
        <div className="registration login">
          <form onSubmit={this.handleSubmit}>
            <h1>Login</h1>

            <Warning classname="login" warning={this.state.errors.warning}/>

            <Input type="text" placeholder="Username" value={this.state.username} classname="login"
              name="username" error={this.state.errors.username} onChange={this.logChange} />

            <Input type="password" onChange={this.logChange} name="password" classname="login"
              value={this.state.password} error={this.state.errors.password} placeholder="password"/>

            <ButtonAuth disabled={this.state.isLoading} label="login" />
          </form>
          { fireRedirect && (<Redirect to={from || '/'}/>) }
          <div className="text-center">
            Don't have an account? <Link to="/auth/signup">Sign Up</Link><br />
            <Link to="/auth/forgot-password">Forgot password</Link>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.object
};

export default Login;
