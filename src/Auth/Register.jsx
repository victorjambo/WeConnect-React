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
    }

    render() {
        return(
          <div>
            <h2>Register</h2>
          </div>
        );
    }
}

export default Register;