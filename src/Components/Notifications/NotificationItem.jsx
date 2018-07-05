import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../SearchResults/css/search.css';


const NotificationItem = ({ notification }) => (
  <li className="fade-in">
    <div className="info">
      <h3 className="name">
        <Link to={notification.url} className="link-nostyle">
          {notification.act}
        </Link>
      </h3>
      <div className="desc trunc text-lowercase">
        <Link to={notification.url} className="link-nostyle">
          {notification.url}
        </Link>
      </div>
      <ul>
        <li style={{ width: '50%' }}>
          <span className="fa fa-map-marker" /> {notification.read_at}
        </li>
        <li style={{ width: '50%' }}>
          <span className="fa fa-th" /> {notification.created_at}
        </li>
      </ul>
    </div>
  </li>
);

NotificationItem.propTypes = {
  notification: PropTypes.object
};

NotificationItem.defaultProps = {
  notification: {}
};

export default NotificationItem;
