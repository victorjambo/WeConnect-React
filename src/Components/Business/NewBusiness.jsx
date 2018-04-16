import React, { Component } from 'react';
import './css/Businesses.css';
import Form from './Form';
import Sidebar from '../../common/Sidebar';

class NewBusiness extends Component {
  render() {
    return(
      <div className="container push-profile">
        <div className="row bucket">
          <div className="col-lg-3 hidden-sm">
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <h1>Register new business</h1>
            <Form />
          </div>
        </div>
      </div>

    );
  }
}

export default NewBusiness;
