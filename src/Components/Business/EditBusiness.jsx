import React, { Component } from 'react';
import './css/Businesses.css';
import Form from './Form';
import { Link } from 'react-router-dom';

class EditBusiness extends Component {
  render() {
    let paramId = this.props.match.params.id;
    return(
      <div className="container push-profile">
        <div className="row bucket">
          <div className="col-lg-3">
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
            <h1>Update business</h1>
            <Form paramId={paramId} />
          </div>
        </div>
      </div>

    );
  }
}

export default EditBusiness;
