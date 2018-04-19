import React, { Component } from 'react';
import './Forms.css';
import { Link, Redirect } from 'react-router-dom';
import validateInput from '../../helpers/validations';
import { BASE_URL } from '../../helpers/url.js';
import { notify } from '../../helpers/notify.js';
import InputAuth from '../../common/ElementComponents/InputAuth';
import ButtonAuth from '../../common/ElementComponents/ButtonAuth';
import { post } from '../../helpers/request';
import Warning from '../../common/ElementComponents/Warning';

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
        
        let response = post(url, { username, fullname, email, password });

        response.then(res => {
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
        return(
            <div className="container push">

              <div className="registration signup">
                <form id="signup" onSubmit={this.handleSubmit}>
                  <h1>User Registration</h1>
                  <Warning classname="register" warning={this.state.errors.warning}/>

                  <InputAuth onChange={this.logChange} classname="register" name="fullname" placeholder="Fullname" type="fullname" value={this.state.fullname} error={this.state.errors.fullname} />

                  <InputAuth error={this.state.errors.username} placeholder="Username" onChange={this.logChange} name="username" classname="register" type="text" value={this.state.username} />

                  <InputAuth onChange={this.logChange} placeholder="Email Address" type="email" value={this.state.email} error={this.state.errors.email} name="email" classname="register" />

                  <InputAuth classname="register" onChange={this.logChange} name="password" placeholder="Password" type="password" value={this.state.password} error={this.state.errors.password} />

                  <InputAuth value={this.state.confirm_password} type="password" name="confirm_password" classname="register" placeholder="Confirm Password" error={this.state.errors.confirm_password} onChange={this.logChange} />

                  <ButtonAuth disabled={this.state.isLoading} label="signup" />
                </form>
                { this.state.fireRedirect && (<Redirect to={from || '/auth/login'}/>) }
                <div className="text-center">
                  already have an account? <Link to="/auth/login">login</Link>
                </div>
              </div>
              
            </div>
            
        );
    }
}

export default Register;