import React from 'react';
import { Redirect } from 'react-router-dom';
import request from 'superagent';
import Sidebar from '../../common/Sidebar';
import validateInput from './validations/ResetPassword.js';
import { BASE_URL } from '../../utils/url.js';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: '',
      password: '',
      confirm_password: '',
      errors: {},
      serverErrors: {},
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
    let token = window.sessionStorage.getItem('token');
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      const { old_password, password} = this.state;

      let url = `${BASE_URL}/api/v2/auth/reset-password`;

      request
        .put(url)
        .type('application/json')
        .set({'x-access-token': token})
        .send({ old_password: old_password, password: password })
        .then(res => {
          if(res.status === 200) {
            this.setState({ fireRedirect: true });
          }
          else {
            this.setState({ serverErrors: res.response.body, isLoading: false });
          }
        })
        .catch(err => {
          this.setState({ serverErrors: err.response.body, isLoading: false });
        });
    }
  }
  
  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { from } = this.props.location.state || '/profile';
    const fireRedirect = this.state.fireRedirect;
    return(
      <div className="container push-profile">
        <div className="row bucket">
          <div className="col-lg-3 hidden-sm">
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <form onSubmit={this.handleSubmit}>
              <h1>Reset Password</h1>
              
              { this.state.serverErrors.warning && <div className="alert alert-danger">{this.state.serverErrors.warning}</div> }
              
              <input name="old_password"
                type="password"
                placeholder="Old Password"
                className="input pass"
                value={this.state.old_password}
                onChange={this.logChange}
                />
              { this.state.errors.old_password && <div className="invalid-feedback">{this.state.errors.old_password}</div> } 

              <input name="password"
                type="password"
                placeholder="New Password"
                className="input pass"
                value={this.state.password}
                onChange={this.logChange}
                />
              { this.state.errors.password && <div className="invalid-feedback">{this.state.errors.password}</div> }

              <input name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                className="input pass"
                value={this.state.confirm_password}
                onChange={this.logChange}
                />
              { this.state.errors.confirm_password && <div className="invalid-feedback">{this.state.errors.confirm_password}</div> }

              <button type="submit" className="submit-btn" disabled={this.state.isLoading}>
                Reset&nbsp;
                {
                  this.state.isLoading && <i className="fa fa-spinner fa-spin" />
                }
              </button>
            </form>
            { fireRedirect && (<Redirect to={from || '/profile'}/>) }
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;