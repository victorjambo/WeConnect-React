import React from 'react';
import PropTypes from 'prop-types';
import Warning from './Warning';

const ProfileOverview = ({ user, activate }) => (
  <div>
    <h1>{user.fullname}'s profile</h1>
    { !activate && <Warning warning="Check your email to activate your account!!!"/> }

    <div className="overview-info">
      <label>username:&nbsp;</label>
      <span className="value">{user.username}</span>
    </div>

    <div className="overview-info">
      <label>full names:&nbsp;</label>
      <span className="value">{user.fullname}</span>
    </div>

    <div className="overview-info">
      <label>email:&nbsp;</label>
      <span className="value">{user.email}</span>
    </div>
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
