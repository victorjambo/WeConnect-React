import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import request from 'superagent';

class Login extends Component {
  constructor(props) {
    super(props);
    document.title = "Notes App";
    this.state = {
      username: '',
      password: '',
      token: ''
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logChange = this.logChange.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault();
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
        if(res.body.success) {
            console.log(res.body.token);
            this.setState({
              token: res.body.token
            });
            window.location.href='/';
        }
        else{
            console.log(err.response.body.warning);
            this.setState({
                username: '',
                password: ''
            });
        }
      });
  }

  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return(
      <div className="container push">
        <div className="registration login">
          <form onSubmit={this.handleSubmit}>
            <h1>Login</h1>

            <input type="text"
            name="username"
            placeholder="Username"
            className="input pass"
            value={this.state.username}
            onChange={this.logChange}/>

            <input name="password"
            type="password"
            placeholder="Password"
            className="input pass"
            value={this.state.password}
            onChange={this.logChange}/>

            <input type="submit" value="login" className="submit-btn"/>
          </form>
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