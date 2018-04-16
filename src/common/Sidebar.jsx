import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <ul className="list-group">
    <li className="list-group-item">
      <Link to="/"  activeClassName="selected">My Profile</Link>
    </li>
    <li className="list-group-item">
      <Link to="/"  activeClassName="selected">All Business</Link>
    </li>
    <li className="list-group-item">
      <Link to="/"  activeClassName="selected">Filter businesses</Link>
    </li>
    <li className="list-group-item">
      <Link to="/" activeClassName="selected">Show business</Link>
    </li>
  </ul>
);

export default Sidebar;