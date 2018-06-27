import React from 'react';
import PropTypes from 'prop-types';
import Warning from './Warning';

const ProfileOverview = ({ user, activate }) => (
  <div >
    <h1>{user.fullname}'s profile</h1>
    { !activate && <Warning warning="Check your email to activate your account!!!"/> }
    <ul className="section-info">

      <li className="overview-info-profile">
        <div className="summary-img">
          <img src="https://www.shareicon.net/data/256x256/2016/09/01/822742_user_512x512.png" alt="" />
        </div>
        <div className="entity-summary-info">
          <h3>username</h3>
          <p className="value">{user.username}</p>
        </div>
      </li>

      <li className="overview-info-profile">
        <div className="summary-img">
          <img src="https://www.shareicon.net/data/256x256/2016/09/01/822742_user_512x512.png" alt="" />
        </div>
        <div className="entity-summary-info">
          <h3>Full Names</h3>
          <p className="value">{user.fullname}</p>
        </div>
      </li>

      <li className="overview-info-profile">
        <div className="summary-img">
          <img src="https://www.shareicon.net/data/256x256/2016/09/01/822742_user_512x512.png" alt="" />
        </div>
        <div className="entity-summary-info">
          <h3>Email</h3>
          <p className="value">{user.email}</p>
        </div>
      </li>

    </ul>
  </div>
);

ProfileOverview.propTypes = {
  user: PropTypes.object.isRequired,
  activate: PropTypes.bool
};

ProfileOverview.defaultProps = {
  user: {},
  activate: false
};

export default ProfileOverview;
