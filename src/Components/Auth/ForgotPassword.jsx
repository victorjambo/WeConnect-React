import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Forms.css';
import validateInput from '../../helpers/validations';
import notify from '../../helpers/notify';
import Input from '../../common/ElementComponents/Input';
import ButtonAuth from '../../common/ElementComponents/ButtonAuth';
import Warning from '../../common/ElementComponents/Warning';
import requestAgent from '../../helpers/superagent';

/**
 * Component to handle Forgotten Password
 * Resets Password and sends new password
 */
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

  /**
   * @returns {bool} true
   * validates data login form
   */
  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * @param {object} e(event)
   * @returns {object} setState
   * makes post request to /forgot-password endpoint
   */
  handleSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      const { email } = this.state;

      const url = "/api/v2/auth/forgot-password";

      requestAgent.post(url)
        .set('Content-Type', 'application/json')
        .send({ email })
        .then((res) => {
          if (res.status === 200) {
            this.setState({ fireRedirect: true });
            notify('success', res.body.success);
          } else {
            this.setState({ errors: res.response.body, isLoading: false });
            notify('success', res.body);
          }
        })
        .catch((err) => {
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
    const { from } = this.props.location.state || '/auth/login';
    const { fireRedirect } = this.state;
    return (
      <div className="container push">
        <div className="registration login">
          <form onSubmit={this.handleSubmit}>
            <h1>Forgot Password</h1>

            <Warning warning={this.state.errors.warning} classname="forgot-password" />

            <Input
              type="email" placeholder="Email Address"
              error={this.state.errors.email}
              name="email" value={this.state.email}
              classname="forgot-password" onChange={this.logChange}/>

            <ButtonAuth disabled={this.state.isLoading} label="Send" />
          </form>
          { fireRedirect && (<Redirect to={from || '/auth/login'}/>) }
          <div className="text-center">
            Don't have an account? <Link to="/auth/signup">Sign Up</Link><br /><br />
            Already have an account? <Link to="/auth/login">login</Link>
          </div>
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  location: PropTypes.object
};

export default ForgotPassword;
