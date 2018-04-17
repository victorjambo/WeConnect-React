import React, { Component } from 'react';
import './css/Businesses.css';
import Form from './Form';
import Sidebar from '../../common/Sidebar';

class EditBusiness extends Component {
  render() {
    let paramId = this.props.match.params.id;
    return(
      <div className="container push-profile">
        <div className="row bucket">
          <div className="col-lg-3 hidden-sm">
            <Sidebar />
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