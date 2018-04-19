import React, { Component } from 'react';
import './Forms.css';
import request from 'superagent';
import { Link, Redirect } from 'react-router-dom';
import validateInput from '../../helpers/validations';
import { BASE_URL } from '../../helpers/url.js';
import { notify } from '../../helpers/notify.js';
import InputAuth from '../../common/ElementComponents/InputAuth';
import ButtonAuth from '../../common/ElementComponents/ButtonAuth';

class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        fullname: '',
        email: '',
        password: '',
        confirm_password: '',
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
        const { username, fullname, email, password } = this.state;

        var url = `${BASE_URL}/api/v2/auth/register`;

        request
          .post(url)
          .set('Content-Type', 'application/json')
          .send({ 
            username: username,
            fullname: fullname,
            password: password,
            email: email
          })
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

              <div className="registration signup">
                <form id="signup" onSubmit={this.handleSubmit}>
                  <h1>User Registration</h1>
                  { this.state.errors.warning && <div className="alert alert-danger">{this.state.errors.warning}</div> }

                  <InputAuth onChange={this.logChange} classname="register" name="fullname" 
                    placeholder="Fullname" type="fullname" value={this.state.fullname} error={this.state.errors.fullname} />

                  <InputAuth onChange={this.logChange} name="username" placeholder="Username"
                    classname="register" type="text" value={this.state.username} error={this.state.errors.username} />

                  <InputAuth onChange={this.logChange} name="email" placeholder="Email Address"
                    type="email" value={this.state.email} error={this.state.errors.email} classname="register" />

                  <InputAuth onChange={this.logChange} name="password" placeholder="Password" classname="register"
                    type="password" value={this.state.password} error={this.state.errors.password} />

                  <InputAuth onChange={this.logChange} name="confirm_password" classname="register"
                    placeholder="Confirm Password" type="password" value={this.state.confirm_password} error={this.state.errors.confirm_password} />

                  <ButtonAuth disabled={this.state.isLoading} label="signup" />
                </form>
                { fireRedirect && (<Redirect to={from || '/auth/login'}/>) }
                <div className="text-center">
                  already have an account? <Link to="/auth/login">login</Link>
                </div>
              </div>
              
            </div>
            
        );
    }
}

export default Register;