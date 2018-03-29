import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import request from 'superagent';
import validateInput from './validations/Login.js';

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
    
      var data = {
        username: this.state.username,
        password: this.state.password
      };

      var url = 'https://weconnect-victorjambo.c9users.io/api/v2/auth/login';
  
      request
        .post(url)
        .set('Content-Type', 'application/json')
        .send({ username: data.username, password: data.password })
        .end((err, res) => {
          if(res.status === 200) {
            // console.log(res.body.token);
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
        <div className="registration login">
          <form onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            
            { this.state.errors.warning && <div className="alert alert-danger">{this.state.errors.warning}</div> }

            <input type="text"
            name="username"
            placeholder="Username"
            className="input pass"
            value={this.state.username}
            onChange={this.logChange}/>
            {this.state.errors.username && <span className="help-block">{this.state.errors.username}</span>}

            <input name="password"
            type="password"
            placeholder="Password"
            error={this.state.errors.password}
            className="input pass"
            value={this.state.password}
            onChange={this.logChange}/>
            {this.state.errors.password && <span className="help-block">{this.state.errors.password}</span>}

            <input type="submit" value="login" className="submit-btn" disabled={this.state.isLoading}/>
          </form>
          { fireRedirect && (<Redirect to={from || '/'}/>) }
          <div className="text-center">
            Don't have an account? <Link to="/auth/signup">Sign Up</Link><br />
            <Link to="/">Forgot password</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;