import React, { Component } from 'react';
import './Forms.css';
import { Link, Redirect } from 'react-router-dom';
import request from 'superagent';
import validateInput from './validations/ForgotPassword.js';
import { BASE_URL } from '../../utils/url.js';
import { notify } from '../../utils/notify.js';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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

      const { email } = this.state;

      let url = `${BASE_URL}/api/v2/auth/forgot-password`;

      request
        .post(url)
        .set('Content-Type', 'application/json')
        .send({ email: email })
        .then(res => {
          if(res.status === 200) {
            this.setState({ fireRedirect: true });
            notify('success', res.body.success);
          }
          else {
            this.setState({ errors: res.response.body, isLoading: false });
            notify('success', res.body);
          }
        })
        .catch(err => {
          this.setState({ errors: err, isLoading: false });
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
            <h1>Forgot Password</h1>

            { this.state.errors.warning && <div className="alert alert-danger">{this.state.errors.warning}</div> }

            <input type="text"
            name="email"
            placeholder="Email"
            className="input pass"
            value={this.state.email}
            onChange={this.logChange}
            />
            {this.state.errors.email && <div className="invalid-feedback">{this.state.errors.email}</div>}

            <button type="submit" className="submit-btn" disabled={this.state.isLoading}>
              Send&nbsp;
              { this.state.isLoading && <i className="fa fa-spinner fa-spin" /> }
            </button>
          </form>
          { fireRedirect && (<Redirect to={from || '/'}/>) }
          <div className="text-center">
            Don't have an account? <Link to="/auth/signup">Sign Up</Link><br /><br />
            Already have an account? <Link to="/auth/login">login</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
