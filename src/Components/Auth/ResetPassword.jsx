import React from 'react';
import { Redirect } from 'react-router-dom';
import request from 'superagent';
import Sidebar from '../../common/Sidebar';
import validateInput from '../../helpers/validations';
import { BASE_URL } from '../../helpers/url.js';
import { notify } from '../../helpers/notify.js';
import Input from '../../common/ElementComponents/Input';
import ButtonAuth from '../../common/ElementComponents/ButtonAuth';
import Warning from '../../common/ElementComponents/Warning';

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

      request.put(url).type('application/json')
        .set({'x-access-token': token})
        .send({ old_password: old_password, password: password })
        .then(res => {
          if (res.status === 200) {
            this.setState({ fireRedirect: true });
            notify('success', res.body.success);
          } else {
            this.setState({ serverErrors: res.response.body, isLoading: false });
            notify('success', res.body);
          }
        })
        .catch(err => {
          this.setState({ serverErrors: err.response.body, isLoading: false });
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
    const { from } = this.props.location.state || '/profile';
    return(
      <div className="container push-profile">
        <div className="row bucket">
          <div className="col-lg-3 hidden-sm"><Sidebar /></div>
          <div className="col-lg-9">
            <form onSubmit={this.handleSubmit}>
              <h1>Reset Password</h1>
              <Warning classname="pass-reset" warning={this.state.serverErrors.warning}/>
              <Input value={this.state.old_password} classname="reset old_password"
                name="old_password" error={this.state.errors.old_password}
                type="password" placeholder="Old Password" onChange={this.logChange} />
              <Input classname="reset password" value={this.state.password}
                name="password" placeholder="Password" type="password"
                error={this.state.errors.password} onChange={this.logChange} />
              <Input onChange={this.logChange} classname="reset confirm_password"
                value={this.state.confirm_password} name="confirm_password" type="password"
                placeholder="Confirm Password" error={this.state.errors.confirm_password}/>
              <ButtonAuth disabled={this.state.isLoading} label="Reset" />
            </form> { this.state.fireRedirect && (<Redirect to={from || '/profile'}/>) }
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
