import React from 'react';
import PropTypes from 'prop-types';
import Warning from './Warning';

const ProfileOverview = ({ user }) => (
  <div >
    <h1>{user.fullname}'s profile</h1>
    { user.activate === "false" && <Warning warning="Check your email to activate your account!!!"/> }
    <table className="table">
      <tbody>
        <tr>
          <td>
            <strong>Full Name</strong>&nbsp;
          </td>
          <td>
            {user.fullname}
          </td>
        </tr>
        <tr>
          <td>
            <strong>username</strong>&nbsp;
          </td>
          <td>
            {user.username}
          </td>
        </tr>
        <tr>
          <td>
            <strong>email</strong>&nbsp;
          </td>
          <td>
            {user.email}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

ProfileOverview.propTypes = {
  user: PropTypes.object.isRequired
};

ProfileOverview.defaultProps = {
  user: {},
};

export default ProfileOverview;
