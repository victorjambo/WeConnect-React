import React, { Component } from 'react';
import './css/Businesses.css';
import Form from './Form';
import Sidebar from '../../common/Sidebar';
import Breadcrumb from '../../common/Breadcrumb';

/**
 * Edit single Business
 */
class EditBusiness extends Component {
  /**
   * @return {jsx} html to be rendered
   */
  render() {
    const paramId = this.props.match.params.id;
    return (
      <div className="container push-profile">
        <div className="row bucket">
          <div className="col-lg-3 hidden-sm">
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <Breadcrumb routename="Edit Business" />
            <h1>Update business</h1>
            <Form paramId={paramId} />
          </div>
        </div>
      </div>

    );
  }
}

export default EditBusiness;
