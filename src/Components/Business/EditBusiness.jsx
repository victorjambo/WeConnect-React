import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { match: { params: { id } } } = this.props;
    return (
      <div className="container push-profile">
        <div className="row bucket">
          <div className="col-lg-3 hidden-sm">
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <Breadcrumb routename="Edit Business" />
            <h1>Update business</h1>
            <Form paramId={id} />
          </div>
        </div>
      </div>

    );
  }
}

EditBusiness.propTypes = {
  match: PropTypes.object
};

export default EditBusiness;
