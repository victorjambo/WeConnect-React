import React, { Component } from 'react';
import request from 'superagent';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
        this.postRegister = this.postRegister.bind(this)
        this.logChange = this.logChange.bind(this)
    }

    postRegister() {
        var data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        var url = 'https://weconnect-victorjambo.c9users.io/api/v2/auth/register'

        request
          .post(url)
          .set('Content-Type', 'application/json')
          .send({ username: data.username, password: data.password, email: data.email })
          .end((err, res) => {
            if(res.body.success) {
                this.props.updateUserState(res.body.success)
            }
            else{
                console.log(err.response.body.warning);
            }
          });
        
        this.setState({
            username: '',
            email: '',
            password: ''
        })
    }
    
    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return(
            <div className="container push">

              <div className="registration signup">
                <form id="signup" method="post" action="">
                  <h1>User Registration</h1>
                  <input type="text" placeholder="Full Name" autoFocus="autofocus" className="input pass" onChange={this.logChange}/>
                  <input name="username" type="text" placeholder="Username" className="input pass" onChange={this.logChange} value={this.state.username}/>
                  <input name="email" type="email" placeholder="Email Address" className="input pass" onChange={this.logChange} value={this.state.email}/>
                  <input name="password" type="password" placeholder="Password" className="input pass" onChange={this.logChange} value={this.state.password}/>
                  <input name="confirmpassword" type="password" placeholder="Confirm Password" className="input pass" onChange={this.logChange} value={this.state.password}/>
                  <input type="submit" value="Sign up" className="submit-btn" onClick={this.postRegister}/>
                </form>
                <div className="text-center">
                    already have an account? <Link to="/">login</Link>
                </div>
              </div>
              
            </div>
            
        );
    }
}

export default Register;