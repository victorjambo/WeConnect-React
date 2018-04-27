import React, { Component } from 'react';
import './Forms.css';
import { Link, Redirect } from 'react-router-dom';
import validateInput from '../../helpers/validations';
import { post } from '../../helpers/request';
import Auth from './Auth.js';
import { notify } from '../../helpers/notify.js';
import Input from '../../common/ElementComponents/Input';
import ButtonAuth from '../../common/ElementComponents/ButtonAuth';
import { BASE_URL } from '../../helpers/url.js';
import Warning from '../../common/ElementComponents/Warning';

/**
 * Login user
 */
class Login extends Component {

  /**
   * constructor that takes
   * @param {object} props
   */
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
   * @param {object} e as event submit
   * sends post request to API server
   * @returns {object} new state
   * then redirect
   */
  handleSubmit(e) {
    e.preventDefault();
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) { return this.setState({ errors }); }

    this.setState({ errors: {}, isLoading: true });

    const { username, password } = this.state;

    const url = `${BASE_URL}/api/v2/auth/login`;

    post(url, { username, password })
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
   * takes
   * @param {object} e as event
   * updates state on value change
   * @returns {object} new state
   */
  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * @return {jsx} html to be rendered
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

export default Login;
