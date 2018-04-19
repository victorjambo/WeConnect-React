import React, { Component } from 'react';
import './Forms.css';
import { Link, Redirect } from 'react-router-dom';
import validateInput from '../../helpers/validations';
import { BASE_URL } from '../../helpers/url';
import { notify } from '../../helpers/notify';
import InputAuth from '../../common/ElementComponents/InputAuth';
import ButtonAuth from '../../common/ElementComponents/ButtonAuth';
import Warning from '../../common/ElementComponents/Warning';
import { post } from '../../helpers/request';

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

      post(url, { email }).then(res => {
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
    const fireRedirect = this.state.fireRedirect;
    return(
      <div className="container push">
        <div className="registration login">
          <form onSubmit={this.handleSubmit}>
            <h1>Forgot Password</h1>

            <Warning warning={this.state.errors.warning} classname="forgot-password" />

            <InputAuth
              type="email" placeholder="Email Address"
              error={this.state.errors.email}
              name="email" value={this.state.email}
              classname="forgot-password" onChange={this.logChange}
              />

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

export default ForgotPassword;
