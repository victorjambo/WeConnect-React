import React from 'react';
import { Link } from "react-router-dom";

const NavNotifications = () => (
  <ul className="dropdown-menu">
    <li><Link to="">No new notifications</Link></li>
    <li role="separator" className="divider"></li>
    <li><Link to="/notifications" className="text-center" style={{ paddingBottom: 15 }}>View all >></Link></li>
  </ul>
);

export default NavNotifications;