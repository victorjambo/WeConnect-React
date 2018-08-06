import React from 'react';
import './css/Businesses.css';
import Form from './Form';
import Sidebar from '../../common/Sidebar';
import Breadcrumb from '../../common/Breadcrumb';

/**
 * stateless component to create new business
 * @return {*} html template
 */
const NewBusiness = () => (
  <div className="container push-profile">
    <div className="row bucket">
      <div className="col-lg-3 hidden-sm">
        <Sidebar />
      </div>
      <div className="col-lg-9">
        <Breadcrumb routename="Register Business" />
        <h1>Register new business</h1>
        <Form />
      </div>
    </div>
  </div>
);

export default NewBusiness;
