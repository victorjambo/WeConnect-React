import React from 'react';
import Sidebar from '../../common/Sidebar.jsx';

const UserBusinesses = () => (
  <div className="container push-profile">
    <div className="row bucket">
      <div className="col-lg-3 hidden-sm">
        <Sidebar />
      </div>
      <div className="col-lg-9">
        <h1>My Business</h1>
      </div>
    </div>
  </div>
);

export default UserBusinesses;
