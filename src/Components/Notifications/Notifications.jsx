import React from 'react';
import Sidebar from '../../common/Sidebar.jsx';

const Notifications = () => (
  <div className="container push-profile">
    <div className="row bucket">
      <div className="col-lg-3 hidden-sm">
        <Sidebar />
      </div>
      <div className="col-lg-9">
        <h1>Notifications</h1>
        <br />
        <p>No new notifications</p>
      </div>
    </div>
  </div>
);

export default Notifications;
