import React from 'react';
import { Redirect } from 'react-router-dom';
import request from 'superagent';
import Sidebar from '../../common/Sidebar.jsx';
import validateInput from '../../helpers/validations.js';
import BASE_URL from '../../helpers/url.js';
import notify from '../../helpers/notify.js';
import Input from '../../common/ElementComponents/Input.jsx';
import ButtonAuth from '../../common/ElementComponents/ButtonAuth.jsx';
import Warning from '../../common/ElementComponents/Warning.jsx';

/**
 * ResetPassword
 */
class ResetPassword extends React.Component {
  
  /**
   * constructor that takes
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      password: '',
      confirmPassword: '',
      errors: {},
      serverErrors: {},
      isLoading: false,
      fireRedirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.logChange = this.logChange.bind(this);
  }

  /**
   * validates user inputs
   * @returns {bool} true or false
   */
  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
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
    let token = window.sessionStorage.getItem('token');
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      const { oldPassword, password } = this.state;

      let url = `${BASE_URL}/api/v2/auth/reset-password`;

      request.put(url).type('application/json')
        .set({ 'x-access-token': token })
        .send({ old_password: oldPassword, password: password })
        .then((res) => {
          if (res.status === 200) {
            this.setState({ fireRedirect: true });
            notify('success', res.body.success);
          } else {
            this.setState({ serverErrors: res.response.body, isLoading: false });
            notify('success', res.body);
          }
        })
        .catch((err) => {
          this.setState({ serverErrors: err.response.body, isLoading: false });
          notify('warning', err.response.body.warning);
        });
    }
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
    const { from } = this.props.location.state || '/profile';
    return (
      <div className="container push-profile">
        <div className="row bucket">
          <div className="col-lg-3 hidden-sm"><Sidebar /></div>
          <div className="col-lg-9">
            <form onSubmit={this.handleSubmit}>
              <h1>Reset Password</h1>
              <Warning classname="pass-reset" warning={this.state.serverErrors.warning}/>
              <Input value={this.state.oldPassword} classname="reset oldPassword"
                name="oldPassword" error={this.state.errors.oldPassword}
                type="password" placeholder="Old Password" onChange={this.logChange} />
              <Input classname="reset password" value={this.state.password}
                name="password" placeholder="Password" type="password"
                error={this.state.errors.password} onChange={this.logChange} />
              <Input onChange={this.logChange} classname="reset confirmPassword"
                value={this.state.confirmPassword} name="confirmPassword" type="password"
                placeholder="Confirm Password" error={this.state.errors.confirmPassword}/>
              <ButtonAuth disabled={this.state.isLoading} label="Reset" />
            </form> { this.state.fireRedirect && (<Redirect to={from || '/profile'}/>) }
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
