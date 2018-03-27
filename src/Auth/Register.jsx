import React, { Component } from 'react';
import request from 'superagent';

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
          <div>
            <h2>Register User</h2>
            <div className="formWrapper">

                <input
                name="username"
                type="text"
                placeholder="Username..."
                value={this.state.username}
                onChange={this.logChange}/>

                <input
                name="email"
                type="text"
                placeholder="Email..."
                value={this.state.email}
                onChange={this.logChange}/>

                <input
                name="password"
                type="password"
                placeholder="Password..."
                value={this.state.password}
                onChange={this.logChange}/>

                <button className="btn" onClick={this.postRegister}>Register user</button>
            </div>
          </div>
        );
    }
}

export default Register;