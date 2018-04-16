import React from 'react';
import Sidebar from '../../common/Sidebar';

const User = () => (
  <div className="container push-profile">
    <div className="row bucket">
      <div className="col-lg-3 hidden-sm">
        <Sidebar />
      </div>
      <div className="col-lg-9">
        <h1>Your Profile</h1>
      </div>
    </div>
  </div>
);

export default User;