import React, { Component } from 'react';
import './Forms.css';
import { Link, Redirect } from 'react-router-dom';
import request from 'superagent';
import validateInput from './validations/Login.js';
import Auth from './Auth.js';
import { BASE_URL } from '../../utils/url.js';
import { notify } from '../../utils/notify.js';

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

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      const { username, password} = this.state;

      let url = `${BASE_URL}/api/v2/auth/login`;

      request
        .post(url)
        .set('Content-Type', 'application/json')
        .send({ username: username, password: password })
        .then(res => {
          if(res.status === 200) {
            Auth.authenticate();
            sessionStorage.setItem('token', res.body.token);
            this.setState({ fireRedirect: true });
            notify('success', res.body.success);
          }
          else {
            this.setState({ errors: res.response.body, isLoading: false });
            notify('success', res.body);
          }
        })
        .catch(err => {
          this.setState({ errors: err.response.body, isLoading: false });
          notify('warning', err.response.body.warning);
        });
    }
  }

  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { from } = this.props.location.state || '/';
    const fireRedirect = this.state.fireRedirect;
    return(
      <div className="container push">
        <div className="registration login">
          <form onSubmit={this.handleSubmit}>
            <h1>Login</h1>

            { this.state.errors.warning && <div className="alert alert-danger">{this.state.errors.warning}</div> }

            <input type="text"
            name="username"
            placeholder="Username"
            className="input pass"
            value={this.state.username}
            onChange={this.logChange}
            />
            {this.state.errors.username && <div className="invalid-feedback">{this.state.errors.username}</div>}

            <input name="password"
            type="password"
            placeholder="Password"
            className="input pass"
            value={this.state.password}
            onChange={this.logChange}
            />
            {this.state.errors.password && <div className="invalid-feedback">{this.state.errors.password}</div>}

            <button type="submit" className="submit-btn" disabled={this.state.isLoading}>
              login&nbsp;
              { this.state.isLoading && <i className="fa fa-spinner fa-spin" /> }
            </button>
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
