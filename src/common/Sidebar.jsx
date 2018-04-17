import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => (
  <ul className="list-group">
    <li className="list-group-item">
      <Link to="/profile">Profile</Link>
    </li>
    <li className="list-group-item">
      <Link to="/auth/reset-password">Reset Password</Link>
    </li>
    <li className="list-group-item">
      <Link to="/profile/businesses">All Business</Link>
    </li>
    <li className="list-group-item">
      <Link to="/notifications">Notifications</Link>
    </li>
  </ul>
);

export default Sidebar;