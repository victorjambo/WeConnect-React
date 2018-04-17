import React from 'react';
import Sidebar from '../../common/Sidebar';

class Notifications extends React.Component {
  render() {
    return(
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
  }
}

export default Notifications;