import React, { Component } from 'react';
import './css/Businesses.css';
import Form from './Form';
import { Link } from 'react-router-dom';

class NewBusiness extends Component {
  render() {
    return(
      <div className="container push-profile">
        <div className="row bucket">
          <div className="col-lg-3 hidden-sm">
            <ul className="list-group">
              <li className="list-group-item">
                <Link to="/">My Profile</Link>
              </li>
              <li className="list-group-item">
                <Link to="/">All Business</Link>
              </li>
              <li className="list-group-item">
                <Link to="/">Filter businesses</Link>
              </li>
              <li className="list-group-item">
                <Link to="/">Show business</Link>
              </li>
            </ul>
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
