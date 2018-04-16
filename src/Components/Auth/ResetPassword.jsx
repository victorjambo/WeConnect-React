import React from 'react';
import Sidebar from '../../common/Sidebar';

const ResetPassword = () => (
  <div className="container push-profile">
    <div className="row bucket">
      <div className="col-lg-3 hidden-sm">
        <Sidebar />
      </div>
      <div className="col-lg-9">
        <form>
          <h1>Reset Password</h1>

          <input name="oldpassword"
            type="password"
            placeholder="Old Password"
            className="input pass"
            />
          <input name="newpassword"
            type="password"
            placeholder="New Password"
            className="input pass"
            />
          <input name="confirmpassword"
            type="password"
            placeholder="Confirm Password"
            className="input pass"
            />
          <button type="submit" className="submit-btn">
            Reset&nbsp;
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default ResetPassword;