import React, { Component } from 'react';
import request from 'superagent';
import { Link, Redirect } from 'react-router-dom';
import validateInput from './validations/Register.js';

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
        var data = {
            username: this.state.username,
            fullname: this.state.fullname,
            email: this.state.email,
            password: this.state.password
        };

        var url = 'https://weconnect-victorjambo.c9users.io/api/v2/auth/register';

        request
          .post(url)
          .set('Content-Type', 'application/json')
          .send({ username: data.username, fullname: data.fullname, password: data.password, email: data.email })
          .end((err, res) => {
            if(res.status === 200) {
              this.setState({ fireRedirect: true });
            }
            else {
              this.setState({ errors: err.response.body, isLoading: false });
            }
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
                  
                  <input name="fullname" type="text" placeholder="Full Name" autoFocus="autofocus" className="input pass" onChange={this.logChange} value={this.state.fullname}/>
                  {this.state.errors.fullname && <span className="help-block">{this.state.errors.fullname}</span>}
                  
                  <input name="username" type="text" placeholder="Username" className="input pass" onChange={this.logChange} value={this.state.username}/>
                  {this.state.errors.username && <span className="help-block">{this.state.errors.username}</span>}
                  
                  <input name="email" type="email" placeholder="Email Address" className="input pass" onChange={this.logChange} value={this.state.email}/>
                  {this.state.errors.email && <span className="help-block">{this.state.errors.email}</span>}
                  
                  <input name="password" type="password" placeholder="Password" className="input pass" onChange={this.logChange} value={this.state.password}/>
                  {this.state.errors.password && <span className="help-block">{this.state.errors.password}</span>}
                  
                  <input name="confirm_password" type="password" placeholder="Confirm Password" className="input pass" onChange={this.logChange} value={this.state.confirm_password}/>
                  {this.state.errors.confirm_password && <span className="help-block">{this.state.errors.confirm_password}</span>}
                  
                  <input type="submit" value="Sign up" className="submit-btn"/>
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