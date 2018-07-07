import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../SearchResults/css/search.css';


const NotificationItem = ({ notification }) => (
  <div className="stream-small">
    <span className="label label-success">Review</span>
    <Link to={notification.url} className="no-style">
      &nbsp;&nbsp;
      @{notification.act}.
    </Link>
    <span> / </span>
    <span className="text-muted"> {notification.created_at} </span>
  </div>
);

NotificationItem.propTypes = {
  notification: PropTypes.object
};

NotificationItem.defaultProps = {
  notification: {}
};

export default NotificationItem;
