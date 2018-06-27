import React from 'react';
import { Link } from "react-router-dom";
import requestAgent from '../../helpers/superagent';

/**
 * Class NavNotifications
 */
class NavNotifications extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      isLoading: false,
      errors: {}
    };

    this.getNotifications = this.getNotifications.bind(this);
  }

  /**
   * @returns {func} get single business
   */
  componentWillMount() {
    this.getNotifications();
  }

  /**
   * @returns {obj} single business
   */
  getNotifications = () => {
    const url = "/api/v2/notifications";
    const token = window.sessionStorage.getItem('token');
    requestAgent.get(url)
      .set({ 'x-access-token': token })
      .type('application/json')
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.status === 200 && this.refs.refNotification) {
          this.setState({
            notifications: response.body.notifications
          });
        }
      })
      .catch((err) => {
        this.setState({
          notifications: [{
            url: '/notifications',
            act: 'No Notifications',
            id: '1'
          }]
        });
      });
  }

  /**
   * @return {string} jsx
   */
  render() {
    const { notifications } = this.state;
    const notification = notifications.map((_notification) => (<li key={_notification.id}>
      <Link to={_notification.url}>{_notification.act}</Link>
    </li>));
    return (
      <ul className="dropdown-menu" ref="refNotification">
        { notification }
        <li role="separator" className="divider" />
        <li><Link to="/notifications" className="text-center" style={{ paddingBottom: 15 }}>View all >></Link></li>
      </ul>
    );
  }
}

export default NavNotifications;
